import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import Head from 'next/head';
import { DEFAULT_SEO } from '../../../../config';
import { config } from 'react-transition-group';
// Material UI Icons v5
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import RefreshIcon from '@mui/icons-material/Refresh';
import Link from 'next/link';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// Material UI Tabs
import { Tabs, Tab, Box } from '@mui/material';
import ProductTabCard from '../../../../components/reusable/ProductTabCard';
import { setTiendaConfig, clearTiendaConfig } from '../../../../reduxstore/actions/tiendaConfig';
import dynamic from 'next/dynamic';
const CartPanel = dynamic(() => import('../../../../components/CartPanel'), { ssr: false });

class TiendaEmpresa extends React.Component {
  state = {
    empresa: '',
    productos: [],
    loading: true,
    error: null,
    mounted: false,
    selectedTab: 0,
    isMobile: false,
    config: {
      nombreTienda: "",
      dbName: "",
      colorPrimario: "#ffffffff",
      colorSecundario: "#ffffffff",
      tiendaHabilitada: true,
      transferencias: false,
      categoriasPrincipales: [
        // Se llenará dinámicamente desde el fetch
      ],
      grupos: [
        // Se llenará dinámicamente desde el fetch
      ],
      nuevoGrupo: {
        titulo: '',
        icono: 'Category',
        tipoIcono: 'mui'
      }
    },
    showCartPanel: false,
    // Snackbar dinámico
    snackOpen: false,
    snackMessage: '',
    snackSeverity: 'info',
    // Vista de Grupo
    groupViewOpen: false,
    activeGrupo: null,
  };

