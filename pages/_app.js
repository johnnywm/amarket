import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose  } from 'redux';
import "../styles/main.css"
import thunk from "redux-thunk";
import Navbar from "../components/navbar"
import { DEFAULT_SEO } from '../config';
import Head from 'next/head';
import App from 'next/app'
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import { PageTransition } from 'next-page-transitions'
import Router from 'next/router';
import inireducer from '../reduxstore/reducers';
import { Workbox } from "workbox-window";
import FacebookPixel from '../components/FacebookPixel'

import Snackbar from '@mui/material/Snackbar';

import {updateUser, updateOrders} from "../reduxstore/actions/myact"
import "../styles/nav.css"
import "../styles/carrousel.scss"
import "../styles/borderanim.scss"
import "../styles/slide.scss"
import "../styles/main.css"
import "../styles/arrow.css"
import "../styles/main2.scss"
import "../styles/why.css"
import "../styles/autosugest.css"
import "../styles/borderanim.scss"
import '../styles/LayoutMode.scss';
import '../styles/BrandFilter.scss';
import '../styles/Product.scss';
import '../styles/GroupFilter.scss';
import '../styles/OrderFilter.scss';
import '../styles/category.scss';
import '../styles/BrandFilterPC.scss';
import '../styles/CartItem.scss';
import '../styles/ProductSlider.scss';
import '../styles/SlideDots.scss';
//import 'react-credit-cards/es/styles-compiled.css';
import "../styles/autosugest.css"
import 'bootstrap/dist/css/bootstrap.min.css';
export const saveToLocalStorage=(state)=>{
  try{
const serializedState = JSON.stringify(state)
localStorage.setItem("state", serializedState)
  } catch(e){

  }
}

export const loadFromLocalStorage=(state)=>{
 
  try{
const serializedState = localStorage.getItem("state")

if(serializedState === null) return undefined
return JSON.parse(serializedState)
  } catch(e){
    
    return undefined
  }
}

export const persistedState= loadFromLocalStorage()

//const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const  store = createStore(inireducer, persistedState,composeEnhancers(applyMiddleware(thunk)));

store.subscribe(()=> saveToLocalStorage(store.getState()))


Router.onRouteChangeStart = () => {

  NProgress.start();
};

Router.onRouteChangeComplete = () => {
   
  NProgress.done();
};

Router.onRouteChangeError = () => {
 
  NProgress.done();
};

class MyApp extends App {
  state={
    actualizacion:{carrito:"",Estado:""}
  
  }
  componentDidMount () {
 /*   this.socket = io("https://iglass.herokuapp.com/",{ transports: ['websocket'] })
    console.log("conectando")
    console.log(this.socket.id)

    this. socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    this.socket.on('datosUser', datos=>{
      let estado = store.getState()
      console.log(datos)
      if(estado.userReducerEmarket === "" ){
         
      }else{
     
        if(estado.userReducerEmarket.update.usuario._id === datos.body.usuario._id ){
          let usuario = datos.body.usuario
       
          store.dispatch(updateUser({usuario}))
          if(datos.body.actualizacion.Estado === "Concluido"){
              this.setState({snackConcluido:true, snackEstado:"success", actualizacion:datos.body.actualizacion})
          }
           else if(datos.body.actualizacion.Estado === "Pagado"){
              this.setState({snackPagado:true, snackEstado:"success", actualizacion:datos.body.actualizacion})
          }
          else if(datos.body.actualizacion.Estado === "No-pagado"){
            this.setState({snackNoPagado:true, snackEstado:"error", actualizacion:datos.body.actualizacion})
        }
        else if(datos.body.actualizacion.Estado === "Revicion"){
          this.setState({snackRevicion:true, snackEstado:"info", actualizacion:datos.body.actualizacion})
      }
      else if(datos.body.actualizacion.Estado === "Disponible"){
        this.setState({snackDisponible:true, snackEstado:"success", actualizacion:datos.body.actualizacion})
    }
    else if(datos.body.actualizacion.Estado === "No-disponible"){
      this.setState({snacknoDisponible:true, snackEstado:"error", actualizacion:datos.body.actualizacion})
    }
    else if(datos.body.actualizacion.Estado === "Revicion-rep"){
      this.setState({snackRevicionRep:true, snackEstado:"info", actualizacion:datos.body.actualizacion})
    }    
        }
        
    
      }
    })


*/

    if (
      !("serviceWorker"in navigator)  || process.env.NODE_ENV !== "production" ) {
      console.warn("Progressive Web App support is disabled");
      return;
    }
const wb = new Workbox("sw.js", { scope: "/" });
    wb.register();
  
  
  
 
  
  }


  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    this.setState({snackRevicion:false,
      snackNoPagado:false,
      snackPagado:false,
      snackConcluido:false,
      snackDisponible:false,
      snacknoDisponible:false,
      snackRevicionRep:false,
      snackRevicionAdmin:false,
      snackConcluidoAdmin:false,
      snackQuejaAdmin:false,
    
    })
  
  }

  render(){
 
   

    const { Component, pageProps, router } = this.props

  return (

    <Provider store={store}>
      
      <FacebookPixel>
                  <Head>
        <title key="title">{DEFAULT_SEO.title}</title>
        <meta
                  key="description"
                  name="description"
                  content={DEFAULT_SEO.description}
                />
        <meta key="viewport" name="viewport" content="initial-scale=1.0, width=device-width" />
                  
                <meta
                  key="og:url"
                  property="og:url"
                  content={DEFAULT_SEO.openGraph.url}
                />
                <meta
                  key="og:type"
                  property="og:type"
                  content={DEFAULT_SEO.openGraph.type}
                />
                <meta
                  key="og:title"
                  property="og:title"
                  content={DEFAULT_SEO.openGraph.title}
                />
                <meta
                  key="og:description"
                  property="og:description"
                  content={DEFAULT_SEO.openGraph.description}
                />
                <meta
                  key="og:image"
                  property="og:image"
                  content={DEFAULT_SEO.openGraph.image}
                />
                <meta
                  key="og:image:width"
                  property="og:image:width"
                  content={DEFAULT_SEO.openGraph.imageWidth}
                />
                <meta
                  key="og:image:height"
                  property="og:image:height"
                  content={DEFAULT_SEO.openGraph.imageHeight}
                />
                <meta
                  key="og:locale"
                  property="og:locale"
                  content={DEFAULT_SEO.openGraph.locale}
                />
                   <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="192x192"  href="/favicons/android-chrome-192x192.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png"/>
<link rel="manifest" href="/manifest.json"/>
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
<meta name="msapplication-TileColor" content="#da532c" />
<meta name="msapplication-TileImage" content="/favicons/mstile-150x150.png"/>

            
        </Head>
    
           
            <PageTransition timeout={300} classNames="page-transition" >
            <Component {...pageProps} key={router.route} />
            </PageTransition>
            
            <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
          }
          .page-transition-enter-active {
            opacity: 1;
            transition: opacity 300ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity 300ms;
          }
        `}</style>
            

           

            </FacebookPixel>
            </Provider>
            
       
            )}
}

export default MyApp
