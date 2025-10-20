
import Image from 'next/image'
import React from 'react';

import { withRouter } from 'next/router';

import postal from 'postal';
import Botonerasocial from "../components/botonerasocial"
import Link from 'next/link';
import {connect} from 'react-redux';
import { Sling as Hamburger } from 'hamburger-react'


 class Navbar extends React.Component {
  

    state = {
      isOpen: false,
      isscroll: false,
      iconchange:false,
      alturabanner:false,
      scrollanimAltura:false,
      ondesktop: false,
      fondoalt:false,
      usuario:false,
      mounted:false,

    };
    channel1 = null;
    channel2 = null;
    channel3 = null;
  
 
  
 

  componentDidMount() {
    
    this.desktopverifi()

    
    this.channel1 = postal.channel();
    this.channel2 = postal.channel();
    this.channel3 = postal.channel();

    const {route} = this.props.router;
  
    
    
    if(route === "/"){
    
      this.setState({fondoalt:false})

    }
   else{
  
    this.setState({fondoalt:true})
   }
 
   
 
     this.channel2.subscribe('fondoalt', (data) => {
   
      this.setState({fondoalt:true})
       
     });

   


     window.addEventListener('resize',()=>{
      
    this.desktopverifi()
     })
  

    window.addEventListener('scroll', (event) => {
          const {route} = this.props.router;

        
          const alturawindow = window.document.documentElement.clientHeight
          
         if( route === "/" && window.scrollY >= alturawindow  ){
           
              this.setState({isscroll:true})
           
              this.channel1.publish('scrollon', {
                message: 'enviado desde reset'
             });
              
          } 
     
                   

  
 
  else if(route === "/" && window.scrollY <= 50){
    this.setState({isscroll:false})
   
  }else if( route === "/" && window.scrollY <= alturawindow ){
    this.channel1.publish('scrollof', {
      message: 'enviado desde reset'
   });
   this.setState({ iconchange:false})
  } 
 

  else if (route !== "/" && window.scrollY >= 10){
    this.setState({isscroll:true, iconchange:true})

  } else if (route !== "/"  && window.scrollY <= 5){
    this.setState({isscroll:false, iconchange:false})

  } 

 

      }// fin del evento 
      
    );

    this.setState({mounted:true})
  }
  desktopverifi(){
    if(window.document.body.clientWidth >= 800){
      this.setState({ondesktop:true})
     
    } else if(window.document.body.clientWidth < 800){
      this.setState({ondesktop:false})
    }
  }

  burgerclick = valor => {
   this.setState({
    isOpen: !this.state.isOpen
  });
}




botonera = (e) =>{
 
const ocultador = ()=>{
  if(!this.state.ondesktop){

    this.setState({
      isOpen: !this.state.isOpen
    });
  
    this.channel3.publish('botonera', {
      message: 'enviado desde botonera'
   });
  }

}

ocultador();
  
}

botonlogin=()=>{

  let estilosnav = this.state.isscroll?"botonClickactive":"botonClick";
  if(this.props.usuario !== "" ){
   

if(this.props.usuario.update.usuario.Tipo == "administrador"){

  return (<Link href="/usuarios/administrador" >
  <div id="perfiladmin"   className={estilosnav} onClick={this.botonera}>
    <div id="adminicon" className="iconic "   >
    <img src="/icons/account_box.svg" alt=""/>
    </div> 
    <div className="conttextbar" >
        <a className="enlacePrincipal">Admin</a>
        </div>
  </div>
  </Link>)
}
else if(this.props.usuario.update.usuario.Tipo == "cliente"){
  const ruta = `/usuarios/${this.props.usuario.update.usuario.Usuario}`
  return (<Link href="/usuarios/[perfil]" as={ruta}>
  <div id="perfil"   className={estilosnav} onClick={this.botonera}>
    <div id="clienticon"  className="iconic "   >
    <img src="/icons/account_box.svg" alt=""/>
    </div> 
    <div className="conttextbar " >
        <a className="enlacePrincipal">Perfil</a>
        </div>
  </div>
  </Link>)
}


  
  }
  
  
  else {
   
    return (<Link href="/ingreso">
  <div id="login123"   className={estilosnav} onClick={this.botonera}>
    
    <div id="sinusericon"  className="iconic "   >
    <img src="/icons/account_box.svg" alt=""/>
    </div> 
    <div className="conttextbar" >
     <a className="enlacePrincipal"> Ingresa</a>  
        </div>
  </div>
  </Link>
  )}
}
usercont=(e)=>{
  if(this.props.usuario !== "" && !this.state.ondesktop ){
    const ruta = `/usuarios/${this.props.usuario.update.usuario.Usuario}`
    return (<Link href="/usuarios/[perfil]" as={ruta}><a style={{textDecoration:"none"}} >
    <div className="userCont">
    <p>{this.props.usuario.update.usuario.Usuario.substring(0,1).toUpperCase()}</p>
  </div>
  </a></Link>)
  }else{return ("")}

}

  render() {
    

     let estilosnav = this.state.isscroll?"botonClickactive":"botonClick";
   

       
    

    let fondobarra = this.state.isscroll == true ? "fondoa": 
                     this.state.isscroll == false && !this.state.fondoalt? "fondod":
                     this.state.isscroll == false && this.state.fondoalt? "fondoalt":
                     'bocultar';

    let modificator;

    if(this.state.ondesktop){

      modificator = "navBDESKTOP"
    }

    else if(!this.state.ondesktop && this.state.isOpen){

      modificator = "navBA"
    }
    
    else if(!this.state.ondesktop && !this.state.isOpen){

      modificator = "navBD"
    }


    return (
    
      <div  className={fondobarra}>
     
   

      <div className="contlogo">
    <Image   width={75}
      height={55} className='logoimg'src="/logodtc.png" alt="logotipo empresa"/>
    </div>
     

      <div id='mainul'className={modificator}>
       
       <div className="botonera">
         <Link href="/">
                <div id="1erboton"  className={estilosnav} onClick={this.botonera} >
                    <div className="iconic "  >
                    <img src="/icons/home.svg" alt=""/>
                    </div> 
                    <div className="conttextbar" >
                        <a href="/"  className="enlacePrincipal">Home</a>
                        </div>
                  </div>
                  </Link>
                  
                  <Link href="/tienda">
                  <div id="tienda"   className={estilosnav} onClick={this.botonera}>
                    <div className="iconic hideOnLg"   >
                    <img src="/icons/store.svg" alt=""/>
                    </div> 
                    <div className="conttextbar" >
                        <a href="/tienda" className="enlacePrincipal">Tienda</a>
                        </div>
                  </div>
                  </Link>
               
               

                  <Link href="/blog">
                  <div id="6toboton"   className={estilosnav}onClick={this.botonera}>
                    <div className="iconic hideOnLg"  >
                    <img src="/icons/call.svg" alt=""/>
                    </div> 
                    <div className="conttextbar" >
                        <a className="enlacePrincipal">Blog</a>
                        </div>
                  </div>
                  </Link>
               
                  
        
                  
                  <Link href="/contactanos">
                  <div id="6toboton"   className={estilosnav}onClick={this.botonera}>
                    <div className="iconic hideOnLg"  >
                    <img src="/icons/call.svg" alt=""/>
                    </div> 
                    <div className="conttextbar" >
                        <a href="/contactanos"  className="enlacePrincipal">Contactanos</a>
                        </div>
                  </div>
                  </Link>
                  {this.state.mounted && this.botonlogin()}
                  </div>
           
    { this.state.isOpen && <Botonerasocial/>}

    </div>
 
    <div className="navXSderecha hideOnLg">


    {this.state.mounted && this.usercont()}

    <Hamburger onToggle={ (toggle)=>{  this.setState({isOpen: toggle });} } />
  
 </div>    
 
    
      </div>
    );
  }
}

const mapStateToProps = state => {
  const usuario = state.userReducerEmarket

  return {usuario}
};
export default connect(mapStateToProps)(withRouter(Navbar))

