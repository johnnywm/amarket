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
import {Tdefault} from "./tdefault";

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
      const art = articulo.replaceAll("-"," ");
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
      return articulosHabiles;
    } catch (err) {
      return { error: 'Error en getInitialProps: ' + (err.message || err) };
    }
  }

 maincompoRef = React.createRef();

    state={
      mounted:false,
      ondesktop:false,
      stickyElement:false,
      stickyAtBottom:false,
      stickyExiting:false,
      stickyMobile:false,
      stickyMobileAtBottom:false,
      stickyMobileExiting:false,
      showCartPanel:false,
      snackOpen:false,
      snackMessage:'',
      snackSeverity:'info',
    }

    // Helper para mostrar Snackbar con mensaje y severidad dinámica
    showSnack = (message, severity = 'info') => {
      this.setState({ snackOpen: true, snackMessage: message, snackSeverity: severity });
    }

    // Agregar al carrito con verificación de repetidos y abrir panel
    handleCarritoTienda = (art) => {
      if (!art || !art._id) return;
      // Reproduce sonido (opcional)
      // const audio = new Audio('/sounds/add.mp3'); audio.play();

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
      const cart = (this.props.state && this.props.state.shop && this.props.state.shop.cart) ? this.props.state.shop.cart : [];
      let repetido = false;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i]._id === art._id) {
          repetido = true;
          // Feedback de repetido (opcional)
          // this.setState({ repetido: true });
          break;
        }
      }

      if (!repetido) {
        agregador();
        // Si deseas feedback al agregar correctamente, descomenta:
        // this.showSnack('Producto agregado al carrito', 'success');
      } else {
        // Mostrar mensaje de repetido
        this.showSnack('Este producto ya está en el carrito', 'info');
      }
        this.setState({ showCartPanel: true });
    }

    handleSnackClose = (event, reason) => {
      if (reason === 'clickaway') return;
      this.setState({ snackOpen: false });
    }

 componentDidMount() {
  // Llevar la página al inicio
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  console.log("PROPS EN ARTICULO", this.props);

  // Detectar desktop/mobile
  this.desktopverifi();

  // Marcar como montado en cliente para evitar hydration mismatch con Redux
  this.setState({ mounted: true });

  // Esperar a que TODO el DOM termine de renderizar
  // (incluyendo imágenes y componentes hijos)
  setTimeout(() => {
    // Obtener referencias definitivas
    this.baseElement = this.maincompoRef.current
      ? this.maincompoRef.current.clientHeight
      : 0;

    this.contBotoneraElement = document.querySelector(
      ".contBonotnesAccion"
    );

    // Función para recalcular posiciones
    this.recalcularMedidas = () => {
      this.baseElement = this.maincompoRef.current
        ? this.maincompoRef.current.clientHeight
        : 0;

      this.contBotoneraElement = document.querySelector(
        ".contBonotnesAccion"
      );

      if (this.contBotoneraElement) {
        this.contBotoneraPosition =
          this.contBotoneraElement.getBoundingClientRect().top +
          window.scrollY;
      } else {
        this.contBotoneraPosition = 0;
      }

      // Referencia al htmlcontent para límite inferior del sticky
      this.htmlContentElement = document.querySelector('.htmlcontent');
      if (this.htmlContentElement) {
        const rect = this.htmlContentElement.getBoundingClientRect();
        this.htmlContentTop = rect.top + window.scrollY;
        this.htmlContentBottom = rect.top + window.scrollY + rect.height;
      } else {
        this.htmlContentTop = 0;
        this.htmlContentBottom = 0;
      }
    };

    // Handler del scroll
    this.handleScroll = () => {
      const scrollTop = window.scrollY + window.innerHeight;

      if (this.state.ondesktop) {
        // Si está arriba, nunca activar sticky
        if (window.scrollY === 0) {
          if (this.state.stickyElement) {
            this.setState({ stickyElement: false });
          }
          return;
        }

        const margen = 15;

        // Activar sticky cuando el scroll pase el maincompo
        const pasadoMaincompo = scrollTop >= (this.baseElement + margen);
        // Detectar cuando el scroll llegue al final del htmlcontent
        const llegadoAlHtml = this.htmlContentBottom > 0 && scrollTop >= this.htmlContentBottom;

        const sticky = pasadoMaincompo && !llegadoAlHtml;
        const atBottom = pasadoMaincompo && llegadoAlHtml;

        const update = {};
        // Desktop: sticky se activa → set directo. Sticky se desactiva → fade-out primero
        if (sticky && !this.state.stickyElement && !this.state.stickyExiting) {
          update.stickyElement = true;
          update.stickyExiting = false;
        } else if (!sticky && this.state.stickyElement && !this.state.stickyExiting) {
          update.stickyElement = false;
          update.stickyExiting = true;
          this._stickyExitTimer = setTimeout(() => {
            this.setState({ stickyExiting: false });
          }, 350);
        }
        if (atBottom !== this.state.stickyAtBottom) update.stickyAtBottom = atBottom;
        if (Object.keys(update).length > 0) this.setState(update);
      } else {
        const pasadoBotonera = scrollTop >= (this.contBotoneraPosition + window.innerHeight);
        const llegadoAlHtmlMobile = this.htmlContentBottom > 0 && scrollTop >= this.htmlContentBottom;

        const stickyMobile = pasadoBotonera && !llegadoAlHtmlMobile;
        const atBottomMobile = pasadoBotonera && llegadoAlHtmlMobile;

        const updateMob = {};
        // Mobile: sticky se activa → set directo. Sticky se desactiva → fade-out primero
        if (stickyMobile && !this.state.stickyMobile && !this.state.stickyMobileExiting) {
          updateMob.stickyMobile = true;
          updateMob.stickyMobileExiting = false;
        } else if (!stickyMobile && this.state.stickyMobile && !this.state.stickyMobileExiting) {
          updateMob.stickyMobile = false;
          updateMob.stickyMobileExiting = true;
          this._stickyMobileExitTimer = setTimeout(() => {
            this.setState({ stickyMobileExiting: false });
          }, 350);
        }
        if (atBottomMobile !== this.state.stickyMobileAtBottom) updateMob.stickyMobileAtBottom = atBottomMobile;
        if (Object.keys(updateMob).length > 0) this.setState(updateMob);
      }
    };

    // Handler del resize
    this.handleResize = () => {
      this.desktopverifi();
      this.recalcularMedidas();
      this.handleScroll();
    };

    // Calcular medidas finales
    this.recalcularMedidas();

    // Agregar listeners
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);

    // Ejecutar una vez con las medidas correctas
    this.handleScroll();
  }, 100); // Espera 100 ms para asegurar render completo
}
componentWillUnmount() {
  window.removeEventListener("scroll", this.handleScroll);
  window.removeEventListener("resize", this.handleResize);
}

    desktopverifi(){
      if(window.document.body.clientWidth >= 1100){
        this.setState({ondesktop:true})


       
      } else if(window.document.body.clientWidth < 1100){
        this.setState({ondesktop:false})
      }
    }

    // Determinar si un color es claro u oscuro (misma lógica que tienda/index.js)
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
console.log("PROPS EN RENDER",this.props)
let fueraDeStock = this.props.articulosHabiles?.Existencia <= 0?true:false
  let imagenes
  let productoElegido
  let   publicHTML=Tdefault
  let sticky;
  if (this.state.stickyAtBottom) {
    sticky = 'stickybottom';
  } else if (this.state.stickyExiting) {
    sticky = 'stickyexiting';
  } else if (this.state.stickyElement) {
    sticky = 'stickyon';
  } else {
    sticky = 'stickyoff';
  }
  if(this.props.articulosHabiles){

    if(this.props.articulosHabiles.Imagen[0] != ""){
      imagenes = this.props.articulosHabiles.Imagen
    }else{
      imagenes = ["/tienda/portada1.jpg","/tienda/portada2.jpg","/tienda/portada3.jpg"]
    }
     
      productoElegido =this.props.articulosHabiles
      
  }
  else{
    imagenes = ["/tienda/portada1.jpg","/tienda/portada2.jpg","/tienda/portada3.jpg"]
    productoElegido = {}
  
  }
  if(this.props.articulosHTMLHabiles){
    publicHTML=this.props.articulosHTMLHabiles
  }
  
    return (
        <div className="" style={{paddingTop: "1px"}}>
              <div
  className="back-arrow"
  onClick={() => this.props.router.back()}
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
              <div className={`contCompo${this.state.stickyAtBottom ? ' stickyparentbottom' : ''}`}>
              <div  ref={this.maincompoRef} className={`subContCompo ${sticky}`}>
              <ProductSlider images={imagenes}/>
   <ProductDetailComponent product={productoElegido}/>
<div className={`contBonotnesAccion `}>
 <div className={`contB${this.state.stickyMobileExiting ? ' stickyMobileExiting' : ''}${this.state.stickyMobile ? ' stickyMobile' : ''}${this.state.stickyMobileAtBottom ? ' stickyMobileAtBottom' : ''}`}>
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

      // Si empieza con 0, se reemplaza por 593
      return waNumber.startsWith("0")
        ? `593${waNumber.slice(1)}`
        : waNumber;
    })()
  }&text=${encodeURIComponent(
    `Estoy interesado en solicitar un/una ${this.props.articulosHabiles.Titulo} con valor de $${this.props.articulosHabiles.Precio_Venta}`
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
    onClick={() => this.handleCarritoTienda(this.props.articulosHabiles)}
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
          
            <div className='htmlcontent'   dangerouslySetInnerHTML={{ __html: publicHTML}}></div>
        
            
            </div>
         
            </div>

        {/* ===== SLIDER: Artículos del mismo GRUPO (solo cliente) ===== */}
        {this.state.mounted && (() => {
          const slugKey = this.props.router?.query?.slug;
          const tiendaCfg = this.props.state?.tiendaConfig?.tiendas?.[slugKey];
          const colorPrimario = tiendaCfg?.colorPrimario || '#ff004c';
          const allProducts = this.props.state?.shop?.products || [];
          const currentId = this.props.articulosHabiles?._id;
          const grupoActual = this.props.articulosHabiles?.Grupo;
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
          const currentId = this.props.articulosHabiles?._id;
          const catActual = this.props.articulosHabiles?.Categoria?.nombreCat;
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
margin-bottom:10px;
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
                  bottom: -5px;
                  animation: stickyFadeIn 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                .stickybottom{
                  position: relative;
                  width: 100%;
                  animation: stickyFadeToBottom 0.35
                }
                @keyframes stickyFadeIn {
                  from { opacity: 0.85; transform: translateY(12px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                @keyframes stickyFadeToBottom {
                  from { opacity: 1; transform: translateY(0); }
                  to { opacity: 0.95; transform: translateY(0); }
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
     .stickyMobile{
      position: fixed;
      top: 0px;
          left: 0px;
      width: 100%;
      animation: stickyMobileFadeIn 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
     .stickyMobileAtBottom{
      position: relative;
      width: 100%;
      animation: stickyMobileFadeToBottom 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
     @keyframes stickyMobileFadeIn {
       from { opacity: 0.8; transform: translateY(-8px); }
       to { opacity: 1; transform: translateY(0); }
     }
     @keyframes stickyMobileFadeToBottom {
       from { opacity: 1; transform: translateY(0); }
       to { opacity: 0.95; transform: translateY(0); }
     }

  .modern-card-body44 {
 

   
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex
;
    flex-direction: column;
    gap: 1.2rem;
    backdrop-filter: blur(6px);
    transition: box-shadow 0.3s 
cubic-bezier(.4, 2, .3, 1), transform 0.2s 
cubic-bezier(.4, 2, .3, 1);
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