  componentDidMount() {
    console.log(this.props)
    if(this.props.state.shop.cart.length > 0) {
      this.setState({ showCartPanel: true });
    }
    this.setState({ 
      mounted: true,
      isMobile: window.innerWidth <= 768 
    });
    this.obtenerParametroEmpresa();
    console.log('Router en componentDidMount:');
    // Listener para cambios de tamaño de pantalla
    window.addEventListener('resize', this.handleResize);
    // Solo limpiar si el usuario cierra el navegador completamente
    window.addEventListener('unload', this.handleUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
 //  window.removeEventListener('unload', this.handleUnload);
  }

  handleUnload = (e) => {
    // Solo se dispara en cierre total de navegador (no cambio de pestaña)
    if (navigator && navigator.userAgent && !document.hidden) {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch(clearTiendaConfig());
      }
    }
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth <= 768 });
  }

  // Snackbar dinámico
  showSnack = (message, severity = 'info') => {
    this.setState({ snackOpen: true, snackMessage: message, snackSeverity: severity });
  }

  handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') return;
    this.setState({ snackOpen: false });
  }

  // Abrir/cerrar vista de Grupo
  handleGrupoClick = (grupo) => {
    try {
      const nombre = (grupo && (grupo.titulo || grupo.nombre || grupo.name)) ? (grupo.titulo || grupo.nombre || grupo.name) : '';
      this.setState({ groupViewOpen: true, activeGrupo: nombre });
    } catch (e) {
      this.setState({ groupViewOpen: true, activeGrupo: '' });
    }
  }

  handleCloseGroupView = () => {
    this.setState({ groupViewOpen: false, activeGrupo: null });
    // Opcional: scroll back to groups section
    try {
      const el = document.querySelector('.grupos-container');
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (_) {}
  }

  obtenerParametroEmpresa = () => {

    const {  tiendaConfig, dispatch } = this.props.state;
    const { slug } = this.props.router.query;
    if (slug) {
      if (tiendaConfig && tiendaConfig.tiendas && tiendaConfig.tiendas[slug]) {
     
        this.setState({ empresa: slug, config: tiendaConfig.tiendas[slug], loading: false });
      } else {
         this.setState({ empresa: slug })
          this.fetchDatosTienda(slug, dispatch);
        
      }
    }
  }

  componentDidUpdate(prevProps) {
    // Detectar cambios en el parámetro de la URL
    if (prevProps.router.query.slug !== this.props.router.query.slug) {
      this.obtenerParametroEmpresa();
    }
  }

  handleTabChange = (event, newValue) => {
    this.setState({ selectedTab: newValue });
  }

  fetchDatosTienda = async (empresaSlug, dispatch) => {
    this.setState({ loading: true, error: null });
    try {
      const requestBody = { Empresa: empresaSlug };
      let urlLocal = 'http://localhost:3000/public/tienda/clientRequestTienda';
      const response = await fetch(`${urlLocal}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      console.log('Datos de la tienda cargados:', data);
      this.setState({ config: data.config, loading: false });
      if (dispatch) {
        dispatch(setTiendaConfig(empresaSlug, data.config));
        // Extraer todos los artículos de todas las categorías y guardarlos en shop.products
        try {
          const cats = Array.isArray(data?.config?.categoriasPrincipales) ? data.config.categoriasPrincipales : [];
          const allArts = cats.reduce((acc, cat) => {
            const arts = Array.isArray(cat?.articulos) ? cat.articulos : [];
            // Evitar duplicados por _id
            arts.forEach(a => {
              if (!a || !a._id) return;
              if (!acc.some(x => x && x._id === a._id)) acc.push(a);
            });
            return acc;
          }, []);
          if (Array.isArray(allArts) && allArts.length) {
            this.props.dispatch({ type: 'SET_SHOP_PRODUCTS', payload: allArts });
          } else {
            this.props.dispatch({ type: 'SET_SHOP_PRODUCTS', payload: [] });
          }
        } catch (e) {
          this.props.dispatch({ type: 'SET_SHOP_PRODUCTS', payload: [] });
        }

      }
    } catch (error) {
      console.error('Error al cargar datos de la tienda:', error);
      this.setState({ error: error.message, loading: false });
    }
  }

  // Función para determinar si un color es claro u oscuro
  isColorLight = (color) => {
    // Remover el # si está presente
    const hex = color.replace('#', '');
    
    // Convertir a RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calcular la luminosidad usando la fórmula estándar
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    return luminance > 0.5;
  }

  handleErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  handleCarritoTienda = (art) => {
    // Reproduce sonido
   
    // Acciones de feedback
    const agregador = () => {
     
      // Agregar al carrito usando Redux
      this.props.dispatch({
        type: 'ADD_PRODUCT_TO_CART',
        payload: {
          ...art,
          CantidadCompra: 1,
            PrecioVendido: art.Precio_Venta,
          PrecioCompraTotal: art.Precio_Venta
        }
      });
      // Aquí puedes agregar feedback visual si lo deseas
      // Por ejemplo: this.setState({ agregado: true });
    };
    // Verificar si el producto ya está en el carrito
    const cart = this.props.state.shop.cart || [];
    let repetido = false;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id === art._id) {
        repetido = true;
        // Aquí puedes mostrar feedback de repetido
        // Por ejemplo: this.setState({ repetido: true });
        break;
      }
    }
    if (!repetido) {
      agregador();
      // Ejemplo: feedback opcional al agregar
      // this.showSnack('Producto agregado al carrito', 'success');
    } else {
            this.showSnack('Este producto ya está en el carrito', 'info');
  // Feedback de repetido
      // Por ejemplo: this.setState({ repetido: true });
    }
     this.setState({ showCartPanel: true });
  }

  handleShowCartPanel = () => {
    this.setState({ showCartPanel: true });
  };

  handleHideCartPanel = () => {
    this.setState({ showCartPanel: false });
  };

  render() {
  
    console.log('Estado actual:', this.state);
    const { empresa, productos, loading, error, mounted, config } = this.state;
    
    // Obtener color dinámico y determinar si es claro u oscuro
    const colorPrimario = config.colorPrimario || '#ff004c';
    const isLightColor = this.isColorLight(colorPrimario);
    const textColor = isLightColor ? '#000000' : '#ffffff';

    if (!mounted) {
      return null; // Evitar hydration mismatch
    }

    return (
      <>
        <Head>
          <title>{`Tienda ${empresa} - ${DEFAULT_SEO.title}`}</title>
          <meta 
            name="description" 
            content={`Productos y repuestos de ${empresa} - ${DEFAULT_SEO.description}`} 
          />
          <meta name="theme-color" content={colorPrimario} />
        </Head>

        <div style={{overflowX: 'hidden'}}>
          <div className="search-header-wrapper">
            <div className="search-header-container">
        
        <div className="search-header-top">
       
         <img style={{maxWidth:"250px"}} src={this.state.config.logoTiendaPreview} alt={this.state.config.nombreTienda} />
      
          <div className="search-header-icons">
             <button className="icon-button" onClick={() => this.fetchDatosTienda(this.state.empresa, this.props.dispatch)} title="Actualizar tienda">
              <RefreshIcon />
            </button>
            <button className="icon-button">
              <NotificationsIcon />
            </button>
           
            <button className="icon-button cart-button" >
              <ShoppingCartIcon />
              <span className="cart-badge">1</span>
            </button>
          </div>
        </div>

        <div className="search-header-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Buscador de productos"
          />
          <button className="search-button">
            <SearchIcon />
          </button>
        </div>
      </div>

    </div>

    {/* Sección de Grupos */}
    <div className="grupos-container">
      
      {/* Grupos Principales (Primeros 2) */}
      <div className="grupos-principales">
        {config.grupos && config.grupos.slice(0, 2).map((grupo, index) => (
          <div key={grupo.id || index} className="grupo-principal-card" onClick={() => this.handleGrupoClick(grupo)}>
            <div className="grupo-imagen-container">
              <img 
                src={grupo.icono} 
                alt={grupo.titulo}
                className="grupo-imagen"
                onError={(e) => {
                  e.target.src = '/static/placeholder-image.png';
                }}
              />
            </div>
            <div className="grupo-titulo">
              {grupo.titulo}
            </div>
          </div>
        ))}
      </div>

      {/* Grupos Secundarios (Resto) con Tabs si hay más de 3 */}
      <div className="grupos-secundarios">
        {config.grupos && config.grupos.length > 2 && (
          config.grupos.slice(2).length > 3 ? (
            <Box sx={{ 
              width: '100%',
              justifyContent: 'space-around',
              display: 'flex',
              '& .MuiTabs-root': {
                minHeight: '48px'
              },
              '& .MuiTabs-scrollButtons': {
                '&.Mui-disabled': {
                  opacity: 0.3
                }
              }
            }}>
              <Tabs
                variant="scrollable"
                scrollButtons={true}
                allowScrollButtonsMobile={true}
                value={this.state.selectedTab}
                onChange={this.handleTabChange}
                aria-label="grupos secundarios"
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: colorPrimario,
                  },
                  '& .MuiTab-root': {
                    minWidth: 'auto',
                    padding: '8px 12px',
                    opacity: 1,
                    '&:hover': {
                      opacity: 1,
                    },
                    '&.Mui-selected': {
                      opacity: 1,
                    },
                    '&.Mui-focusVisible': {
                      opacity: 1,
                    },
                    '& img': {
                      opacity: 1,
                      filter: 'none',
                    },
                    '& div': {
                      opacity: 1,
                    }
                  },
                  // Media queries para desktop - estilo grupo 1
                  '@media (min-width: 769px)': {
                    '& .MuiTab-root': {
                      background: 'white !important',
                      borderRadius: '20px !important',
                      margin: '0 8px !important',
                      padding: '0 !important',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08) !important',
                      overflow: 'hidden !important',
                      position: 'relative !important',
                      minHeight: 'auto !important',
                      display: 'flex !important',
                      flexDirection: 'column !important',
                      alignItems: 'center !important',
                      textAlign: 'center !important',
                      cursor: 'pointer !important',
                      flex: '1 !important',
                      maxWidth: '200px !important',
                      minWidth: '200px !important',
                      height: '200px !important',
                     
                    },
                    '& .MuiTabs-indicator': {
                      display: 'none !important',
                    },
                    // Hacer las imágenes grandes y anchas como grupo 1
                    '& .grupo-imagen-container-small': {
                      width: '100% !important',
                      height: '150px !important',
                      maxWidth: 'none !important',
                      maxHeight: 'none !important',
                      minWidth: '100% !important',
                      minHeight: '150px !important',
                      borderRadius: '20px 20px 0 0 !important',
                      overflow: 'hidden !important',
                      display: 'flex !important',
                      alignItems: 'center !important',
                      justifyContent: 'center !important',
                      marginBottom: '0 !important',
                    },
                    '& .grupo-imagen-small': {
                      width: '100% !important',
                      height: '100% !important',
                      objectFit: 'cover !important',
                      maxWidth: 'none !important',
                      maxHeight: 'none !important',
                      minWidth: '100% !important',
                      minHeight: '100% !important',
                    },
                    // Título en la parte inferior con background colorPrimario
                    '& .grupo-titulo-small': {
                      background: `${colorPrimario}`,
                      color: 'white!important',
                      padding: '1px 1rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      width: '100%',
                      borderRadius: '0 0 20px 20px',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                    }
                  }
                }}
              >
                {/* Renderizado condicional directo para mantener funcionalidad MUI */}
                {this.state.isMobile ? (
                  // Mobile/tablet: solo grupos desde índice 2
                  config.grupos.slice(2).map((grupo, index) => (
                    <Tab
                      onClick={() => this.handleGrupoClick(grupo)}
                      key={grupo.id || index}
                      icon={
                        <div className="grupo-secundario-card">
                          <div className="grupo-imagen-container-small">
                            <img 
                              src={grupo.icono} 
                              alt={grupo.titulo}
                              className="grupo-imagen-small"
                              onError={(e) => {
                                e.target.src = '/static/placeholder-image.png';
                              }}
                            />
                          </div>
                          <div className="grupo-titulo-small">
                            {grupo.titulo}
                          </div>
                        </div>
                      }
                    />
                  ))
                ) : (
                  // Desktop: todos los grupos
                  config.grupos.map((grupo, index) => (
                    <Tab
                     onClick={() => this.handleGrupoClick(grupo)}
                     sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: colorPrimario,
                  },
                  '& .MuiTab-root': {
                    minWidth: 'auto',
                    padding: '8px 12px',
                    opacity: 1,
                    '&:hover': {
                      opacity: 1,
                    },
                    '&.Mui-selected': {
                      opacity: 1,
                    },
                    '&.Mui-focusVisible': {
                      opacity: 1,
                    },
                    '& img': {
                      opacity: 1,
                      filter: 'none',
                    },
                    '& div': {
                      opacity: 1,
                    }
                  },
                  // Media queries para desktop - estilo grupo 1
                  '@media (min-width: 769px)': {
                    '& .MuiTab-root': {
                      background: 'white',
                      borderRadius: '20px',
                      margin: '0 8px',
                      padding: '20px 16px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      overflow: 'hidden',
                      position: 'relative',
                      minHeight: 'auto',
                      '&:hover': {
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                        transition: 'left 0.5s',
                      },
                      '&:hover::before': {
                        left: '100%',
                      }
                    },
                    '& .MuiTabs-indicator': {
                      display: 'none',
                    },
                    '& .grupo-titulo-small': {
                      color: `${colorPrimario}`,
                    }
                  }
                }}
                      key={grupo.id || index}
                      icon={
                        <div className="grupo-secundario-card">
                          <div className="grupo-imagen-container-small">
                            <img 
                              src={grupo.icono} 
                              alt={grupo.titulo}
                              className="grupo-imagen-small"
                              onError={(e) => {
                                e.target.src = '/static/placeholder-image.png';
                              }}
                            />
                          </div>
                          <div className="grupo-titulo-small">
                            {grupo.titulo}
                          </div>
                        </div>
                      }
                    />
                  ))
                )}
              </Tabs>
            </Box>
          ) : (
            <div className="grupos-secundarios-flex">
              {config.grupos.slice(2).map((grupo, index) => (
                <div key={grupo.id || index} className="grupo-secundario-card" onClick={() => this.handleGrupoClick(grupo)}>
                  <div className="grupo-imagen-container-small">
                    <img 
                      src={grupo.icono} 
                      alt={grupo.titulo}
                      className="grupo-imagen-small"
                      onError={(e) => {
                        e.target.src = '/static/placeholder-image.png';
                      }}
                    />
                  </div>
                  <div className="grupo-titulo-small">
                    {grupo.titulo}
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

    </div>

    {/* Vista de Grupo: contenedor elegante con transición */}
    {this.state.groupViewOpen && (
      <div className="grupo-view-container grupo-view-animate">
        <div className="grupo-view-header" style={{ borderColor: colorPrimario }}>
          <div className="grupo-view-title">
            <span className="pill" style={{ background: colorPrimario, color: this.isColorLight(colorPrimario) ? '#000' : '#fff' }}>
              {this.state.activeGrupo || 'Grupo'}
            </span>
            <small className="sub">Productos del grupo</small>
          </div>
          <button className="grupo-view-close" onClick={this.handleCloseGroupView}>
            Cerrar
          </button>
        </div>

        <div className="grupo-view-grid">
          {(this.props.state?.shop?.products || [])
            .filter(a => (a?.Grupo || '').toLowerCase() === (this.state.activeGrupo || '').toLowerCase())
            .map((art, idx) => (
              <div key={art._id || idx} className="grupo-view-card">
                <ProductTabCard
                  art={art}
                  empresa={empresa}
                  primaryColor={colorPrimario}
                  priceTextColor={this.isColorLight(colorPrimario) ? '#000' : '#fff'}
                  onAddToCart={(item) => this.handleCarritoTienda(item)}
                />
              </div>
            ))}
        </div>

        {((this.props.state?.shop?.products || []).filter(a => (a?.Grupo || '').toLowerCase() === (this.state.activeGrupo || '').toLowerCase()).length === 0) && (
          <div className="grupo-view-empty">No hay artículos para este grupo.</div>
        )}
      </div>
    )}

        {/* Sección de Categorías y Productos - SOLO categorías con artículos (oculta en vista de grupo) */}
        {!this.state.groupViewOpen && Array.isArray(config.categoriasPrincipales) && config.categoriasPrincipales.some(cat => Array.isArray(cat.articulos) && cat.articulos.length > 0) && (
          <div className="categorias-productos-container">
            {config.categoriasPrincipales.filter(cat => Array.isArray(cat.articulos) && cat.articulos.length > 0).map((cat, idx) => (
              <div className="categoria-card" key={cat._id}>
                <div className="categoria-header">
                  {cat.urlIcono && (
                    <img
                      src={cat.urlIcono}
                      alt={cat.nombreCat}
                      className="categoria-icono"
                      onError={e => { e.target.src = '/static/placeholder-image.png'; }}
                    />
                  )}
                  <span className="categoria-nombre">{cat.nombreCat}</span>
                </div>
                <Box sx={{ width: '100%', paddingTop: "10px" }}>
                  <Tabs
                    value={false}
                    onChange={null}

                    variant="scrollable"
                    scrollButtons={true}
                    aria-label={`tabs-articulos-${cat.nombreCat}`}
                    sx={{
                      minHeight: 260,
                      '& .MuiTab-root': {
                        minWidth: 220,
                        maxWidth: 260,
                        minHeight: 260,
                        maxHeight: 320,
                        margin: '25px 15px',
                        
                        borderRadius: '22px',
                        background: '#fff',
                        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingTop: '1px',
                        position: 'relative',
                        textAlign: 'center',
                        transition: 'box-shadow 0.18s, transform 0.18s',
                        overflow: 'hidden',
                        '&:hover': {
                          transform: 'scale(1.04)',
                          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
                        },
                        '&.Mui-selected': {
                          background: config.colorPrimario || '#ff004c',
                          color: (this.isColorLight(config.colorPrimario || '#ff004c') ? '#000' : '#fff'),
                          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
                        },
                      },
                    }}
                  >
                    {cat.articulos.map((art, aidx) => (
                      <Tab
                        key={art._id || aidx}
                        disableRipple
                        icon={
                          <ProductTabCard
                            art={art}
                            empresa={empresa}
                            primaryColor={config.colorPrimario || '#ff004c'}
                            priceTextColor={this.isColorLight(config.colorPrimario || '#ff004c') ? '#000' : '#fff'}
                            onAddToCart={(item) => this.handleCarritoTienda(item)}
                          />
                        }
                      />
                    ))}
                  </Tabs>
                
                </Box>
              </div>
            ))}
          </div>
        )}



        </div>
        {this.state.showCartPanel && (
          <CartPanel 
            key={(this.props.state.shop.cart || []).map(p=>p._id).join('-') + '-' + (this.props.state.shop.cart || []).length}
            getoff={this.handleHideCartPanel}
          />
        )}

        <Snackbar
          open={this.state.snackOpen}
          autoHideDuration={2500}
          onClose={this.handleSnackClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={this.handleSnackClose} severity={this.state.snackSeverity || 'info'} variant="filled">
            {this.state.snackMessage || 'Operación realizada'}
          </Alert>
        </Snackbar>

        <style jsx>{`
          /* --- CSS para la sección de categorías y productos --- */
          .categorias-productos-container {
            width: 100%;
          

            max-width: 1100px;
            margin: 0.2rem auto 2rem auto;
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
          }
          .categoria-card {
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 2px 16px 0 rgba(0,0,0,0.07);
            padding: 0.2rem 1.2rem 1.2rem 1.2rem;
          }
          .categoria-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 0.2rem;
          }
          .categoria-icono {
            width: 38px;
            height: 38px;
            object-fit: contain;
            border-radius: 50%;
            background: #f3f3f3;
            border: 1.5px solid #eee;
          }
          .categoria-nombre {
            font-size: 1.25rem;
            font-weight: 600;
            color: #222;
            text-transform: capitalize;
          }
          .productos-scroll {
            display: flex;
            gap: 2rem;
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }
          .producto-tarjeta {
            min-width: 260px;
            max-width: 320px;
            background: #fafbfc;
            border-radius: 16px;
            box-shadow: 0 1px 8px 0 rgba(0,0,0,0.04);
            display: flex;
            flex-direction: column;
            align-items: stretch;
            padding: 1rem 1rem 0.8rem 1rem;
            position: relative;
            transition: box-shadow 0.2s;
          }
          .producto-tarjeta:hover {
            box-shadow: 0 4px 24px 0 rgba(0,0,0,0.13);
          }
          .producto-img-wrap {
            width: 100%;
            height: 180px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.7rem;
          }
          .producto-img {
            width: 80%;
            height: 100%;
            object-fit: contain;
            border-radius: 12px;
            background: #fff;
            box-shadow: 0 1px 6px 0 rgba(0,0,0,0.04);
          }
          .producto-info-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 0.2rem;
            gap: 0.7rem;
          }
          .producto-titulo {
            font-size: 1.05rem;
            font-weight: 500;
            color: #222;
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .producto-precio-carrito {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .precio-circulo {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            font-size: 1.08rem;
            font-weight: 700;
            box-shadow: 0 1px 6px 0 rgba(0,0,0,0.07);
            margin-right: 0.2rem;
            border: 2px solid #fff;
          }
          .add-cart-btn {
            background: #fff;
            border: 1.5px solid #eee;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: box-shadow 0.18s, border 0.18s;
            box-shadow: 0 1px 4px 0 rgba(0,0,0,0.06);
          }
          .add-cart-btn:hover {
            border: 1.5px solid #bbb;
            box-shadow: 0 2px 8px 0 rgba(0,0,0,0.13);
          }
          /* ===== ESTILOS GLOBALES PARA TODOS LOS MUI TABS ===== */
          :global(.MuiTab-root) {
            opacity: 1 !important;
          }
          
          :global(.MuiTab-root:hover) {
            opacity: 1 !important;
          }
          
          :global(.MuiTab-root.Mui-selected) {
            opacity: 1 !important;
          }
          
          :global(.MuiTab-root.Mui-focusVisible) {
            opacity: 1 !important;
          }
          
          :global(.MuiTab-root img) {
            opacity: 1 !important;
            filter: none !important;
          }
          
          :global(.MuiTab-root div) {
            opacity: 1 !important;
          }
          
          :global(.MuiTab-root .grupo-secundario-card) {
            opacity: 1 !important;
          }
          
          :global(.MuiTab-root .grupo-imagen-container-small) {
            opacity: 1 !important;
          }
          
          :global(.MuiTab-root .grupo-imagen-small) {
            opacity: 1 !important;
            filter: none !important;
          }
          
          :global(.MuiTab-root .grupo-titulo-small) {
            opacity: 1 !important;
          }
          
          .tienda-empresa-container {
            min-height: 80vh;
            padding: 2rem 0;
          }
          
          .tienda-titulo {
            color: #e6003a;
            margin-bottom: 2rem;
            text-transform: capitalize;
          }
          
          .loading-container,
          .error-container,
          .no-productos {
            text-align: center;
            padding: 3rem 0;
          }
          
          .error-message {
            color: #dc3545;
            margin-bottom: 1rem;
          }
          
          .btn-retry {
            background-color: #e6003a;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
          }
          
          .btn-retry:hover {
            background-color: #cc0033;
          }
          
          .productos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
          }
          
          .producto-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 1rem;
            background: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .producto-card h3 {
            color: #333;
            margin-bottom: 0.5rem;
          }
          
          .producto-card p {
            color: #666;
            margin: 0.25rem 0;
          }
          /* ===== Vista de Grupo (container elegante con transición) ===== */
          .grupo-view-container {
            width: 100%;
            max-width: 1100px;
            margin: 0.75rem auto 2rem auto;
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            padding: 1rem 1rem 1.25rem 1rem;
            overflow: hidden;
          }
          .grupo-view-animate { animation: fadeUp 340ms cubic-bezier(.25,.8,.25,1); }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .grupo-view-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.25rem 0.25rem 0.75rem 0.25rem;
            border-bottom: 2px solid rgba(0,0,0,0.06);
          }
          .grupo-view-title { display: flex; align-items: baseline; gap: 0.75rem; }
          .grupo-view-title .pill {
            display: inline-flex;
            padding: 0.35rem 0.8rem;
            border-radius: 999px;
            font-weight: 700;
            letter-spacing: 0.3px;
          }
          .grupo-view-title .sub { color: #667085; }
          .grupo-view-close {
            background: transparent;
            border: 1px solid #e6e6e6;
            border-radius: 10px;
            padding: 0.4rem 0.8rem;
            cursor: pointer;
            color: #333;
            transition: background 0.2s ease, box-shadow 0.2s ease;
          }
          .grupo-view-close:hover { background: #f6f6f6; box-shadow: 0 2px 10px rgba(0,0,0,0.06); }
          .grupo-view-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 18px;
            padding-top: 1rem;
          }
          .grupo-view-card {
            min-height: 260px;
          }
          .grupo-view-empty {
            padding: 1rem 0.5rem 1.2rem 0.5rem;
            text-align: center;
            color: #667085;
          }
/* Fondo general */
.search-header-wrapper {
  background: ${colorPrimario};
  display: flex;
  justify-content: center;
  padding: 1rem;
}

/* Contenedor principal */
.search-header-container {
  width: 100%;
  max-width: 1000px;
  color: ${textColor};
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Parte superior */
.search-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-header-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: ${textColor};
}

/* Íconos */
.search-header-icons {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.icon-button {
  background: transparent;
  border: none;
  color: ${textColor};
  font-size: 1.25rem;
  cursor: pointer;
  position: relative;
  transition: transform 0.2s ease;
}

.icon-button:hover {
  transform: scale(1.1);
}

/* Carrito */
.cart-button {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  border-radius: 50%;
  background: white;
  color: #ff004c;
  font-size: 0.7rem;
  font-weight: bold;

  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Buscador */
.search-header-input-wrapper {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.8rem 1.2rem;
  font-size: 0.95rem;
  color: #444;
}

.search-button {
  background: transparent;
  border: none;
  padding: 10px;
  font-size: 1rem;
  color: ${colorPrimario};
  cursor: pointer;
  transition: background 0.3s ease;
}

.search-button:hover {
  background: rgba(255, 0, 76, 0.1);
}

/* Modo responsivo */
@media (min-width: 768px) {
  .search-header-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .search-header-input-wrapper {
    width: 400px;
  }

  .search-header-title {
    font-size: 1.25rem;
  }
}

/* ===== ESTILOS DE GRUPOS FLEXBOX ===== */

/* Contenedor principal de grupos */
.grupos-container {
  padding: 2rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
 
}

/* Grupos Principales (Primeros 2) */
.grupos-principales {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.grupo-principal-card {
  background: white;
  border-radius: 20px;
  padding: 0; /* Eliminado padding para imagen más grande */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  flex: 1;
  max-width: 200px;
  position: relative;
  overflow: hidden;
}

.grupo-principal-card:hover {
  
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.grupo-principal-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.grupo-principal-card:hover::before {
  left: 100%;
}

/* Grupos Secundarios */
.grupos-secundarios {
  display: flex;
  justify-content: center;
  width: 100%;
}

.grupos-secundarios-flex {
  display: flex;
   width: 100%;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.grupo-secundario-card {
  background: white;
  border-radius: 15px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  min-width: 80px;
  max-width: 150px;
  width: 30%;
}

.grupo-secundario-card:hover {

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

/* Contenedores de imagen */
.grupo-imagen-container {
  width: 100%; /* Imagen más grande, ocupa todo el ancho */
  height: 150px; /* Altura fija más grande */
  border-radius: 20px 20px 0 0; /* Solo redondear arriba */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0; /* Sin margen, pegado al título */
  transition: transform 0.3s ease;

}

.grupo-imagen-container-small {
  width: 15vw;
  height: 15vw;
  max-width: 70px;
  max-height: 70px;
  min-width: 40px;
  min-height: 40px;
  
  overflow: hidden;
  
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease;
}

.grupo-principal-card:hover .grupo-imagen-container {
  transform: rotate(5deg) scale(1.1);
}

.grupo-secundario-card:hover .grupo-imagen-container-small {
  transform: rotate(3deg) scale(1.05);
}

/* Imágenes */
.grupo-imagen {
  width: 85%; /* Imagen ocupa todo el contenedor */
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.grupo-imagen-small {
  width: 90%;
  height: 90%;
  object-fit: cover;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease;
  filter: brightness(1) contrast(1) saturate(1);
  position: relative;
}

.grupo-imagen-small:hover {
  transform: perspective(1000px) rotateY(15deg) rotateX(5deg) scale(1.1);
  filter: brightness(1.2) contrast(1.1) saturate(1.3);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.25),
    0 0 30px rgba(255, 255, 255, 0.1),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
}

/* Títulos */
.grupo-titulo {
  background: ${colorPrimario}; /* Background del color primario */
  color: white; /* Texto blanco para contraste */
  margin: 0;
  padding: 1px 1rem; /* Padding interno del título */
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  line-height: 1.3;
  text-transform: capitalize;
  width: 100%; /* Ocupa todo el ancho */
  border-radius: 0 0 20px 20px; /* Solo redondear abajo */
  position: absolute; /* Posición absoluta */
  bottom: 0; /* Pegado al fondo */
  left: 0;
}

.grupo-titulo-small {
  color: #2c3e50;
  margin: 0;
  font-size: 0.85rem;
  font-weight: 500;
  transition: color 0.3s ease;
  line-height: 1.2;
  text-transform: capitalize;
}

.grupo-principal-card:hover .grupo-titulo {
  background: ${colorPrimario};
  color: white;
  transform: scale(1.02); /* Ligero efecto de escala en hover */
}

.grupo-secundario-card:hover .grupo-titulo-small {
  color: ${colorPrimario};
}

/* Responsive */
@media (max-width: 768px) {
  /* Mobile/Tablet: Mostrar grupos principales y solo grupos secundarios desde índice 2 */
  .grupos-principales {
    flex-direction: row;
    gap: 0.8rem;
    display: flex; /* Visible en mobile/tablet */
  }
  
  .grupo-principal-card {
    flex: 1;
  }
  
  .grupos-secundarios-flex {
    gap: 1rem;
    justify-content: center;
    max-width: 100%;
  }
  
  /* Visibilidad de tabs en mobile/tablet */
  .tabs-mobile-tablet {
    display: contents; /* Visible en mobile/tablet */
  }
  
  .tabs-desktop-all {
    display: none; /* Oculto en mobile/tablet */
  }
  
  .grupo-secundario-card {
    min-width: 90px;
    max-width: 120px;
    width: calc(33.333% - 0.67rem);
    padding: 1rem 0.5rem;
    flex: 0 0 auto;
  }
  
  /* Mejor distribución para 4-6 elementos */
  .grupo-secundario-card:nth-child(n+4) {
    margin-top: 0.5rem;
  }
  
  /* Estilos para MUI Tabs - solo en pantallas pequeñas/medianas */

}

@media (max-width: 600px) {
  .grupos-secundarios-flex {
    gap: 0.8rem;
  }
  
  .grupo-secundario-card {
    min-width: 100px;
    max-width: 120px;
    width: calc(50% - 0.4rem);
  }
}

@media (min-width: 769px) {
  /* En desktop: Ocultar grupos principales y mostrar solo grupo 2 con todos los grupos */
  .grupos-container {
    flex-direction: column;
    gap: 0;
    align-items: center;
    justify-content: center;
    padding:  1rem;
    scroll-behavior: smooth;
  }
  
  .grupos-principales {
    display: none; /* Oculto en desktop */
  }
  
  .grupos-secundarios {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .grupos-secundarios-flex {
    display: flex;
    gap: 1rem;
    flex-wrap: nowrap;
    overflow-x: visible;
  }
  
  /* Visibilidad de tabs */
  .tabs-mobile-tablet {
    display: none; /* Oculto en desktop */
  }
  
  .tabs-desktop-all {
    display: contents; /* Visible en desktop */
  }
  
  /* Estilos para MUI Tabs en desktop - sin interferir con scroll */
  
  /* Todos los grupos del mismo tamaño más pequeño para que quepan */
  .grupo-principal-card {
    max-width: 120px;
    min-width: 120px;
    width: 120px;
    padding: 0.8rem;
    flex-shrink: 0;
  }
  
  .grupo-secundario-card {
    width: 100%;
    min-width: 90%;
   
    padding: 0.8rem;
    flex-shrink: 0;
  }
  
  /* Imágenes del mismo tamaño más pequeñas */
  .grupo-imagen-container {
    width: 70px;
    height: 70px;
    max-width: 70px;
    max-height: 70px;
    min-width: 70px;
    min-height: 70px;
    margin-bottom: 0.8rem;
  }
  
  .grupo-imagen-container-small {
    width: 70px;
    height: 70px;
    max-width: 70px;
    max-height: 70px;
    min-width: 70px;
    min-height: 70px;
    margin-bottom: 0.8rem;
  }
  
  /* Títulos del mismo tamaño */
  .grupo-titulo {
    font-size: 0.9rem;
    font-weight: 600;
  }
  
  .grupo-titulo-small {
    font-size: 0.9rem;
    font-weight: 600;
  }
  
  /* Estilos para scroll horizontal */
  .grupos-container::-webkit-scrollbar {
    height: 8px;
  }
  
  .grupos-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  .grupos-container::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
  }
  
  .grupos-container::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
}

@media (max-width: 480px) {
  .grupos-container {
    padding: 1rem 0.5rem;
    gap: 0.5rem;
  }
  
  .grupo-titulo {
    font-size: 1rem;
  }
  
  .grupo-titulo-small {
    font-size: 0.75rem;
  }
}
 .add-cart-btn.custom-cart-anim {
    transition: transform 0.18s cubic-bezier(.36,1.6,.3,1), box-shadow 0.18s, box-shadow 0.18s;
  }
  .add-cart-btn.custom-cart-anim:hover {
    box-shadow: 0 0 0 4px #ff004c44, 0 4px 16px 0 rgba(255,0,76,0.18), 0 2px 8px 0 rgba(0,0,0,0.13);
    background: linear-gradient(145deg, #fff 80%, #ffe6f0 100%);
    transform: scale(1.11);
    color: white;
  }
  .add-cart-btn.custom-cart-anim:active {
    transform: scale(1.18);
    box-shadow: 0 0 0 8px #ff004c33, 0 8px 24px 0 rgba(255,0,76,0.22), 0 2px 8px 0 rgba(0,0,0,0.13);
  }

        `}</style>
  
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  state
});

export default connect(mapStateToProps)(withRouter(TiendaEmpresa));