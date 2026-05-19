import React, { Component } from 'react'
import { Animate } from "react-animate-mount";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Tarjetas from "./tarjetas"
import Soporte from "./soporte"
import {connect} from 'react-redux';
import Link from "next/link"
import FacebookLogin from 'react-facebook-login';
import TarjetaInput from"../components/tarjetagenerate"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {updateUser} from "../reduxstore/actions/myact"
import {resetCard} from "../reduxstore/actions/myact"
import Checkbox from '@mui/material/Checkbox';
import MailIcon from '@mui/icons-material/Mail';
import Head from "next/head"
import {addProductToCart, removeProductToCart} from "../reduxstore/actions/"
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { CircularProgress } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';
import { withRouter } from 'next/router';
import { config } from 'react-transition-group';

class Contacto extends Component {
  
            state={
              compraLoading:false,
              correoLogin:"",
              passLogin:"",
              consumidorFinal:false,
              bancoSelect:{},
              clienteID:this.statefun("_id"),
              clienteNombre:this.statefun("Usuario"),
              clienteTelefono:this.statefun("Telefono"),
              clienteDireccion:this.statefun("Direccion"),
              clienteCorreo:this.statefun("Email"),
              clienteCiudad:this.statefun("Ciudad"),
              clienteCedula:this.statefun("Cedula"),
              CarritoNumero:9999,
              cuentaBanco:0,
             /* expiry: this.statefunCard("TarjetaExpira"),
              cvc: this.statefunCard("TarjetaCVC"),
              name: this.statefunCard("TarjetaExpira"),
              number:this.statefunCard("TarjetaNumero"),*/

              formadepago:"default",
              banco:"default",
              entrega:"default",
              opcionCoin:false,
                opcion1:false,
                opcion2:false,
                pinicial:true,
                soporte:false,
                soporteBox:true,
                flecharetro:true,
                 tiendaForm:false,
                enviosForm:false,
                envio:false,
                  generador:false,
              valorenvio:this.enviofun(),
              registerCard:false,
              estadoPago:"default",
              Coins:0,
              ValorFinal:this.props.totalPrice,
              pagosDomicilio:false,
              snackerror1:false,
              snackerror2:false,
              snackerror3:false,
              plogin:true,
              pregister:false,
              pregisterButtons:true,
              pregisterForm:false,
             telefonoReg:""
    
        }
        
        statefun(e){
         
          if(this.props.usuario !==""){
           
            let ruta = "this.props.usuario.update.usuario." +e
            let rutaEval  =eval(ruta)
           
        
              return(rutaEval)
        
          
          }
          else{
            return("")
          }
        }
        
 /*       statefunCard(e){
        
          if(this.props.usuario !== ""){

            if(this.props.usuario.update.usuario.Tarjetas.length > 0)
            {

             console.log("se encontra tarjetas ")
            let ruta = "this.props.usuario.update.usuario.Tarjetas[0]." +e
            let rutaEval  =eval(ruta)
           
        
              return(rutaEval)
            } 

          
          }
          else{
        
            return("default")
          }
      
        }*/


        enviofun(){
         
          

          if(this.props.usuario !==""){
console.log("dentro envio user")
            let value = this.comprobarPrecioEnvio(this.props.usuario.update.usuario.Ciudad)
        
           return  value
                   
          
          }
          else{
            return(0)
          }
        }

