import React, { Component } from 'react'
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { Animate } from 'react-animate-mount/lib/Animate';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import ProductDetailComponent from '../../../../../reduxstore/components/ProductDetail/ProductDetail';

import ProductSlider from "../../../../../reduxstore/components/ProductSlider/ProductSlider";

import {connect} from 'react-redux';
import Footer from "../../../../../components/footer"
import SlateFooter from '../../../../../components/reusable/SlateFooter';
import {Tdefault} from "../../../../../components/reusable/tdefault";

// MUI Tabs + ProductTabCard para sliders de artículos relacionados
import { Tabs, Tab, Box } from '@mui/material';
import ProductTabCard from '../../../../../components/reusable/ProductTabCard';
const buildArticuloProps = (jsondata) => {
  let articulosHabiles = {};
  if (jsondata.articulosHabiles && jsondata.articulosHabiles.length > 0) {
    articulosHabiles = { articulosHabiles: { ...jsondata.articulosHabiles[0] } };
  }
  if (jsondata.articulosHabilesHTML) {
    articulosHabiles = {
      ...articulosHabiles,
      articulosHTMLHabiles: jsondata.articulosHabilesHTML,
    };
  }
  return articulosHabiles;
};

// Cargar CartPanel solo en cliente
const CartPanel = dynamic(() => import('../../../../../components/CartPanel'), { ssr: false });
 class ProductDetail extends Component {
  static async getInitialProps(ctx) {
    try {
      
      const { articulo, slug: empresa } = ctx.query;
      if (!articulo || !empresa) {
        return { error: 'Parámetros de tienda o artículo no válidos.' };
      }

      const requestBody = { Empresa: empresa };
      const urlProd = process.env.NEXT_PUBLIC_PROD_URL + '/public/tienda/clientRequestDbname';
      
      const response = await fetch(urlProd, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      let dbName = null;
      if (response.ok) {
        const data = await response.json();
        dbName = data?.dbName || null;
      }
     
      if (!dbName) {
        return { error: 'No se encontró la base de datos de la tienda.' };
      }
      const art = articulo.replaceAll("_"," ").replaceAll("~","/");
      const datos = {
        User: { DBname: dbName },
        Titulo: art,
      };
      const urlProd2 = process.env.NEXT_PUBLIC_PROD_URL + '/public/engine/artbytitle';
      const datafetch = await fetch(urlProd2, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' },
      });
     
      if (!datafetch.ok) {
        return { error: 'Error al obtener datos del artículo.' };
      }
      const jsondata = await datafetch.json();
      const articulosHabiles = buildArticuloProps(jsondata);
      return { ...articulosHabiles, dbName };
    } catch (err) {
      return { error: 'Error en getInitialProps: ' + (err.message || err) };
    }
  }

 maincompoRef = React.createRef();
  htmlcompoRef = React.createRef();

    state={
      mounted:false,
      stickyActive:false,
      stickyExiting:false,
      stickyAtBottom:false,
      showCartPanel:false,
      snackOpen:false,
      snackMessage:'',
      snackSeverity:'info',
      articulosHabiles: null,
      articulosHTMLHabiles: null,
      dbName: null,
    }

    // Helper para mostrar Snackbar con mensaje y severidad dinámica
    showSnack = (message, severity = 'info') => {
      this.setState({ snackOpen: true, snackMessage: message, snackSeverity: severity });
    }

    // Agregar al carrito con verificación de repetidos y abrir panel
    handleCarritoTienda = (art) => {
      if (!art || !art._id) return;
      const agregador = () => {
        this.props.dispatch({
          type: 'ADD_PRODUCT_TO_CART',
          payload: {
            ...art,
            CantidadCompra: 1,
            PrecioVendido: art.Precio_Venta,
            PrecioCompraTotal: art.Precio_Venta
          }
        });
      };
      const cart = (this.props.state && this.props.state.shop && this.props.state.shop.cart) ? this.props.state.shop.cart : [];
      let repetido = false;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i]._id === art._id) {
          repetido = true;
          break;
        }
      }
      if (!repetido) {
        agregador();
      } else {
        this.showSnack('Este producto ya está en el carrito', 'info');
      }
      this.setState({ showCartPanel: true });
    }

    handleSnackClose = (event, reason) => {
      if (reason === 'clickaway') return;
      this.setState({ snackOpen: false });
    }

 componentDidMount() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  console.log("PROPS EN ARTICULO", this.props);

  // Guardar dbName y marcar montado
  this.setState({
    mounted: true,
    dbName: this.props.dbName || null,
  });

  // Si no hay datos del artículo (navegación client-side), hacer fetch
  if (!this.props.articulosHabiles && this.props.dbName) {
    const articuloSlug = this.props.router?.query?.articulo;
    const empresa = this.props.router?.query?.slug;
    if (articuloSlug && empresa) {
      setTimeout(() => this.fetchArticuloData(empresa, articuloSlug), 50);
    }
  }

   setTimeout(() => {
    this.recalcularMedidas = () => {
      this.maincompoHeight = this.maincompoRef.current
        ? this.maincompoRef.current.clientHeight
        : 0;
    };

    this.handleScroll = () => {
      if (this._stickyPaused) return;

      // Solo aplicar sticky en desktop (>= 1100px)
      if (window.innerWidth < 1100) {
        if (this.state.stickyActive || this.state.stickyAtBottom) {
          this.setState({ stickyActive: false, stickyAtBottom: false });
        }
        return;
      }

      // Protección: no decidir si el maincompo no tiene altura (transición de artículo)
      if (!this.maincompoHeight || this.maincompoHeight <= 0) return;

      const scrollBottom = window.scrollY + window.innerHeight;
      // scrollHeight es el fin real del documento, siempre estable
      
      // Posición absoluta del final del .htmlcontent (offsetTop acumulado + altura)
      const htmlEl = this.htmlcompoRef.current;
      let htmlEnd = 0;
      if (htmlEl) {
        let ot = 0;
        let el = htmlEl;
        while (el) { ot += el.offsetTop; el = el.offsetParent; }
        htmlEnd = ot + htmlEl.offsetHeight;
      }
      // Activar sticky cuando el fondo del viewport alcanza/pasa el fondo del maincompo + 29px
      const pastMaincompo = scrollBottom >= this.maincompoHeight + 29;
      // Desactivar sticky cuando el fondo del viewport alcanza el final del htmlcontent
      const pastHtmlEnd = htmlEnd  > 0 && scrollBottom >= htmlEnd - 3;
console.log("SCROLL:", scrollBottom, "MAINCOMPO:", this.maincompoHeight, "HTMLEND:", htmlEnd);
      if (pastHtmlEnd) {
        // Llegó al final del
        if (!this.state.stickyAtBottom) {
          this.setState({ stickyActive: false, stickyAtBottom: true });
        }
      } else if (pastMaincompo) {
        // Zona media: sticky flotando
        if (!this.state.stickyActive) {
          this.setState({ stickyActive: true, stickyAtBottom: false });
        }
      } else {
        // Scroll inicial / volviendo arriba: normal flow
        if (this.state.stickyActive || this.state.stickyAtBottom) {
          this.setState({ stickyActive: false, stickyAtBottom: false });
        }
      }
    };

    this.handleResize = () => {
      this.recalcularMedidas();
      this.handleScroll();
    };

    this.recalcularMedidas();
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
    this.handleScroll();
  }, 100);
}
componentWillUnmount() {
  window.removeEventListener("scroll", this.handleScroll);
  window.removeEventListener("resize", this.handleResize);
}

  fetchArticuloData = async (empresa, articuloSlug) => {
    try {
      const dbName = this.state.dbName;
      if (!dbName) return;
      const art = articuloSlug.replaceAll('-', ' ').replaceAll('_', '/');
      const datos = { User: { DBname: dbName }, Titulo: art };
      const urlArt = process.env.NEXT_PUBLIC_PROD_URL + '/public/engine/artbytitle';
      const respArt = await fetch(urlArt, { method: 'POST', body: JSON.stringify(datos), headers: { 'Content-Type': 'application/json' } });
      if (!respArt.ok) return;
      const jsondata = await respArt.json();
      const habiles = buildArticuloProps(jsondata);
      this.setState({
        articulosHabiles: habiles?.articulosHabiles || null,
        articulosHTMLHabiles: habiles?.articulosHTMLHabiles || null,
      }, () => {
        // Doble rAF: el primero resetea scroll con altura real del DOM ya commiteado,
        // el segundo mide post layout+paint del browser
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
          requestAnimationFrame(() => {
            this._stickyPaused = false;
            if (typeof this.recalcularMedidas === 'function') {
              this.recalcularMedidas();
            }
            if (typeof this.handleScroll === 'function') {
              this.handleScroll();
            }
          });
        });
      });
    } catch (err) {
      console.error('Error al recargar artículo:', err);
    }
  };

   componentDidUpdate(prevProps) {
     console.log("en update");
    
     const prevArticulo = prevProps.router?.query?.articulo;
     const currArticulo = this.props.router?.query?.articulo;
     const empresa = this.props.router?.query?.slug;
     if (currArticulo && currArticulo !== prevArticulo && empresa) {
       // Pausar sticky durante la transición de artículo
       this._stickyPaused = true;
       this.maincompoHeight = 0;
       this.setState({
         stickyActive: false,
         stickyAtBottom: false,
       });
        
       this.fetchArticuloData(empresa, currArticulo);
     }
   }

     // Determinar si un color es claro u oscuro
    isColorLight = (color) => {
      let r, g, b;
      if (color && color.startsWith('#')) {
        let hex = color.replace('#', '');
        if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      } else if (color && color.startsWith('rgb')) {
        const values = color.match(/\d+/g).map(Number);
        [r, g, b] = values;
      } else {
        return false;
      }
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      return luminance > 186;
    };

    render(){
      // Usar state (actualizado por fetchArticuloData) con fallback a props (SSR)
      const articulosHabiles = this.state.articulosHabiles || this.props.articulosHabiles;
      const articulosHTMLHabiles = this.state.articulosHTMLHabiles || this.props.articulosHTMLHabiles;

let fueraDeStock = articulosHabiles?.Existencia <= 0?true:false
  let imagenes
  let productoElegido
  let   publicHTML=Tdefault
   let sticky;
   if (this.state.stickyAtBottom) {
     sticky = 'stickybottom';
   } else if (this.state.stickyActive) {
     sticky = 'stickyon';
   } else {
     sticky = 'stickyoff';
   }
  if(articulosHabiles){

    if(articulosHabiles.Imagen && articulosHabiles.Imagen[0] != ""){
      imagenes = articulosHabiles.Imagen
    }else{
      imagenes = ["/tienda/portada1.jpg","/tienda/portada2.jpg","/tienda/portada3.jpg"]
    }
     
      productoElegido = articulosHabiles
      
  }
  else{
    imagenes = ["/tienda/portada1.jpg","/tienda/portada2.jpg","/tienda/portada3.jpg"]
    productoElegido = {}
  
  }
  if(articulosHTMLHabiles){
    publicHTML = articulosHTMLHabiles
  }
  
    return (
        <div className="" style={{paddingTop: "1px"}}>
              <div
  className="back-arrow"
  onClick={() => {
    const slug = this.props.router?.query?.slug;
    if (slug) {
      this.props.router.push(`/empresa/${slug}/tienda`);
    } else {
      this.props.router.back();
    }
  }}
  title="Volver atrás"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="32"
    height="32"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
  <span>Atrás</span>
</div>

<style jsx>{`
  .back-arrow {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .back-arrow:hover {
    transform: translateX(-5px);
  }

  .back-arrow span {
    margin-left: 8px;
    font-size: 16px;
    font-weight: bold;
  }
`}</style>
             <div className="card">
               <div className="contFlex">
               <div
                 className={`contCompo${this.state.stickyAtBottom ? ' stickyparentbottom' : ''}`}
                 style={
                   (this.state.stickyActive || this.state.stickyAtBottom)
                     ? { minHeight: this.maincompoRef.current ? this.maincompoRef.current.offsetHeight : 0 }
                     : {}
                 }
               >
               <div  ref={this.maincompoRef} className={`subContCompo ${sticky}`}>
               <ProductSlider images={imagenes}/>
    <ProductDetailComponent product={productoElegido}/>
 <div className="contBonotnesAccion">
  <div className="contB">
 <Animate show={!fueraDeStock}>
                 <div className="modern-action-row" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
  <a
  className="modern-whatsapp-btn"
  href={`https://api.whatsapp.com/send?phone=${
    (() => {
      const tiendas =
        this.props.state?.tiendaConfig?.tiendas || {};

      const slug =
        this.props.router?.query?.slug;

      const waNumber = tiendas[slug]?.WaNumber || "0998801564";

      return waNumber.startsWith("0")
        ? `593${waNumber.slice(1)}`
        : waNumber;
    })()
  }&text=${encodeURIComponent(
    `Estoy interesado en solicitar un/una ${articulosHabiles?.Titulo} con valor de $${articulosHabiles?.Precio_Venta}`
  )}`}
  target="_blank"
  rel="noopener noreferrer"   
  style={{ display: "flex", alignItems: "center", gap: "8px" }}
> <img
      src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
      alt="WhatsApp"
      style={{ width: '28px', height: '28px' }}
    />
    WhatsApp</a>
  <button
    className="modern-cart-btn cartAccent"
    onClick={() => this.handleCarritoTienda(articulosHabiles)}
    disabled={fueraDeStock}
    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
  >
    <ShoppingCartIcon style={{ fontSize: '28px' }} />
    Carrito
  </button>
</div>
               </Animate>
                <Animate show={fueraDeStock}>
                  <p>AGOTADO</p>
                </Animate>
                  </div>
   </div>
   </div>
            </div>
            {this.state.showCartPanel && (
              <CartPanel getoff={() => this.setState({showCartPanel:false})} />
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
          
<div ref={this.htmlcompoRef} className='htmlcontent'   dangerouslySetInnerHTML={{ __html: publicHTML}}></div>
        
            
            </div>
         
            </div>

        {/* ===== SLIDER: Artículos del mismo GRUPO (solo cliente) ===== */}
        {this.state.mounted && (() => {
          const slugKey = this.props.router?.query?.slug;
          const tiendaCfg = this.props.state?.tiendaConfig?.tiendas?.[slugKey];
          const colorPrimario = tiendaCfg?.colorPrimario || '#ff004c';
          const allProducts = this.props.state?.shop?.products || [];
          const currentId = articulosHabiles?._id;
          const grupoActual = articulosHabiles?.Grupo;
          const grupoArts = grupoActual
            ? allProducts.filter(a => a._id !== currentId && String(a?.Grupo || '').toLowerCase() === String(grupoActual).toLowerCase())
            : [];
          if (grupoArts.length === 0) return null;
          return (
            <Box sx={{ width: '100%', maxWidth: 1100, margin: '1.5rem auto', paddingTop: '10px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#222', marginBottom: '0.5rem', textTransform: 'capitalize' }}>
                Más de {grupoActual}
              </div>
              <Tabs
                value={false}
                onChange={null}
                variant="scrollable"
                scrollButtons={true}
                aria-label="articulos-mismo-grupo"
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
                      background: colorPrimario,
                      color: (this.isColorLight(colorPrimario) ? '#000' : '#fff'),
                      boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
                    },
                  },
                }}
              >
                {grupoArts.map((art, aidx) => (
                  <Tab
                    key={art._id || aidx}
                    disableRipple
                    icon={
                      <ProductTabCard
                        art={art}
                        empresa={this.props.router?.query?.slug}
                        primaryColor={colorPrimario}
                        priceTextColor={this.isColorLight(colorPrimario) ? '#000' : '#fff'}
                        onAddToCart={(item) => this.handleCarritoTienda(item)}
                      />
                    }
                  />
                ))}
              </Tabs>
            </Box>
          );
        })()}

        {/* ===== SLIDER: Artículos de la misma CATEGORÍA (solo cliente) ===== */}
        {this.state.mounted && (() => {
          const slugKey = this.props.router?.query?.slug;
          const tiendaCfg = this.props.state?.tiendaConfig?.tiendas?.[slugKey];
          const colorPrimario = tiendaCfg?.colorPrimario || '#ff004c';
          const allProducts = this.props.state?.shop?.products || [];
          const currentId = articulosHabiles?._id;
          const catActual = articulosHabiles?.Categoria?.nombreCat;
          const catArts = catActual
            ? allProducts.filter(a => a._id !== currentId && String(a?.Categoria?.nombreCat || '').toLowerCase() === String(catActual).toLowerCase())
            : [];
          if (catArts.length === 0) return null;
          return (
            <Box sx={{ width: '100%', maxWidth: 1100, margin: '1.5rem auto', paddingTop: '10px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#222', marginBottom: '0.5rem', textTransform: 'capitalize' }}>
                Más en {catActual}
              </div>
              <Tabs
                value={false}
                onChange={null}
                variant="scrollable"
                scrollButtons={true}
                aria-label="articulos-misma-categoria"
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
                      background: colorPrimario,
                      color: (this.isColorLight(colorPrimario) ? '#000' : '#fff'),
                      boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
                    },
                  },
                }}
              >
                {catArts.map((art, aidx) => (
                  <Tab
                    key={art._id || aidx}
                    disableRipple
                    icon={
                      <ProductTabCard
                        art={art}
                        empresa={this.props.router?.query?.slug}
                        primaryColor={colorPrimario}
                        priceTextColor={this.isColorLight(colorPrimario) ? '#000' : '#fff'}
                        onAddToCart={(item) => this.handleCarritoTienda(item)}
                      />
                    }
                  />
                ))}
              </Tabs>
            </Box>
          );
        })()}

            <style >{`
            #u_body{
                    
              border-radius: 15px;
            }
            .htmlcontent{
              border-radius: 20px;
          
              max-width: 740px;
            
              border-radius: 15px;
            }
            .contFlex{
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
          
           
            }
                .contCompo{
                       
                    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
    color: black;
    flex-flow: column;
    border-radius: 15px;
                }
                .subContCompo{
                  width: 100%; 
                  padding-bottom: 10px;
                  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .stickyon{
                  position: fixed;
                  width: 30.2%; 
                  bottom: 0px;
                  
                }
                .stickybottom{
                  position: relative;
                  width: 100%;
                }
                .stickyoff{
                  position: relative;
                  width: 100%;
                }
                .stickyparentbottom{
                  justify-content: flex-end !important;
                }
                
                @media only screen and (min-width: 1100px) { 
                  .htmlcontent{
                   
                    margin-right:10px;
                  }
                  .contCompo{
                    display: flex;
    flex-wrap: wrap;
    max-width: 30%;
margin-bottom:10px;
    color: black;
    flex-flow: column;
   transition:1s;
    border-radius: 15px;
                }
               }
                .modern-stock {
  font-size: 1rem;
  color: #666;
  font-weight: 400;
}
.modern-description {
  font-size: 1.08rem;
  color: #222;
  opacity: 0.92;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}
.modern-action-row {
  display: flex;
  flex-direction: row;
 
  align-items: center;
  justify-content: flex-end;
     box-shadow: 0 8px 32px 0 rgba(34, 34, 34, 0.18), 0 1.5px 6px 0 rgba(0, 0, 0, 0.10);
    border: 1.5px solid rgba(34, 34, 34, 0.10);
       background: rgba(255, 255, 255, 0.85);
    border-radius: 2rem;
     padding:  10px 5px
}
  .modern-card-body44 {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    backdrop-filter: blur(6px);
    transition: box-shadow 0.3s cubic-bezier(.4, 2, .3, 1), transform 0.2s cubic-bezier(.4, 2, .3, 1);
    position: relative;
}
.modern-whatsapp-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.08rem;
  font-weight: 600;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  padding: 0.7rem 1.5rem;
    background: RGB(37, 211, 102);
      box-shadow: 0 2px 8px 0 rgba(34,34,34,0.10), 0 1px 2px 0 rgba(0,0,0,0.07);
  color: #222;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.15s, background 0.2s;
  position: relative;
  text-decoration: none;
  min-width: 120px;
  justify-content: center;
}
.modern-whatsapp-btn:hover {
  background: linear-gradient(135deg, #f5f5f5 80%, #d6d6d6 100%);
  box-shadow: 0 4px 16px 0 rgba(34,34,34,0.16), 0 2px 4px 0 rgba(0,0,0,0.10);
  transform: translateY(-2px) scale(1.03);
}
.modern-whatsapp-btn svg {
  display: inline-block;
  vertical-align: middle;
}
.modern-cart-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.08rem;
  font-weight: 600;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  padding: 0.7rem 1.5rem;
  background: linear-gradient(135deg, #fff 80%, #eaeaea 100%);
  box-shadow: 0 2px 8px 0 rgba(34,34,34,0.10), 0 1px 2px 0 rgba(0,0,0,0.07);
  color: #222;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.15s, background 0.2s;
  position: relative;
  text-decoration: none;
  min-width: 120px;
  justify-content: center;
}
.cartAccent {
  background: linear-gradient(135deg, #e53935 80%, #b71c1c 100%) !important;
  color: #fff !important;
  box-shadow: 0 4px 16px 0 rgba(229,57,53,0.18), 0 2px 4px 0 rgba(0,0,0,0.10);
  border: none !important;
}.contBonotnesAccion {
height: 75px;
}
.modern-cart-btn:hover, .cartAccent:hover {
  background: linear-gradient(135deg, #f5f5f5 80%, #d6d6d6 100%);
  box-shadow: 0 4px 16px 0 rgba(34,34,34,0.16), 0 2px 4px 0 rgba(0,0,0,0.10);
  transform: translateY(-2px) scale(1.03);
}
.modern-cart-btn svg {
  display: inline-block;
  vertical-align: middle;
}
.cartAccent:disabled {
  opacity: 0.5;
  background: linear-gradient(135deg, #f5f5f5 80%, #eaeaea 100%) !important;
  color: #aaa !important;
  cursor: not-allowed;
}
.modern-whatsapp-btn span, .modern-cart-btn span {
  font-weight: 600;
  color: #222;
  letter-spacing: 0.1px;
}
.priceAccent span {
  color: #e53935 !important;
}

               @media only screen and (min-width: 600px) { 
                .contCompo{
                  width: 65%;
             } 
            }
               @media only screen and (min-width: 800px) { 
                .contCompo{
                  width: 50%;
             } 
            }
           
                `}

            </style>

        {/* ===== SlateFooter ===== */}
        {this.state.mounted && (
          <SlateFooter
            config={(() => {
              const slugKey = this.props.router?.query?.slug;
              return this.props.state?.tiendaConfig?.tiendas?.[slugKey] || {};
            })()}
            empresa={this.props.router?.query?.slug || ''}
          />
        )}

        </div>
    );
}
};



const mapStateToProps = state => {
 
  const itemSelect = state.itemSelectReducer

  return {state,itemSelect}
};

export default withRouter(connect(mapStateToProps)(ProductDetail));