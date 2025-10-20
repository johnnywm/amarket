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
import {Tdefault} from "./tdefault";

// Cargar CartPanel solo en cliente
const CartPanel = dynamic(() => import('../../../../../components/CartPanel'), { ssr: false });
 class ProductDetail extends Component {
  static async getInitialProps(ctx) {
    try {
      
      const { articulo, slug: empresa } = ctx.query;
      let dbName = null;
      // 1. Intentar obtener tiendaConfig de localStorage (solo en cliente)
      if (typeof window !== 'undefined') {
        try {
          const persistedState = localStorage.getItem('state');
          if (persistedState) {
            const parsed = JSON.parse(persistedState);
            dbName = parsed?.tiendaConfig?.tiendas?.[empresa]?.dbName || null;
          }
       
        } catch (e) {
          // ignorar error de parseo
        }
      }
      
      // Si no está en localStorage, hacer fetch a la tienda para obtener el dbName
      if (!dbName) {
        // Usar la lógica de fetchDatosTienda para obtener config y dbName
        const requestBody = { Empresa: empresa };
        const urlLocal = 'http://localhost:3000/public/tienda/clientRequestDbname';
        const response = await fetch(urlLocal, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });
        if (response.ok) {
          const data = await response.json();
          dbName = data?.dbName || null;
        }
      }
     
      if (!dbName) {
        return { error: 'No se encontró la base de datos de la tienda.' };
      }
      const art = articulo.replaceAll("-"," ");
      const datos = {
        User: { DBname: dbName },
        Titulo: art,
      };
      // Usar URL según entorno
      const url = 'http://localhost:3000/public/engine/artbytitle';
    
      const datafetch = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' },
      });
     
      if (!datafetch.ok) {
        return { error: 'Error al obtener datos del artículo.' };
      }
      const jsondata = await datafetch.json();
      let articulosHabiles = {};
      if (jsondata.articulosHabiles && jsondata.articulosHabiles.length > 0) {
        articulosHabiles = { articulosHabiles: { ...jsondata.articulosHabiles[0] } };
      }
      if (jsondata.articulosHabilesHTML ) {
        articulosHabiles = {
          ...articulosHabiles,
          articulosHTMLHabiles:jsondata.articulosHabilesHTML,
        };
      }
      return articulosHabiles;
    } catch (err) {
      return { error: 'Error en getInitialProps: ' + (err.message || err) };
    }
  }

 maincompoRef = React.createRef();

    state={
      ondesktop:false,
      stickyElement:false,
      stickyMobile:false,
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

    componentDidMount(){
  console.log("PROPS EN ARTICULO",this.props)
      this.desktopverifi()
   
      let baseElement=   this.maincompoRef.current.clientHeight 
      let contBotoneraElement = document.querySelector('.contBonotnesAccion');

      window.addEventListener('scroll', (event) => {
      
       
        const scrollTop = window.scrollY + window.innerHeight 
       
        if(this.state.ondesktop){
         
          console.log("scrollTop",scrollTop)
          console.log("baseElement",baseElement)
          if(  scrollTop >= baseElement ){
       
            this.setState({stickyElement:true})
          
          }else{
            this.setState({stickyElement:false})
          }
        } else {
          const contBotoneraPosition = contBotoneraElement.getBoundingClientRect().top + window.scrollY;
          console.log("scrollTop",scrollTop)
          console.log("contBotoneraPosition",  contBotoneraPosition +window.innerHeight)
          if (scrollTop >= contBotoneraPosition+ window.innerHeight) {
            this.setState({ stickyMobile: true });
          } else {
            this.setState({ stickyMobile: false });
          }
        }
      })
      console.log(this.props)
      window.addEventListener('resize',()=>{
      
        this.desktopverifi()
         })
    }
    desktopverifi(){
      if(window.document.body.clientWidth >= 1100){
        this.setState({ondesktop:true})


       
      } else if(window.document.body.clientWidth < 1100){
        this.setState({ondesktop:false})
      }
    }
    render(){

let fueraDeStock = this.props.articulosHabiles?.Existencia <= 0?true:false
  let imagenes
  let productoElegido
  let   publicHTML=Tdefault
  let sticky = this.state.stickyElement?"stickyon":"stickyoff"
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
              <div   className="contCompo">
              <div  ref={this.maincompoRef} className={`subContCompo ${sticky}`}>
              <ProductSlider images={imagenes}/>
   <ProductDetailComponent product={productoElegido}/>
<div className={`contBonotnesAccion `}>
 <div className={`contB ${this.state.stickyMobile ? 'stickyMobile' : ''}` }>
 <Animate show={!fueraDeStock}>
                 <div className="modern-action-row" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
  <a
    className="modern-whatsapp-btn"
    href={`https://api.whatsapp.com/send?phone=593988801564&text=Estoy%20interesado%20en%20solicitar%20un/una%20${this.props.articulosHabiles.Titulo}%20con%20valor%20de%20$${this.props.articulosHabiles.Precio_Venta}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
      alt="WhatsApp"
      style={{ width: '28px', height: '28px' }}
    />
    WhatsApp
  </a>
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
                }
                .stickyon{
                  position: fixed;
                  width: 30.2%; 
                  bottom: -5px;
                
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
        </div>
    );
}
};




const mapStateToProps = state => {
 
  const itemSelect = state.itemSelectReducer

  return {state,itemSelect}
};

export default withRouter(connect(mapStateToProps)(ProductDetail));