    componentDidMount(){
console.log(this.state)
/*
      if(this.props.usuario){

      let datos = {Id: this.props.usuario.update.usuario._id}

      let lol = JSON.stringify(datos)
      
         fetch("https://iglass.herokuapp.com/users/getusercoins", {
          method: 'POST', // or 'PUT'
          body: lol, // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => {console.error('Error:', error);
        this.setState({Coins:0})
      
      })
        .then(response => {
         
         this.setState({Coins:response.Coins})
        });



      }

   
      var url = 'https://iglass.herokuapp.com/admin/rtyhgf456/getcounter';


fetch(url, {
  method: 'GET', // or 'PUT'
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => {
  
  
  console.log('Success:', response)
this.setState({CarritoNumero:response.user[0].Contador})

});
  */
      ValidatorForm.addValidationRule('requerido', (value) => {
        if (value === "" || value === undefined || value === null) {
            return false;
        }
        return true;
    });
    ValidatorForm.addValidationRule('soloNumeros', (value) => {
      if (isNaN(value)) {
          return false;
      }
      return true;
  });
  ValidatorForm.addValidationRule('minimo7', (value) => {
   let cadena = value.toString()
   console.log(cadena)
   console.log(cadena.length)
    if (cadena.length >= 7) {
        return true;
    }
    return false;
});

ValidatorForm.addValidationRule('minimo6', (value) => {
  let cadena = value.toString()
  console.log(cadena)
  console.log(cadena.length)
   if (cadena.length >= 6) {
       return true;
   }
   return false;
 });
        
 ValidatorForm.addValidationRule('correoval', (value) => {
   console.log(value)
 const regex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/
 var regex2 = /^([a-zA-Z0-9_\.\-])+\@([a-zA-Z\-]{3,8}\.)+[a-zA-Z]{2,4}$/;

   if (regex2.test(value)) {
       return true;
   }
   return false;
 }); 



}// componetDidMount

     
registroFuncion=(e)=>{
    
 
  var url = 'https://iglass.herokuapp.com/users/register';
  var urldeploy = `${process.env.URL_BACKEND_SERVER}/public/users/register`;
  var data = {Usuario:this.state.usuarioReg,
              TelefonoContacto:this.state.telefonoReg,
              Correo:this.state.emailReg.toLowerCase(),
              Contrasena:this.state.passReg.toLowerCase(),
              RegistradoPor:"usuario",
              Confirmacion:false,
              }

 var lol = JSON.stringify(data)

  fetch(urldeploy, {
    method: 'POST', // or 'PUT'
    body: lol, // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {console.log('Success:', response)

  if(response.status === "Ok"){
  const usuario = response.data.user
      
  this.props.dispatch(updateUser({usuario}))
       console.log(usuario) 


                this.setState({
                  clienteID: usuario._id,
                  clienteNombre:usuario.Usuario ,
                  clienteTelefono:usuario.Telefono  ,
                  clienteCorreo:usuario.Email,
                 pinicial:false,
                 envios:true           
              
              })



  
     
  }
  else if(response.status =="error"){
   console.log(response)
   if(response.message === "El correo ya esta registrado"){
      this.setState({snackerror1:true})
   }
}
 
});

 
}   

registerFacebook = (response) => {
  console.log(response)
 let passgenerator = response.id + "iglass289298asd"

this.setState({mailtoshow:response.email})

  var url = 'https://iglass.herokuapp.com/users/register';
  var datafb = {Usuario:response.name,
         
              Correo:response.email,
               
              Contrasena:passgenerator,
              Imagen:  response.picture.data.url,
              RegistradoPor:"facebook",
              Confirmacion:true
              }

 var lolfb = JSON.stringify(datafb)
 console.log(response)
  fetch(url, {
    method: 'POST', // or 'PUT'
    body: lolfb, // data can be `string` or {object}!
   headers:{
      'Content-Type': 'application/json'
   }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {console.log('Success:', response)
  if(response.status === "Ok"){
      const usuario = response.data.user
          
      this.props.dispatch(updateUser({usuario}))
            console.log(usuario)
      this.setState({pinicial:false,
      
        clienteID: usuario._id,
        clienteNombre:usuario.Usuario,
        clienteCorreo:usuario.Email,
        pinicial:false,
        envios:true     
       
       })

       
      }
      else if(response.status =="error"){
       console.log(response)
       if(response.message === "El correo ya esta registrado"){
          this.setState({snackerror1:true})
       }
       
   }
});
}


      componentWillUnmount() {
        // remove rule when it is not needed
        ValidatorForm.removeValidationRule('requerido');
        ValidatorForm.removeValidationRule('minimo7');
        ValidatorForm.removeValidationRule('soloNumeros');
    }
capturadorstate=(name, value)=>{
  this.setState({
    [name] : value
})
}
      handleLoginForm=(e)=>{
        this.setState({
          [e.target.name] : e.target.value
      })
      }   

       
        
         clickSoporte=()=>{
           this.setState({
             pagosDomicilio:false,
             pagosTienda:false,
            generador:false,
            opcion1:false,
            opcion2:false,
            pinicial:false,
            tiendaForm:false,
            enviosForm:false,
            flecharetro:false,
            soporte:true,
            soporteBox:false,
            envios:false,
            despedida:false
           })
         }   
        
         soporteFlechaFun=()=>{
          this.setState({
          
            pinicial:true,
            flecharetro:true,
            soporte:false,
            soporteBox:true,
        
          
           })

         }
         
       


         
compraFun=(e)=>{
console.log(this.state)
  if(this.state.compraLoading == false){
    this.setState({compraLoading:true})


  var url = 'http://localhost:3000/public/ordencompra';
  let urldeploy = `${process.env.URL_BACKEND_SERVER}/public/ordencompra`;

  var estadodepago = this.state.formadepago === "Tarjeta"?"Pagado":
                      this.state.formadepago === "Coins"?"Pagado": "default"

  
  var data = {
        
              Id:this.state.clienteID,
              Nombre:this.state.clienteNombre,
              Cedula:this.state.clienteCedula,
              Telefono:this.state.clienteTelefono,
              Direccion:this.state.clienteDireccion,
              Correo:this.state.clienteCorreo,
              Ciudad:this.state.clienteCiudad,
              Pago:this.state.formadepago,
              Banco:this.state.banco,
              TipoEnv:"por generar",
              Envio:this.state.envio,
              ValorEnv:this.state.valorenvio,
              Valorfinal:this.state.ValorFinal,
              EstadoPago:estadodepago ,
              carrito:this.props.carrito,
              Userdata:{DBname:this.props.tienda.dbName},
              tiempo: new Date().getTime()
              }
              if(this.state.formadepago === "Transferencia"){
       data.bancoElegido = {
  Banco: this.state.bancoSelect.nombre,
  NumeroCuenta: this.state.bancoSelect.cuenta,
  TipoCuenta: this.state.bancoSelect.tipo,
  NombreTitular: this.state.bancoSelect.titular
};
                   }
              console.log(data)
              if(this.state.formadepago === "Transferencia-Coins" || this.state.formadepago === "Efectivo-Coins"|| this.state.formadepago === "Coins"){
               
                var estadodepago = this.state.formadepago === "Tarjeta"?"Pagado":
                                   this.state.formadepago === "Coins"?"Pagado": "default"
                               
                let CoinsdespuesVal = this.state.Coins - this.state.ValorFinal
                let  CoinsDespues = CoinsdespuesVal > 0 ? CoinsdespuesVal:0
                let CoinsUsadas =  this.state.Coins - CoinsDespues
                data = {
                 
                  Id:this.state.clienteID,
                  Nombre:this.state.clienteNombre,
                  Cedula:this.state.clienteCedula,
                  Telefono:this.state.clienteTelefono,
                  Direccion:this.state.clienteDireccion,
                  Correo:this.state.clienteCorreo,
                  Pago:this.state.formadepago,
                  Banco:this.state.banco,
                  TipoEnv:"xG",
                  Envio:this.state.envio,
                  ValorEnv:this.state.valorenvio,
                  EstadoPago:estadodepago,
                  carrito:this.props.carrito,
                  Valorfinal:this.state.ValorFinal,
                 
                  }

                  


                }

 var lol = JSON.stringify(data)


  fetch(url, {
    method: 'POST', // or 'PUT'
    body: lol, // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
    console.log('Res OrdenCompra:', response)
  if(response.status == "Error"){
alert("error en el la solicitud")
this.setState({compraLoading:false})
  }else {
    this.setState({compraLoading:false,despedida:true, generador:false,CarritoNumero:response.carrito})
  }
    
  });


  
}

}//fin compraFun

      
loginFuncion=(e)=>{


 
  var urldeploy = `${process.env.URL_BACKEND_SERVER}/users/authenticateclient `
  var data = {User:{DBname:process.env.EMARKET_DATA_BASE},
  Correo:this.state.correoLogin.toLowerCase(),
  Contrasena:this.state.passLogin.toLowerCase(),
}

console.log(data)
 var lol = JSON.stringify(data)

  fetch(urldeploy, {
    method: 'POST', // or 'PUT'
    body: lol, // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
   console.log(response)
   if(response){
      if(response.status ==="Ok"){
        const usuario = response.data.user
        this.props.dispatch(updateUser({usuario}))
      
                this.setState({
                  clienteID:usuario._id,
                  clienteNombre: usuario.Usuario,
                clienteDireccion: usuario.Direccion,
                clienteTelefono: usuario.Telefono,
                clienteCiudad: usuario.Ciudad,
                clienteCorreo: usuario.Email,
                clienteCedula: usuario.Cedula,
                 pinicial:false,
                 envios:true           
              
              })


             
            }else if(response.status ==="error"){
              console.log(response)
              if(response.message === "no existe el correo"){
                 this.setState({snackerror2:true})
              }
             else if(response.message === "Invalid password!!"){
                  this.setState({snackerror3:true})
               }
            }}

  }
  );
}

loginFacebook =(response)=>{
  this.setState({mailtoshow:response.email})
  let passgenerator = response.id + "iglass289298asd"
  var url = 'https://iglass.herokuapp.com/users/authenticate';
  var data = {Correo:response.email,
              Contrasena:passgenerator,
                            }

 var lol = JSON.stringify(data)

  fetch(url, {
    method: 'POST', // or 'PUT'
    body: lol, // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
   
    if(response.status ==="Ok"){
      let usuario = response.data.user
      this.props.dispatch(updateUser({usuario}))
      if(usuario.Tarjetas.length > 0){
        this.setState({
          name:usuario.Tarjetas[0].TarjetaNombre,
          number:usuario.Tarjetas[0].TarjetaNumero,
          expiry:usuario.Tarjetas[0].TarjetaExpira,
          cvc:usuario.Tarjetas[0].TarjetaCVC,
        })
      }
      
              this.setState({
                clienteID:usuario._id,
                clienteNombre: usuario.Usuario,
              clienteDireccion: usuario.Direccion,
              clienteTelefono: usuario.Telefono,
              clienteCiudad: usuario.Ciudad,
              clienteCorreo: usuario.Email,
               pinicial:false,
               envios:true           
            
            })


           
    }  else if(response.status ==="error"){
      console.log("detectando")

      
              if(response.message === "no existe el correo"){
                console.log("es")
              this.setState({snackerror2:true})
              }
          else if(response.message === "Invalid password!!"){
                  this.setState({snackerror3:true})
              }
  
  
  }
  }
  );



}
  





        onFlechaRetro=()=>{
         
          if(this.state.opcion1){
            this.setState({opcion1:false, pinicial:true})
          }
          else if(this.state.opcion2){
            this.setState({opcion2:false, pinicial:true})
            this.props.dispatch(removeProductToCart("fakemongoid1291"));
          }
          else if(this.state.pagosDomicilio){
            this.setState({pagosDomicilio:false, enviosForm:true})
            this.props.dispatch(removeProductToCart("fakemongoid1291"));
          }
          else if(this.state.pagosTienda){
            this.setState({pagosTienda:false, pinicial:true})
          }
          else if(this.state.enviosForm){
            this.setState({enviosForm:false, pinicial:true})
          }
          else if(this.state.tiendaForm){
            this.setState({tiendaForm:false, pinicial:true})
          }
          else if(this.state.envios){
            this.setState({envios:false, pinicial:true})
          }
          else{
            this.props.dispatch(removeProductToCart("fakemongoid1291"));
            this.props.flechafun()
         
          }
        }

        comprobarPrecioEnvio(e){
          console.log(e)
          if(e){
          if(e.toUpperCase().trim() === "AMBATO"  ){
            return(3)
          }
        
          else if(e.toUpperCase().trim() === "SUCUA" ){
             return(6.35)
          }
          else if(e.toUpperCase().trim() === "RIOBAMBA"  ||e.toUpperCase().trim() === "LATACUNGA" ){
             return(4.75)
          }
      
          else{
         
             return(5.35)
          }}
        }

        handleChangeform=(e)=>{
         
            if(e.target.name === "ciudad"){
              console.log("dentro de ciudad")
              
          let vEnvio = this.comprobarPrecioEnvio(e.target.value)
          this.setState({clienteCiudad:e.target.value, 
            ValorFinal:this.props.totalPrice + vEnvio,    
            valorenvio:vEnvio })
            }else{
            this.setState({
              [e.target.name] : e.target.value
          })}
        
        
          }



          handleCheckForm=()=>{
            this.setState({consumidorFinal:!this.state.consumidorFinal, clienteCedula:"9999999999"})
          }
          compraConTarjeta=()=>{
            if(this.state.number && this.state.number != "" && this.state.number != undefined ){
              if(this.state.number.length == 16){


                    if(this.state.cvc && this.state.cvc != "" && this.state.cvc != undefined ){
                        if(this.state.cvc.length >= 3){

                          if(this.state.expiry && this.state.expiry != "" && this.state.expiry != undefined ){
                            if(this.state.expiry.length == 4){
    
    
                              if(this.state.name && this.state.name != "" && this.state.name != undefined ){
                                if(this.state.name.length >= 4){
                                    console.log("dentro")
                                  this.setState({opcion1:false,generador:true, formadepago:"Tarjeta", })
        
                                  
                                }else{
                                  alert("Introduzca un nombre valido")
                                }
        
        
                              
                            }else{
                              alert("Introduzca un nombre de titular")
                            }
    
                              
                            }else{
                              alert("La fecha de expiracion debe contener 4 digitos")
                            }
    
    
                          
                        }else{
                          alert("Ingrese una fecha de experiracion valido")
                        }

                          
                        }else{
                          alert("El CVC debe contener minimo 3 digitos")
                        }


                      
                    }else{
                      alert("Ingrese un CVC valido")
                    }

              }else{
              alert("El numero de tarjeta contener 16 digitos")
            }

            }else{
              alert("Ingrese un numero de tarjeta valido")
            }
          }
    render () {
     
console.log(this.props)
console.log(this.state)

let nombreTienda = this.props.tienda.nombreTienda ? this.props.tienda.nombreTienda : "Aquí" 

/*let databank =[
 {NombreBanco:"Pichincha", Imagen:"/static/imgpagos/banco1.jpg",numeroCuenta:5166278600 },
 {NombreBanco:"Produbanco", Imagen:"/static/imgpagos/banco2.jpg",numeroCuenta:20059241691},
 {NombreBanco:"Guayaquil", Imagen:"/static/imgpagos/banco-guayaquil2.jpg",numeroCuenta:13836251},
 {NombreBanco:"Loja", Imagen:"/static/imgpagos/banco-loja.jpg",numeroCuenta:2902986209},
]*/

let databank = this.props.tienda.bancos ? this.props.tienda.bancos : []

let bankRender = databank.map((bank,i)=>
<div className="optionBank imgEnf" onClick={()=> this.setState({opcion2:false,generador:true, formadepago:"Transferencia", banco:bank.nombre,bancoSelect:bank})} key={i} >
      <p className="titulocontactd">{bank.nombre}</p>
       <img src={bank.logo} alt=""/>
      </div>)




const comprobadorCoins=()=>{

 
  console.log(this.state.Coins > this.state.ValorFinal)
  if(this.props.usuario){

 
  if(this.state.Coins > this.state.ValorFinal){

    return( 

      <div style={{marginBottom:"100px"}} className="PFCbuttons">
                

      <button className="botonventa" onClick={()=>{this.setState({opcionCoin:false, generador:true, formadepago:"Coins"})}}  > Continuar  </button>
      </div>

    )
  }else{
    return(
      <div >
          <p className="saldo"> Queda un saldo de: <span style={{fontWeight:"bolder"}}>${(parseInt(this.props.totalPrice) )-this.state.Coins}</span></p>
          <p className="subtituloArt">Elije un metodo de pago</p> 
          <div className="contsolicitador">
          <Animate  show={this.state.entrega === "Tienda"} >
          <div className="option3 " onClick={()=>{this.setState({generador:true, opcionCoin:false, formadepago:"Efectivo-Coins"})}}>
          <p className="titulocontactd">Efectivo</p>
           <img src="/static/imgpagos/efectivo.jpg" alt="Efectivo"/>
          </div>
          </Animate>
          <div className="option3 "onClick={()=>{this.setState({opcion3:true,opcionCoin:false, formadepago:"Transferencia-Coins"})}}>
          <p className="titulocontactd">Transferencia Bancaria</p>
          <img src="/static/imgpagos/banco.jpg" alt="Banco"/>
          </div>
          </div>
          </div>
    )

  }
}else if(this.props.usuario === ""){
  return(
  <div>
  <div className="tituloArt"> Por favor inicie seción
   para pagar con iGlass Coins </div>
   <div className="contbotonventa">
   <button className="botonventaalt" onClick={()=>{this.setState({opcionCoin:false, pinicial:true })}}  > Continuar </button>
   </div>
   </div>
   )
}
} //fin comprobador Coins

const comprobarLogin =()=>{
  if(this.props.usuario === ""){
    
    return(<div>
      <Animate show={this.state.plogin}> 
      <div className="contLogin"> 
    <p>Mejora tu experiencia ingresando al sistema</p>
    <div className="jwseccionCard sinmargen">
      <ValidatorForm

onSubmit={this.loginFuncion}
onError={errors => console.log(errors)}
>
<div className="contenidoForm sinmargen">
<div className="customInput">
  <div className="jwminilogo">
  <img  src="/icons/account.svg" />
</div>
<TextValidator
label="Correo"
 onChange={this.handleLoginForm}
 name="correoLogin"
 type="email"
 validators={['requerido']}
 errorMessages={['Escribe tu correo de acceso'] }
 value={this.state.correoLogin}
/>
</div>
<div className="customInput">
<div className="jwminilogo">
<img  src="/icons/key.svg" />
</div>
<TextValidator
 label="Contraseña"
 onChange={this.handleLoginForm}
 name="passLogin"
 type="password"
 validators={['requerido']}
 errorMessages={['Escribe una contraseña valida']}
 value={this.state.passLogin} 
/>
</div>
</div>
<div className="jwseccionCard doblebuttonCont">



<button type="submit" className="botonGeneral">Ingresar</button>
</div>

</ValidatorForm>

<div style={{display:"none"}} className="customfb">
<FacebookLogin
autoLoad={false}
size="medium"
disableMobileRedirect={true}
appId="305382950448795"
onFailure={console.log("fallo facebook")}
fields="name,email,picture"
onClick={this.componentClicked}
callback={this.loginFacebook}
render={renderProps => (
  <button className="logFacebook fbcustom" onClick={renderProps.onClick}  >
  <img src="/static/social/logofb.png" alt="facebook" className="imagenboton"/>
  <p>Ingresa con Facebook</p>
  </button > 
)}

/>
</div>
      </div>
      <span className="registerbutton" onClick={()=>{this.setState({plogin:false,pregister:true})}} >Registrate</span>
    </div>
    <div className="jwseccionCard jwW100percent">
<div className="jwminiCard-v2" onClick={()=>{this.setState({pinicial:false,envios:true})}}>
<p> Continua sin registrarte</p>
<img  src="/icons/arrow_right.svg" />


</div>
</div></Animate>
<Animate show={this.state.pregister}> 



<div className="contLogin"> 
<Animate show={this.state.pregisterButtons}> 
<div className="ContRetro">
<img src="/static/flecharetro.png" className="flecharetro" onClick={()=>{this.setState({plogin:true, pregister:false})}} />  
</div>
<div style={{display:"none"}}  className="jwseccionCard sinmargen">
    <FacebookLogin
    size="metro"
appId="305382950448795"
disableMobileRedirect={true}
fields="name,email,picture"
onClick={this.componentClicked}
callback={this.registerFacebook}
render={renderProps => (
  <button className="logFacebook" onClick={renderProps.onClick}  >
 <FacebookIcon className="customicon"/>
  <p>Registrate con Facebook</p>
  </button > 
)}

/>

    </div>
    <div className="jwseccionCard sinmargen">
<button className="logFacebook custombackground" onClick={()=>{this.setState({pregisterButtons:false,pregisterForm:true})}} >
<MailIcon className="customicon"/>
  <p>Registrate con Correo</p></button>

</div>

</Animate>
<Animate show={this.state.pregisterForm}> 
<ValidatorForm

onSubmit={this.registroFuncion}
onError={errors => console.log(errors)}
>
<div className="contenidoForm">
<div className="customInput">
<div className="jwminilogo">
<img  src="/icons/account.svg" />
</div>
<TextValidator
label="Usuario*"
onChange={this.handleChangeform}
name="usuarioReg"
type="text"
validators={['requerido']}
errorMessages={['Escribe tu usuario'] }
value={this.state.usuarioReg}
/>
</div>
<div className="customInput">
<div className="jwminilogo">
<MailIcon />
</div>
<TextValidator
label="Correo Electrónico*"
onChange={this.handleChangeform}
name="emailReg"
type="email"
validators={['requerido',"correoval"]}
errorMessages={['Escribe tu correo Electronico',"Escribe un correo válido"]}
value={this.state.emailReg} 
/>
</div>
<div className="customInput">
<div className="jwminilogo">
<ContactPhoneIcon />
</div>
<TextValidator
 label="Telefono*"
 onChange={this.handleChangeform}
 name="telefonoReg"
 type="tel"
 validators={['requerido soloNumeros']}
 errorMessages={['Escribe tu Teléfono']}
 value={this.state.telefonoReg} 
/>
</div>

<div className="customInput">
<div className="jwminilogo">
<img  src="/icons/key.svg" />
</div>
<TextValidator
label="Contraseña*"
onChange={this.handleChangeform}
name="passReg"
type="password"
validators={["requerido", "minimo6"]}
errorMessages={['Escribe una contraseña válida', "Mínimo 6 dígitos"]}
value={this.state.passReg} 
/>
</div>
<div className="jwseccionCard buttoncont">

<button type="submit" className="botonGeneral loginbutton sinancho">Registrarse</button>


</div>
</div>
</ValidatorForm>

</Animate>
</div>


</Animate>
    </div>)
  }
  else{
  return(<div className="jwseccionCard">
    <p>Te encuentras identificado como :</p>
  <p className="subtituloArt">{this.props.usuario.update.usuario.Usuario}</p>
    <p>Usaremos tus datos registrados para autocompletar los campos</p>
    <button type="submit" className="btn btn-success" onClick={()=>{this.setState({envios:true, pinicial:false})}}>Continuar</button>
    
    </div>)
  }
}// fin comprabar login

 const despedidaCont=()=>{
  if(this.state.formadepago === "Transferencia"|| this.state.formadepago === "Transferencia-Coins"){
    
  


return(
  <div>
      
     
  <div className="contDatosBanco">

<p style={{textAlign:"center"}}>Realize el pago con los siguientes datos:</p>

             
<p>Banco: <span style={{fontWeight:"bolder"}}>{this.state.bancoSelect.nombre}</span></p>
<p>Numero Cuenta : <span style={{fontWeight:"bolder"}}>{this.state.bancoSelect.cuenta}</span></p>
<p>Tipo de Cuenta: <span style={{fontWeight:"bolder"}}>{this.state.bancoSelect.tipo}</span></p>
<p>Nombre Titular: <span style={{fontWeight:"bolder"}}>{this.state.bancoSelect.titular}</span></p>
<p>Un valor de total de : <span style={{fontWeight:"bolder"}}>${this.state.ValorFinal}</span></p>
<p>En el detalle, escriba el número de carrito y su usuario </p>            
<div className="jwseccionCard jwPaper ">
   <p style={{textAlign:"center",marginTop:"10px"}}>Envielo via WhatsApp al {this.props.tienda.WaNumber}  </p>
</div>
{this.state.envio && <div> <p>Al recibir la confirmación de la transferencia realizaremos el envío</p></div>}
{this.state.envio === false && <div>
  <div className="contenedorab">
            <div className="gradient-border" id="box">
              <div className="boxinside">
              <div className="contenedorcontaco">
                                      <div className="contactcont " >
                                        
                                         <div className=" subContactCont " >
                                         <HomeIcon/>
                                                      <p className="jwBolder">{this.props.tienda.direccion}</p>
                                                      </div>      

                                                      <div className=" subContactCont " > 

                                                    <Link href={this.props.tienda.ubicacionMaps}><a target="_blank" >
                                                       <div>
                                                    <div className="icentrado">
                                       <GpsFixedIcon/>
                                         </div>
                                                    
                                                      </div></a></Link> 
                                                      <p className="jwBolder"> Ubicación exacta</p>
                                                      </div>
                                            <div >
                                                
                                        
                                                  
                                            </div>
                                            </div>
                                            <div className="contactcont "  >
                                          <AccessTimeIcon/>
                                          
                                      <div>
                                  {this.props.tienda.horariosAtencion ? this.props.tienda.horariosAtencion :""}
                                    
                                      </div>
                                
                                      </div>
                                      </div>
   
              </div>

            </div>
            </div>                                
                                                          
   <p style={{textAlign:"center",marginTop:"10px"}}>Al recibir la confirmación de la transferencia reservaremos su carrito hasta que usted lo retire</p></div>}

  </div>   
  <style>
    {`.contDatosBanco{
      padding: 20px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(15,23,42,0.10);
      color: #334155;
      font-family: Inter, system-ui, sans-serif;
    }
   .bold{
     font-weight: 700;
     color: #1d4ed8;
   }
    `}
  </style>
  </div>
)
  }
  else if(this.state.formadepago === "Efectivo"|| this.state.formadepago === "Efectivo-Coins"){
   
    return(
      <div>
           
          <p>Puede retirarlo a nombre de: <span style={{fontWeight:"bolder"}}>{this.state.clienteNombre}</span> </p>
          <p>Un valor de total de :<span style={{fontWeight:"bolder"}}>${this.state.ValorFinal}</span></p>

<p>Acercate con tu nombre y número de carrito</p>
                   
                                      <div className="contenedorab">
            <div className="gradient-border" id="box">
              <div className="boxinside">
              <div className="contenedorcontaco">
                                      <div className="contactcont " >
                                         
                                        
                                         <HomeIcon/>
                                                         <p className="jwBolder">{this.props.tienda.direccion}</p>   
                                                            <Link href={this.props.tienda.ubicacionMaps}>
                                                    <a target="_blank" > <div>
                                                    <div className="icentrado">
                                         <GpsFixedIcon/>
                                         </div>
                                                      <p className="jwBolder"> Ubicación exacta</p>
                                                      </div></a></Link> 
                                            <div >
                                                
                                        
                                                  
                                            </div>
                                            </div>
                                            <div className="contactcont "  >
                                          <AccessTimeIcon/>
                                            <div>
                                  {this.props.tienda.horariosAtencion ? this.props.tienda.horariosAtencion :""}                                                                   
                                    
                                      </div>
                                      <div>
                                   
                                    
                                      </div>

                                      </div>
                                      </div>
   
              </div>

            </div>
            </div>                                
                                 
       <p  style={{textAlign:"center",marginTop:"10px"}}>Separaremos los productos durante 24 horas</p>                               
      </div>
    )
  }
  else if(this.state.formadepago === "Tarjeta" || this.state.formadepago === "Coins" ){

    return(
      <div>

         <p>Reservado a nombre de: <span style={{fontWeight:"bolder"}}>{this.state.clienteNombre}</span></p>

         <div className="contenedorab">
            <div className="gradient-border" id="box">
              <div className="boxinside">
         {this.state.envio && <div> <p>Realizaremos en envío de inmediato, nos comunicaremos proximamente</p></div>}
{this.state.envio === false && <div>
  
 
  
   <p>Puede acercarse a retirar con tu nombre y número de carrito, sus productos se encuentran separados</p>
   
   <div className="contenedorab">
            <div className="gradient-border" id="box">
              <div className="boxinside">
              <div className="contenedorcontaco">
                                      <div className="contactcont " >
                                         
                                        
                                         <HomeIcon/>
                                                         <p className="jwBolder">{this.props.tienda.direccion}</p>
                                                    <Link href={this.props.tienda.ubicacionMaps}><a target="_blank" > <div>
                                                    <div className="icentrado">
                                         <GpsFixedIcon/>
                                         </div>
                                                      <p className="jwBolder"> Ubicación exacta</p>
                                                      </div></a></Link> 
                                            <div >
                                                
                                        
                                                  
                                            </div>
                                            </div>
                                            <div className="contactcont "  >
                                          <AccessTimeIcon/>
                                            <div>
                                  {this.props.tienda.horariosAtencion ? this.props.tienda.horariosAtencion :""}                                                                   
                                    
                                      </div>
                                      <div>
                                   
                                    
                                      </div>
                                
                                      </div>
                                      </div>
   
              </div>

            </div>
            </div>  
   
   
   </div>
  

  
   }
</div></div></div>
      </div>
    )
  }
  
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const handleClose = (event, reason) => {

  if (reason === 'clickaway') {
    return;
  }

   this.setState({snackerror1:false,snackerror2:false,snackerror3:false})
  
}
             return ( 
            <div >
         <div >

            <div className="maincontacto" >
            <div className="contcontacto"  >
              <Animate show={this.state.flecharetro}>
            <img src="/static/flecharetro.png" alt="" className="flecharetro" onClick={this.onFlechaRetro}/>
            </Animate>
            <div className="marginador">
            <Animate show={this.state.datosUsuario}>
<div className="headercontact">
             
             
   
             </div>
          <p className="asesoriaT">Rellena los siguientes campos</p>
          <ValidatorForm
   
   onSubmit={()=>{this.setState({envios:true, datosUsuario:false})}}
   onError={errors => console.log(errors)}
>
<div className="contenidoForm">
      <TextValidator
      label="Nombre / Usuario"
       onChange={this.handleChangeform}
       name="clienteNombre"
       type="text"
       validators={['requerido']}
       errorMessages={['Escribe tu nombre'] }
       value={this.state.clienteNombre}
   />
   <br/>
   <TextValidator
       label="Teléfono"
       onChange={this.handleChangeform}
       name="clienteTelefono"
       type="tel"
       validators={['requerido', 'soloNumeros', "minimo7"]}
       errorMessages={['Escribe un número de contacto', 'Ingresa solo números',"Mínimo 7 números"]}
       value={this.state.clienteTelefono} 
   
   />
   <br/>

   <TextValidator
       label="Correo Electrónico"
       onChange={this.handleChangeform}
       name="clienteCorreo"
       type="email"
       validators={['requerido']}
       errorMessages={['Escribe un número de contacto']}
       value={this.state.clienteCorreo} 
   />

   <div className="contbotonventa">
   <button type="submit" className="botonventa w60percent" >  Continuar</button>
   </div>
   </div>
</ValidatorForm>

</Animate>
        
            <Animate show={this.state.pinicial}>


          <div className="headercontact">
             
             <div className="tituloventa">
           <p> Gracias por comprar en {nombreTienda} </p>
        
       </div>
          </div>
          
   {/*comprobarLogin()*/}

       <div className="jwseccionCard jwW100percent">
<div className="jwminiCard-v2" onClick={()=>{this.setState({pinicial:false,envios:true})}}>
<p> Continuar</p>
<img  src="/icons/arrow_right.svg" />


</div>
</div>
   
        </Animate>



<Animate show ={this.state.envios}>
<div className="headercontact">
             
             <div className="tituloventa">
           <p> Forma de Entrega  </p>
        
       </div>
          </div>
<div className="contsolicitador">
  <div className="w100percent">
            <p className="asesoriaT">Selecciona como desea obtener su producto</p>
            </div>
          <div className="option " onClick={()=>{this.setState({entrega: "Domicilio",enviosForm:true, envios:false, envio:true, })}}>
          <p className="titulocontactd">Envío a domicilio (24 horas)</p>
           <img src="/static/imgpagos/domicilio.jpg" alt=""/>
          </div>
          <div className="option "onClick={()=>{this.setState({entrega: "Tienda",tiendaForm:true,envios:false, envio:false, valorenvio:0})}}>
          <p className="titulocontactd">Retirar en tienda</p>
          <img src="/static/imgpagos/tienda.jpg" alt=""/>
          </div>

        </div>
</Animate>

        <Animate show={this.state.domioptions}>
          <div className="headercontact">
             
             <div className="tituloventa">
           <p> Gracias por comprar  </p>
             
       </div>
       
             </div>
          <p className="asesoriaT">Selecciona la entrega</p>
        <div className="contsolicitador">
          <div className="option " onClick={()=>{this.setState({inmeform:true, domioptions:false, entrega:"inmediata"})}}>
          <p className="titulocontactd">Entrega inmediata $5    <span>(consultar covertura)</span> </p>
       
           <img src="/static/imgpagos/einmediata.jpg" alt=""/>
          </div>
          <div className="option "onClick={()=>{this.setState({pagosDomicilio:true,domioptions:false,  entrega:"normal"})}}>
          <p className="titulocontactd">Entrega normal $2</p>
          <img src="/static/imgpagos/enormal.jpg" alt=""/>
          </div>

        </div>
        </Animate>
          <Animate show={this.state.pagosDomicilio}>
          <div className="headercontact">
            
             <div className="tituloventa">
           <p> Forma de pago Domicilio</p>
                   
       </div>
       
             </div>
          <p className="asesoriaT">Selecciona un Método de pago</p>
        <div className="contsolicitador">
        
       {this.props.tienda.transferencias &&   <div className="option "onClick={()=>{this.setState({formadepago: "Transferencia",opcion2:true,pagosDomicilio:false})}}>
          <p className="titulocontactd">Transferencia Bancaria</p>
          <img src="/static/imgpagos/banco.jpg" alt=""/>
          </div>}

      {false &&    <div className="option "onClick={()=>{this.setState({formadepago: "Tarjeta",opcion1:true,pagosDomicilio:false})}}>
          <p className="titulocontactd">Tarjeta</p>
          <img src="/static/imgpagos/tarjetasegura.jpg" alt=""/>
          </div>}

          <div style={{display:"none"}} className="option "onClick={()=>{this.setState({pagosDomicilio:false, formadepago:"Coins", opcionCoin:true})}}>
          <p className="titulocontactd">iGlass Coins</p>
          <img src="/user/iglassCoin.png" alt="iGlassCoins"/>
          </div>

        </div>
        </Animate>
        <Animate show={this.state.pagosTienda}>
          <div className="headercontact">
             
             <div className="tituloventa">
           <p> Paga en nuestra tienda</p>
                   
       </div>
       
             </div>
          <p className="asesoriaT">Selecciona un Metodo de pago</p>
        <div className="contsolicitador">
          <div className="option3" onClick={()=>{this.setState({generador:true, pagosTienda:false, formadepago:"Efectivo"})}}>
          <p className="titulocontactd">Efectivo</p>
           <img src="/static/imgpagos/efectivo.jpg" alt="Efectivo"/>
          </div>
       {this.props.tienda.transferencias &&   <div className="option3"onClick={()=>{this.setState({opcion2:true,pagosTienda:false, formadepago:"Transbancaria"})}}>
          <p className="titulocontactd">Transferencia Bancaria</p>
          <img src="/static/imgpagos/banco.jpg" alt="Banco"/>
          </div>}
    {  false &&    <div className="option3"onClick={()=>{this.setState({formadepago: "Tarjeta",opcion1:true,pagosDomicilio:false,pagosTienda:false})}}>
          <p className="titulocontactd">Tarjeta</p>
          <img src="/static/imgpagos/tarjetasegura.jpg" alt=""/>
          </div>}
          <div style={{display:"none"}}  className="option3"onClick={()=>{this.setState({opcionCoin:true,pagosTienda:false, formadepago:"Coins"})}}>
          <p className="titulocontactd">iGlass Coins</p>
          <img src="/user/iglassCoin.png" alt="iGlassCoins"/>
          </div>
         

        </div>
        </Animate>
    <Animate show={this.state.enviosForm}>
<div className="headercontact">
             
             <div className="tituloventa">
           <p> Envío a domicilio </p>
                   
       </div>
       <div className ="minimensaje"> </div>
             </div>
          <p className="asesoriaT">Rellena los siguientes campos</p>
          <ValidatorForm
   
   onSubmit={()=>{
    let newServ ={
      Eqid: "1291",
      _id:"fakemongoid1291",
      Titulo: "Envio a Domicilio",
      Tipo: "Servicio",
      Medida: "Unidades",
      Iva: true,
      CantidadCompra: 1,
      Existencia: 0,
      Precio_Venta: this.state.valorenvio,
      Precio_Alt: 5,
      Grupo: "default",
      Departamento: "default",
      Categoria: {
          tipocat: "Articulo",
          subCategoria: [],
          nombreCat: "General",
          imagen: [],
          urlIcono: "/iconscuentas/comida2.png",
          idCat: 133,
          sistemCat: false,
      },
      SubCategoria: "",
      Marca: "default",
      Calidad: "default",
      Color: "default",
      Descripcion: "default",
      Garantia: "default",
      MiniDescrip: "Aqui una pequeña descripción",
      Imagen: ["https://img.freepik.com/vector-premium/servicio-compras-online-envio-domicilio_40876-2336.jpg?w=1380"],
      TiempoReq: {
          Formato: "Horas",
          tiempo: 1
      },
      Proveedor: "default",
      Precio_Compra: 0,
      Bodega_Inv: 9999998,
      Valor_Total: 0,
      PrecioVendido:this.state.valorenvio,
      PrecioCompraTotal: this.state.valorenvio,
  }



    this.setState({pagosDomicilio:true, enviosForm:false})
console.log(this.state)

this.setTimeout(() => {
    this.props.dispatch(addProductToCart(newServ))
}, 1000);

  
  
  }}
   onError={errors => console.log(errors)}
>
<div className="contenidoForm">
      <TextValidator
      label="Nombre / Usuario"
       onChange={this.handleChangeform}
       name="clienteNombre"
       type="text"
       validators={['requerido']}
       errorMessages={['Escribe tu nombre'] }
       value={this.state.clienteNombre}
   />
    <br/>
   
   <TextValidator
       label="Teléfono"
       onChange={this.handleChangeform}
       name="clienteTelefono"
       type="tel"
       validators={['requerido', 'soloNumeros', "minimo7"]}
       errorMessages={['Escribe un número de contacto', 'Ingresa solo números',"Mínimo 7 números"]}
       value={this.state.clienteTelefono} 
     
   />
   <br/>
   <TextValidator
       label="Ciudad"
       onChange={this.handleChangeform}
       name="ciudad"
       type="text"
       validators={['requerido']}
       errorMessages={['Escribe una ciudad del Ecuador']}
       value={this.state.clienteCiudad} 
   />
   
   
             <div style={{textAlign:"left", width:"67%", fontSize:"12px"}}>Valor envio ${this.state.valorenvio}</div>
             <br/>
   <TextValidator
       label="Dirección"
       onChange={this.handleChangeform}
       name="clienteDireccion"
       type="text"
       validators={['requerido']}
       errorMessages={['Escribe un número de contacto']}
       value={this.state.clienteDireccion} 
   />
     <br/>
   <TextValidator
       label="Correo Electrónico"
       onChange={this.handleChangeform}
       name="clienteCorreo"
       type="email"
       validators={['requerido']}
       errorMessages={['Escribe un correo valido']}
       value={this.state.clienteCorreo} 
   />
    <br/>
    <div className="consumidor">
      <p>¿Consumidor Final?</p>
      <Checkbox
        checked={this.state.consumidorFinal}
        onChange={this.handleCheckForm}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </div>
<Animate show={!this.state.consumidorFinal}>
<TextValidator
       label="Cédula"
       onChange={this.handleChangeform}
       name="clienteCedula"
       type="number"
       validators={['requerido', 'soloNumeros']}
       errorMessages={['Ingresa un número de cédula', 'Ingresa solo números']}
       value={this.state.clienteCedula} 
   />
</Animate>
     
   <br/>

   <div className="contbotonventa">
   <button type="submit" className="botonventa w60percent" >  Continuar</button>
   </div>
   </div>
</ValidatorForm>

</Animate>
<Animate show={this.state.tiendaForm}>
<div className="headercontact">
             
             <div className="tituloventa">
           <p> Retira en nuestra tienda</p>
                   
       </div>
   
             </div>
          <p className="asesoriaT">Rellena los siguientes campos</p>
          <ValidatorForm
   
   onSubmit={()=>{this.setState({pagosTienda:true, tiendaForm:false})}}
   onError={errors => console.log(errors)}
>
<div className="contenidoForm">
      <TextValidator
      label="Nombre / Usuario"
       onChange={this.handleChangeform}
       name="clienteNombre"
       type="text"
       validators={['requerido']}
       errorMessages={['Escribe tu nombre'] }
       value={this.state.clienteNombre}
   />
   <br/>
   <TextValidator
       label="Teléfono"
       onChange={this.handleChangeform}
       name="clienteTelefono"
       type="tel"
       validators={['requerido', 'soloNumeros', "minimo7"]}
       errorMessages={['Escribe un número de contacto', 'Ingresa solo números',"Mínimo 7 números"]}
       value={this.state.clienteTelefono} 
   
   />
   <br/>

   <TextValidator
       label="Correo Electrónico"
       onChange={this.handleChangeform}
       name="clienteCorreo"
       type="email"
       validators={['requerido']}
       errorMessages={['Escribe un número de contacto']}
       value={this.state.clienteCorreo} 
   />

   <div className="contbotonventa">
   <button type="submit" className="botonventa w60percent" >  Continuar</button>
   </div>
   </div>
</ValidatorForm>

</Animate>
        <Animate show={this.state.opcion1}>
        <div className="headercontact">
             
             <div className="tituloventa">
           <p> Pago con tarjeta</p>
                   
         </div>
         
             </div>
          <p className="asesoriaT">Aceptamos tarjeta de crédito, débito y postpago</p>

          <Tarjetas stateCapture={this.capturadorstate}/>
          <div style={{marginTop:"100px"}} className="PFCbuttons">
       
                <button className="botonventaalt  contBotonPago"onClick={this.onFlechaRetro} > Corregir  </button>
           

               
                <div className="contBotonPago">
  

<button className="botonventa customventa" onClick={this.compraConTarjeta}  > 
<p>Continuar</p>


</button>



           
                   </div>     
               
               
                </div>
        </Animate>

        <Animate show={this.state.opcion2}> 
        <div className="contTituloCont1"> 
          <p>Bancos Disponibles:</p>
          <img src="/static/imgpagos/transfer.jpg" alt="tarjeta de credito" className="iconotitulo"/>
           </div>
           <div className="contsolicitador">
      {bankRender}
        </div>
         
          
          
        </Animate>

        <Animate show={this.state.opcion3}> 
        <div className="contTituloCont1"> 
          <p>Bancos Disponibles:</p>
          <img src="/static/imgpagos/transfer.jpg" alt="tarjeta de credito" className="iconotitulo"/>
           </div>
           <div className="contsolicitador">
         

        </div>
         
          
          
        </Animate>

        <Animate show={this.state.opcionCoin}>
        <div className="contCenter">
        <div className="tituloventa">
                   <p className="subtituloArt">Tus iGlass Coins son: </p>
                   </div>
        <div className="CoinCont ">
<img className="moneda" src="/user/iglassCoin.png"/>
  <div className="numeromoneda">{this.state.Coins}  </div>
 
</div>
</div>
<p className="textoArt">El valor total de tu carrito es:<span style={{fontWeight:"bolder"}}> ${parseInt(this.props.totalPrice) }</span> </p>


{comprobadorCoins()}
        </Animate>
       
           <Animate show={this.state.generador}>
           <div className="contPfinal">
                 <i className="icofont-handshake-deal icoIMG"></i>
                 <div className="headercontact">
                 <div className="tituloventa">
                 <p >Preorden de compra generada</p>
                 </div>
                 </div>
              <p className="asesoriaT">Por favor  {`${this.state.clienteNombre} `} revisa si todo es correcto </p>
              <div className="contDatosC">
              <div className="cDc1">
              <p style={{fontWeight:"bolder"}}>  Metodo de pago:  </p>
            
              </div>
              <div className="cDc2">
               
               { this.state.formadepago}
             
               </div>
              </div>
                            <div style={{width:"100%"}}>
                    
                            <Animate  show={this.state.formadepago === "Transferencia-Coins" ||  this.state.formadepago === "Transferencia"} >
                

                <div className="contDatosC">
                <div className="cDc1">
                <p style={{fontWeight:"bolder"}}>  Banco: </p>
              
                </div>
                <div className="cDc2">
                
                <p>{this.state.banco}</p>
              
                </div>
                </div>

             
  </Animate>


                  <Animate  show={this.state.formadepago === "Tarjeta"} >
                  <div className="contDatosC">
                                <div className="cDc1">
                                <p style={{fontWeight:"bolder"}}>  Nombre Tarjeta:  </p>
                              
                                </div>
                                <div className="cDc2">
                                
                                <p>{this.state.name}</p>
                              
                                </div>
                                </div>
                                <div className="contDatosC">
                                <div className="cDc1">
                                <p style={{fontWeight:"bolder"}}>  Número Tarjeta: </p>
                              
                                </div>
                                <div className="cDc2">
                                
                                <p>{this.state.number?this.state.number.substring(0,4) + "-XXXX-XXXX-XXXX":""
                                }</p>
                              
                                </div>
                                </div>
                  </Animate>
                          </div>  
                      
                          
                                 <div className="contDatosC">
                                <div className="cDc1">
                                <p style={{fontWeight:"bolder"}}>  Entrega:  </p>
                              
                                </div>
                                <div className="cDc2">
                                
                                <p>{this.state.entrega}</p>
                              
                                </div>
                                </div>               
                                <div style={{width:"100%"}}>        
                            
                               
              <Animate show={this.state.envio}>
              <div className="contDatosC">
              <div className="cDc1">
              <p style={{fontWeight:"bolder"}}>  Envío a:  </p>
            
              </div>
              <div className="cDc2">
               
               <p>{`${this.state.clienteCiudad},  ${this.state.clienteDireccion} `}</p>
             
               </div>
              </div>
              <div className="contDatosC">
              <div className="cDc1">
              <p style={{fontWeight:"bolder"}}>  Valor Envío:  </p>
            
              </div>
              <div className="cDc2">
               
               <p>{`$${this.state.valorenvio}`}</p>
             
               </div>
              </div>
               <div className="contDatosC">
              <div className="cDc1">
              <p style={{fontWeight:"bolder"}}>  Valor Producto/s:  </p>
            
              </div>
              <div className="cDc2">
               
               <p>{`$${this.props.totalPrice}`}</p>
             
               </div>
              </div>
              
              </Animate>
              
         


             
                  <Animate  show={this.state.formadepago === "Efectivo-Coins" || this.state.formadepago === "Transferencia-Coins" } >
                 
                  <div className="contDatosC">
                                <div className="cDc1">
                                <p style={{fontWeight:"bolder"}}>  Coins Usadas:  </p>
                              
                                </div>
                                <div className="cDc2">
                                
                                <p><span >{this.state.Coins}</span></p>
                              
                                </div>
                                </div>
                 
                 
                 
                 
                  <div className="contDatosC">
                                <div className="cDc1">
                                <p style={{fontWeight:"bolder"}}>  Valor a pagar:  </p>
                              
                                </div>
                                <div className="cDc2">
                                
                                <p><span style={{fontWeight:"bolder"}}>${(parseInt(this.props.totalPrice) )-this.state.Coins}</span></p>
                              
                                </div>
                                </div>
                  </Animate>
                  <Animate  show={this.state.formadepago === "Tarjeta" ||this.state.formadepago === "Efectivo" || this.state.formadepago === "Transferencia" } >
                  <div className="contDatosC">
                                <div className="cDc1">
                                <p style={{fontWeight:"bolder"}}>  Valor Final:  </p>
                              
                                </div>
                                <div className="cDc2">
                                
                                <p>{`$${this.state.ValorFinal}`}</p>
                              
                                </div>
                                </div>
                                </Animate>
                  <Animate  show={this.state.formadepago === "Coins" } >
                  <div className="contDatosC">
                                <div className="cDc1">
                                <p style={{fontWeight:"bolder"}}>  Coins Usadas:  </p>
                              
                                </div>
                                <div className="cDc2">
                                
                                <p><span style={{fontWeight:"bolder"}}>${(parseInt(this.props.totalPrice) )}</span></p>
                              
                                </div>
                                </div>
                                <div className="contDatosC">
                                <div className="cDc1">
                                <p style={{fontWeight:"bolder"}}>   Saldo en Coins:  </p>
                              
                                </div>
                                <div className="cDc2">
                                
                                <p><span style={{fontWeight:"bolder"}}>{this.state.Coins - (parseInt(this.props.totalPrice) )}</span></p>
                              
                                </div>
                                </div>
                  </Animate>
              </div>
                 
             <div style={{marginBottom:"100px"}} className="PFCbuttons">
                
                 <button className="botonventaalt "onClick={this.onFlechaRetro} > Corregir  </button>


                
                 <div className="contBotonPago">
      <Animate show={this.state.compraLoading}>
<CircularProgress />
</Animate>
<Animate show={!this.state.compraLoading}>
<button className="botonventa customventa" onClick={this.compraFun}  > 
<p>Continuar</p>


</button></Animate>



            
                    </div>     
                
                
                 </div>
                 </div>
      
             </Animate>
             <Animate show={this.state.despedida}> 
                  <div className="contPfinal">
                   <img src="/static/vistillo.png" className="imgventa"/>
                   <div className="headercontact">
                   <div className="tituloventa">
                   <p className="subtituloArt">Éxito en tu solicitud </p>
                   </div>
                   </div>
                   <div style={{marginBottom:"10px"}} className="asesoriaT">  Su número de carrito es 
                   
        <ShoppingCartIcon />

  {this.state.CarritoNumero}    </div>

      
 
       
                   {despedidaCont()}      
             

                   {this.props.usuario !== "" && <div className="perfilCont">       <p>Continue el seguimiento de su compra, en su perfil en la pestaña "Compras"</p>
        <Link href="/usuarios/[perfil]" as={`/usuarios/${this.props.usuario.update.usuario.Usuario}`} ><a >
          <button className="btn btn-primary" onClick={()=>{  this.props.dispatch(resetCard()) }}>
          Perfil
          <img  src="/icons/account.svg" />
</button>

          </a></Link></div>}

          {this.props.usuario === "" && <div>    
            
            <p>Se le ha enviado un correo electrónico con los detalles de su compra </p>
            </div>}
                   
             
               <div className="contbotonventa">
               <div className="PFCbuttons">
          
     
     
          <button className="botonventa  " onClick={()=>{ this.props.flechafun();  this.props.dispatch(resetCard()) }}>
          <a>Continuar</a>
          </button>
 
   </div>
                  
                   </div>
                   </div>
                  </Animate>        
                         
             <Animate show={this.state.soporte}>
          <Soporte 
          datosTienda={this.props.tienda}
          flechafun ={this.soporteFlechaFun}/>
           </Animate>
           <Animate show={this.state.soporteBox}>
           <div className="contSoporte" onClick={this.clickSoporte}> 
           <p className="textoSoporte">Alguna duda? Comunícate aquí </p>
          <img src="/static/imgpagos/soporte.jpg" className="soportetec"></img>
           </div>
           </Animate>
       
            </div>
            </div>

           </div>
          
           </div>
         
          


           <style jsx>{`
/* SlatePad — checkout / contacto */
.maincontacto {
  --sp-primary: #1d4ed8;
  --sp-secondary: #38bdf8;
  --sp-bg: #f8fafc;
  --sp-bg-alt: #eff6ff;
  --sp-bg-card: #ffffff;
  --sp-border: #e2e8f0;
  --sp-text: #334155;
  --sp-success: #22c55e;
  --sp-danger: #991b1b;
  --sp-shadow: 0 2px 12px rgba(15, 23, 42, 0.10);
  --sp-shadow-lg: 0 8px 32px rgba(15, 23, 42, 0.12);
  --sp-radius-sm: 8px;
  --sp-radius-md: 12px;
  --sp-radius-lg: 16px;
  --sp-radius-xl: 20px;
  font-family: Inter, system-ui, sans-serif;
  color: var(--sp-text);
}
.maincontacto .tituloArt {
  font-family: Inter, system-ui, sans-serif;
  font-weight: 900;
  color: var(--sp-text);
  letter-spacing: -0.02em;
}
.maincontacto .subtituloArt {
  font-weight: 700;
  color: var(--sp-primary);
  font-family: Inter, system-ui, sans-serif;
}
.maincontacto .textoArt {
  color: var(--sp-text);
  font-family: Inter, system-ui, sans-serif;
}
.maincontacto .botonGeneral {
  background: linear-gradient(135deg, #1d4ed8 0%, #38bdf8 100%);
  color: #fff;
  border: none;
  border-radius: var(--sp-radius-sm);
  box-shadow: var(--sp-shadow);
  font-weight: 700;
  font-family: Inter, system-ui, sans-serif;
  transition: box-shadow 0.18s ease, transform 0.15s ease;
}
.maincontacto .botonGeneral:hover {
  color: #fff;
  box-shadow: var(--sp-shadow-lg);
  transform: translateY(-1px);
}
.maincontacto .jwseccionCard {
  width: 100%;
  max-width: 420px;
}
.maincontacto .jwminiCard-v2 {
  background: var(--sp-bg-card);
  border: 1px solid var(--sp-border);
  border-radius: var(--sp-radius-md);
  box-shadow: var(--sp-shadow);
  padding: 12px 16px;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}
.maincontacto .jwminiCard-v2:hover {
  border-color: var(--sp-secondary);
  box-shadow: var(--sp-shadow-lg);
}
.maincontacto .gradient-border {
  background: #fff;
  border-radius: var(--sp-radius-md);
  box-shadow: var(--sp-shadow);
}
.maincontacto .gradient-border:after {
  background: linear-gradient(135deg, #1d4ed8, #38bdf8);
  animation: none;
  background-size: 100% 100%;
}
.maincontacto .boxinside {
  background: var(--sp-bg);
  border-radius: 10px;
  color: var(--sp-text);
}
.maincontacto .btn-primary {
  background: linear-gradient(135deg, #1d4ed8, #38bdf8) !important;
  border: none !important;
  border-radius: var(--sp-radius-sm) !important;
  font-weight: 700;
  font-family: Inter, system-ui, sans-serif;
  box-shadow: var(--sp-shadow);
  padding: 10px 20px;
}
.maincontacto .btn-success {
  background: var(--sp-success) !important;
  border: none !important;
  border-radius: var(--sp-radius-sm) !important;
  font-weight: 700;
  font-family: Inter, system-ui, sans-serif;
  box-shadow: var(--sp-shadow);
}
.contBotonPago{
  width: 150px;
}
.customventa{
  width: 100%!important;
}
           .contCenter{
            display: flex;
            display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin: 15px;
           }
           .numeromoneda{
            font-family: Inter, system-ui, sans-serif;
          display: flex;
          align-items: center;
          font-size: 2.5rem;
          font-weight: 900;
          color: #1d4ed8;
          }
           .moneda{
            width: 57%;
            max-width: 226px;
            height: autos;
          }
          .saldo{
            border: 1px solid #dbeafe;
            background: #eff6ff;
    padding: 12px 16px;
    border-radius: 12px;
    text-align: center;
    font-size: 1.1rem;
    font-weight: 700;
    color: #334155;
    box-shadow: 0 2px 12px rgba(15,23,42,0.08);
          }
           .CoinCont{
            padding: 14px 18px;
            display: flex;
            border: 1px solid #e2e8f0;
            background: linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%);
            border-radius: 16px;
            justify-content: space-around;
            align-items: center;
            text-align: center;
            width: 80%;
            max-width: 180px;
            box-shadow: 0 2px 12px rgba(15,23,42,0.10);
            }
           .sinancho{
            width:none
           }
             .custombackground{
              background: linear-gradient(135deg, #1d4ed8 0%, #38bdf8 100%);
              border-radius: 12px;
              box-shadow: 0 2px 12px rgba(15,23,42,0.10);
             }
           .registerbutton{
            color: #1d4ed8;
            margin-top: 50px;
            text-decoration: none;
            font-weight: 700;
            cursor:pointer;
            transition: color 0.15s ease;
           }
           .registerbutton:hover{
            color: #38bdf8;
           }

.imagenboton{
  width:30%
}
             .consumidor{
              display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-style: italic;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    border-radius: 12px;
    padding: 8px 12px;
    margin-bottom: 10px;
    color: #334155;
}
             
             .consumidor p{
               margin:0
             }
            .fbcustom{
              width:60%
            }
            
.perfilCont{
  display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%);
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 12px rgba(15,23,42,0.10);
}
            .contLogin{
              display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
    text-align: center;
    background: linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%);
    padding: 24px 16px;
    border-radius: 16px;
    margin: 12px 0px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 12px rgba(15,23,42,0.08);
            }
         
.minimensaje{
  text-align: center;
    font-size: 11px;
}
             .contenidoForm{
               margin: 20px 0px;
              display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
             }
             .contSoporte{  
            cursor:pointer;
 margin-top:15px;
    border: 1px solid #dbeafe;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(15,23,42,0.10);
    padding: 12px 16px;
    text-align: center;
    transition: box-shadow 0.18s ease, border-color 0.18s ease;
             }
             .contSoporte:hover{
               border-color: #38bdf8;
               box-shadow: 0 8px 32px rgba(15,23,42,0.12);
             }
             .textoSoporte{
margin-bottom:0px;
             }
             .soportetec{
               width: 10%;
             }
             .contPfinal{
              display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
             }
           .imgventa{
            margin-top: 30px;
    height: 100px;
    width: 100px;
    margin-bottom: 20px;
   }
   .PFCbuttons{
     margin-top:20px;

    display: flex;
    width: 100%;
    justify-content: space-around;
   }
           .cDc2{
     margin-left:10px;
     width: 40%;
   }
   .urgente{
    text-align: center;
    border: 1px solid #dbeafe;
    background: #eff6ff;
    margin-top: 10px;
    border-radius: 12px;
    padding: 12px;
    color: #334155;
   }
   .urgente p{
  margin-top:0px;
  margin-bottom:15px;
   }
   .buttonURG{
     padding: 8px 18px;
     border-radius: 10px;
     background: #991b1b;
     color: #fff;
     font-weight: 700;
     border: none;
     box-shadow: 0 2px 12px rgba(15,23,42,0.10);
     transition: box-shadow 0.18s ease;
   }
   .buttonURG:hover{
     box-shadow: 0 8px 32px rgba(15,23,42,0.15);
   }
   .icoIMG{
     margin-top:10px;
     font-size:100px;
   }
   .contDatosC{
    display: flex;
    width: 100%;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    margin: 8px 0px;
    align-items: center;
    padding: 16px 14px;
    box-shadow: 0 2px 12px rgba(15,23,42,0.06);
   }
.cDc1{
  width: 50%;
  text-align: left;
  
}
             .contTituloCont1{
              margin-top: 10px;
    display: flex;
    font-size: 1.25rem;
    justify-content: center;
    align-items: center;
    font-weight: 900;
    text-align: center;
    border-radius: 12px;
    padding: 12px 16px;
    background: linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%);
    border: 1px solid #e2e8f0;
    color: #334155;
    font-family: Inter, system-ui, sans-serif;
    box-shadow: 0 2px 12px rgba(15,23,42,0.06);
             }
             .contTituloCont1 p{
               margin-top:5px;
               margin-bottom:5px;
             }

.cdoptions{
  width: 40%;
    word-break: break-all;
    margin-left: 4%;
    margin-right: 4%;
    margin-top: 20px;
    border-bottom: 3px solid #1d4ed8;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 2px 12px rgba(15,23,42,0.08);
    transition: box-shadow 0.18s ease, transform 0.15s ease;
}
.cdoptions:hover{
  box-shadow: 0 8px 32px rgba(15,23,42,0.12);
  transform: translateY(-2px);
}

           .headercontact {

            display:flex;
            justify-content: space-around;
            flex-flow: column;
  
    align-items: center;
           }

.chat{

width:100px;
margin: 5px
}


           .contbotonventa{
             display:flex;
             justify-content:center;
             width:100%;
           }

.asesoriaT{
  font-size: 1rem;
    text-align: center;
    margin-top: 10px;
    border-radius: 12px;
    margin-bottom: 10px;
    padding: 12px 16px;
    background: #eff6ff;
    border: 1px solid #dbeafe;
    color: #334155;
    box-shadow: 0 2px 12px rgba(15,23,42,0.06);
    font-family: Inter, system-ui, sans-serif;
    font-weight: 500;
}

             .botonventa{
              margin-top: 17px;
    border-radius: 10px;
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    box-shadow: 0 2px 12px rgba(15,23,42,0.12);
    color: #fff;
    transition: box-shadow 0.18s ease, transform 0.15s ease;
    height: 40px;
    line-height: 2.25rem;
    font-family: Inter, system-ui, sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: none;
    border: none;
    width: 40%;
    cursor: pointer;
             }
             .botonventa:hover{
               box-shadow: 0 8px 32px rgba(15,23,42,0.15);
               transform: translateY(-1px);
             }
             .botonventaalt{
              margin-top: 15px;
    background: linear-gradient(135deg, #1d4ed8 0%, #38bdf8 100%);
    box-shadow: 0 2px 12px rgba(15,23,42,0.12);
    color: #fff;
    transition: box-shadow 0.18s ease, transform 0.15s ease;
    line-height: 1.25rem;
    font-family: Inter, system-ui, sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: none;
    border: none;
    border-radius: 10px;
    width: 40%;
    cursor: pointer;
    padding: 8px 18px;
             }
             .botonventaalt:hover{
               box-shadow: 0 8px 32px rgba(15,23,42,0.15);
               transform: translateY(-1px);
             }
             .subContactCont {
               margin:10px 0px
             }
             .contactcont i {
margin-top:10px;
margin-top:10px
}
          .contsolicitador{
         
           
            display:flex;
            width:100%;
            align-items: center;
            justify-content: space-around;
         text-align: center;
         font-size:20px;
         flex-wrap: wrap;
          }
          .option{
            width: 45%;
    box-shadow: 0 2px 12px rgba(15,23,42,0.10);
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    background: #fff;
    padding-bottom: 5%;
    padding-top: 14px;
    padding-left: 8px;
    padding-right: 8px;
    height: 220px;
    word-break: break-word;
    cursor:pointer;
    transition: box-shadow 0.18s ease, border-color 0.18s ease, transform 0.15s ease;
          }
          .option:hover{
            border-color: #38bdf8;
            box-shadow: 0 8px 32px rgba(15,23,42,0.12);
            transform: translateY(-2px);
          }
          .optionBank img{
            width: 50%;
            border-radius: 20px;
            max-width:120px;
          }
          .option img{
            width:100%;
            max-width:120px;
          }
          .option3{
            margin-bottom: 20px;
    width: 135px;
    box-shadow: 0 2px 12px rgba(15,23,42,0.10);
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    background: #fff;
    padding-bottom: 5%;
    padding-top: 14px;
    padding-left: 8px;
    padding-right: 8px;
    margin: 5px 2vw 5vw 5px;
    height: 230px;
    word-break: break-word;
    cursor:pointer;
    transition: box-shadow 0.18s ease, border-color 0.18s ease, transform 0.15s ease;
}
.option3:hover{
  border-color: #38bdf8;
  box-shadow: 0 8px 32px rgba(15,23,42,0.12);
  transform: translateY(-2px);
}
.optionBank{
  width: 30%;
  box-shadow: 0 2px 12px rgba(15,23,42,0.10);
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #fff;
  height: 200px;
  word-break: break-word;
  cursor: pointer;
  margin: 20px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.18s ease, border-color 0.18s ease, transform 0.15s ease;
}
.optionBank:hover{
  border-color: #1d4ed8;
  box-shadow: 0 8px 32px rgba(15,23,42,0.12);
  transform: translateY(-2px);
}

.option3 img{
            width:100%;
            max-width:120px;
          }
      
        
        .maincontacto{
          overflow: scroll;
          z-index: 9999;
         width: 100%;
         height: 100%;
         background-color: rgba(15, 23, 42, 0.55);
         backdrop-filter: blur(4px);
         left: 0px;
         position: fixed;
         top: 0px;
         display: flex;
         justify-content: center;
         align-items: center;
       }
       .contcontacto{
         position: absolute;
         top: 5%;
        border-radius: 20px;
        margin-bottom: 5%;
         width: 90%;
         max-width: 720px;
         background: #ffffff;
         box-shadow: 0 8px 32px rgba(15,23,42,0.12);
         border: 1px solid #e2e8f0;
       }
       .marginador{
         margin: 0px 16px 20px 16px;
         color: #334155;
         display: flex;
         flex-flow: column;
         align-items: center;
       }
   
       .asesort{
        margin-top: 20px;
         text-align: center;
         font-size: 1.1rem;
         font-weight: 700;
         color: #334155;
         margin-bottom: 0;
         font-family: Inter, system-ui, sans-serif;
       }
       .engrane{
         height: 75px;
       }
   
       .iconotitulo{
         width: 60px;
         height: 60px;
         margin: 15px;
   
       }
   
       .tituloventa{
         display: flex;
         align-items: center;
         font-size: 1.35rem;
         font-weight: 900;
         text-align: center;
         color: #334155;
         font-family: Inter, system-ui, sans-serif;
       }
       .tituloventa p{
         margin-top:5px;
         margin-bottom:5px
       }
     
       .flecharetro{
         height: 40px;
         width: 40px;
         padding: 8px;
         border-radius: 10px;
         background: #f8fafc;
         border: 1px solid #e2e8f0;
         transition: background 0.15s ease, box-shadow 0.18s ease;
         cursor: pointer;
       }
       .flecharetro:hover{
         background: #eff6ff;
         box-shadow: 0 2px 12px rgba(15,23,42,0.10);
       }
          
       body {
            height:100%

           }

           .contform{
            padding-bottom: 25px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
           }

          .contcontactoDirecto{
        
         
            text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
          }
        
.icentrado{
  display:flex;
  width:100%;
  justify-content: center;
}
          .titulocontactd{
            font-size: 1.1rem;
            font-weight: 700;
            color: #1d4ed8;
            height: 25%;
         
            font-family: Inter, system-ui, sans-serif;
          }
         
             .imgEnf img{
                max-width:250px;
              }
              .botonventa-Enf,
              .imgEnf{
               border-color: #1d4ed8 !important;
               box-shadow: 0 8px 32px rgba(29, 78, 216, 0.2) !important;
             }
             .optionBank.imgEnf{
               background: linear-gradient(180deg, #eff6ff 0%, #fff 100%);
             }
             .sinmargen{
              margin:0;
            }
            .doblebuttonCont{
              display: flex;
       align-items: center;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content: space-around;
            }
            
            .customfb{
             
              display: flex;
    justify-content: center;
    align-items: center;
            }
            .customfbButton{
              max-width:300px;
              height: 50px;
    font-size: 14px;
            }

 .contenedorcontaco{
               display:flex;
               flex-flow:row;
             
    justify-content: space-evenly;
               
             }
             .contactcont{
   height: 100%;
   background: #fff;
   border: 1px solid #e2e8f0;
   border-radius: 12px;
   display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-evenly;
    width: 45%;
    padding: 12px;
    box-shadow: 0 2px 12px rgba(15,23,42,0.06);
}
             .jwBolder{
               font-weight: 700;
               color: #334155;
             }
             .maincontacto .logFacebook{
               border-radius: 12px;
               box-shadow: 0 2px 12px rgba(15,23,42,0.10);
               transition: box-shadow 0.18s ease;
             }
             .maincontacto .logFacebook:hover{
               box-shadow: 0 8px 32px rgba(15,23,42,0.12);
             }
             .maincontacto .customInput input,
             .maincontacto .MuiInput-root{
               font-family: Inter, system-ui, sans-serif;
             }

             @media only screen and (max-width: 320px) { 
               .subtituloArt{
                margin-top:2px;
                margin-bottom:2px;
               }
               .comunicacionart{
                 margin-bottom:2px;
               }
               .marginador{
                margin: 0px 2px 15px 2px;
               }
         .contcontacto{
          width: 95%;
         }
          }
          @media only screen and (min-width: 600px) { 
            
            .soportetec{
               width: 8%;
             }
            

              .contcontacto{
       
         width: 70%;
      
      
       }
          }
          @media only screen and (min-width: 950px) { 
         
            .soportetec{
               width: 10%;
             }
            
              
              
             
              .imgventa{
            margin-top: 40px;
            height: 120px;
    width: 120px;
   }
   .contsolicitador{
    margin-top: 4%;
    

   }
          }
          @media only screen and (min-width: 1200px) { 
            
            .soportetec{
               width: 10%;
             }
           
              
              .imgventa{
        
   }
          }
          .w60percent{
               width:60%
             }
             .w100percent{
               width:100%
             }
           `}</style>
        
        
           </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>  {
 

  const usuario = state.userReducerEmarket

 let configTienda = {};
    const tiendas = state.tiendaConfig && state.tiendaConfig.tiendas ? state.tiendaConfig.tiendas : {};
    const slug = ownProps && ownProps.router && ownProps.router.query ? ownProps.router.query.slug : undefined;
    if (slug && tiendas[slug] ) {
      configTienda = tiendas[slug];
    } 


  return {
    carrito: state.shop.cart,
      usuario,
      config: state.config,
      tienda: configTienda,
      totalPrice: state.shop.cart.reduce((count, curItem) => {
        return count + (curItem.Precio_Venta * curItem.CantidadCompra);
    }, 0)
  }
};




export default withRouter(connect(mapStateToProps)(Contacto));
