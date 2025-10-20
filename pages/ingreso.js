import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Animate } from "react-animate-mount";
import Router from 'next/router';
import {connect} from 'react-redux';
import {updateUser} from "../reduxstore/actions/myact"
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Modal from "../components/modalregister"
import Modalreset from "../components/modalresetpass"
import Head from "next/head"
class LoginCompo extends Component {
 state = {
    correoLogin:"",
    passLogin:"",
    registro:false,
    login:true,
    passReg:"",
     telefonoReg:"",
    emailReg:"",
    usuarioReg:"",
    snackerror1:false,
    snackerror2:false,
    snackerror3:false,
    mailtoshow:"",
    modal:false,
    resetpass:false,
 }
 componentDidMount(){
    
  
    ValidatorForm.addValidationRule('requerido', (value) => {
      if (value === "") {
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

  if (cadena.length >= 7) {
      return true;
  }
  return false;
});
ValidatorForm.addValidationRule('minimo6', (value) => {
  let cadena = value.toString()

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

    }

    handleChangeform=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
         }

          
registroFuncion=(e)=>{
    
 
  
  var urldeploy = `${process.env.URL_BACKEND_SERVER}/users/register-autoclient`;
  var url = `http://localhost:3000/users/register-autoclient`;
   var data = {Usuario:this.state.usuarioReg,
               TelefonoContacto:this.state.telefonoReg,
               Correo:this.state.emailReg.toLowerCase(),
               Contrasena:this.state.passReg.toLowerCase(),
               RegistradoPor:"usuario",
               Confirmacion:false,
               TipoID:"Cedula",
               Nombres:this.state.nombresUsuarioReg,
               Ciudad:this.state.ciudadUsuarioReg,
               Direccion:this.state.direccionUsuarioReg,
               Cedula:this.state.cedulaUsuarioReg,

               Userdata:{DBname:process.env.EMARKET_DATA_BASE}
/*
    
   
                TipoID:req.body.TipoID*/
                 
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
   const usuario = response.user
       
   this.props.dispatch(updateUser({usuario}))
         
   this.setState({datos:usuario, modal:true})

   const userSting = JSON.stringify(usuario)
   var urldeploy = `${process.env.URL_BACKEND_SERVER}/admin/mailer/validationmail`;

   fetch(urldeploy, {
    method: 'POST', // or 'PUT'
    body: userSting, // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {console.log('Success send mail:', response)})

   
      
   }
   else if(response.status =="error"){
    console.log(response)
    if(response.message === "El correo ya esta registrado"){
       this.setState({snackerror1:true})
    }
}
  
});
 
  
 }
 loginFuncion=(e)=>{
    
  var urldeploy = `${process.env.URL_BACKEND_SERVER}/users/authenticateclient`;
  var url = `${process.env.URL_BACKEND_SERVER}/users/authenticateclient`;
  
    var data = {User:{DBname:process.env.EMARKET_DATA_BASE},
                Correo:this.state.correoLogin.toLowerCase(),
                Contrasena:this.state.passLogin.toLowerCase(),
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
    .then(response => {
        console.log('Success:', response)

        if(response.status === "Ok"){
            const usuario = response.data.user
       
            this.props.dispatch(updateUser({usuario}))
                  
            if(response.data.user.Tipo === "administrador"){
              Router.push("/usuarios/administrador", `/usuarios/${response.data.user.Usuario}`)
            }
            else{
              console.log("usuario cliente")
            Router.push("/usuarios/[perfil]", `/usuarios/${response.data.user.Usuario}`)
          }

        }

        else if(response.status =="error"){
            console.log(response)
            if(response.message === "no existe el correo"){
               this.setState({snackerror2:true})
            }
           else if(response.message === "Invalid password!!"){
                this.setState({snackerror3:true})
             }
        
        
        }
       
    }
    );
  }
  componentClicked = (response) => {
   
    console.log(response);
    console.log("component");
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
              
        
        Router.push("/usuarios/[perfil]", `/usuarios/${response.data.user.Usuario}`)
        }
        else if(response.status =="error"){
         console.log(response)
         if(response.message === "El correo ya esta registrado"){
            this.setState({snackerror1:true})
         }
         
     }
 });
}
loginFacebook = (response) => {
    let passgenerator = response.id + "iglass289298asd"
    this.setState({mailtoshow:response.email})

   
    var url = 'https://iglass.herokuapp.com/users/authenticate';
    var datafb = {Correo:response.email,
        Contrasena:passgenerator,
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
              
        if(response.data.user.Tipo === "administrador"){
          Router.push("/usuarios/administrador", `/usuarios/${response.data.user.Usuario}`)
        }
        else{
          console.log("usuario cliente")
        Router.push("/usuarios/[perfil]", `/usuarios/${response.data.user.Usuario}`)
      }
    }

    else if(response.status ==="error"){
        console.log("detectando")

        
                if(response.message === "no existe el correo"){
                 
                this.setState({snackerror2:true})
                }
            else if(response.message === "Invalid password!!"){
                    this.setState({snackerror3:true})
                }
    
    
    }
  });
 }
 
 render() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
      const handleClose = (event, reason) => {
      
        if (reason === 'clickaway') {
          return;
        }
         this.setState({snackerror1:false,snackerror2:false,snackerror3:false})
        
    }
  return(
   <div className="jwMainContainer">

     <Head>
     <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

     </Head>
        <div className="jwSubContainer">
        <div className="jwCard">
            <div className="jwContCard">
<Animate show={this.state.login}>
           
            <p className="tituloArt">Ingresa</p>

            <div className="jwseccionCard">
            <ValidatorForm
   id="forming"
   onSubmit={this.loginFuncion}
   onError={errors => console.log(errors)}
>
<div className="contenidoForm">
    <div className="customInput">
        <div className="jwminilogo">
        <img src="/icons/account_box.svg" alt=""/>
</div>
      <TextValidator
      label="Correo"
       onChange={this.handleChangeform}
       name="correoLogin"
       type="email"
       validators={['requerido',"correoval"]}
       errorMessages={['Escribe tu correo Electronico',"Escribe un correo válido"]
      
      }
       value={this.state.correoLogin}
   />
   </div>
   <div className="customInput">
   <div className="jwminilogo">
   <img src="/icons/key.svg" alt=""/>
</div>
   <TextValidator
       label="Contraseña"
       onChange={this.handleChangeform}
       name="passLogin"
       type="password"
       validators={["requerido", "minimo6"]}
       errorMessages={['Escribe una contraseña válida', "Mínimo 6 dígitos"]}
       value={this.state.passLogin} 
   />
   </div>
   </div>
   <div className="jwseccionCard buttoncont " style={{marginBottom:0}}>

    <button type="submit" className="botonGeneral loginbutton">Ingresar</button>
   
</div>
</ValidatorForm>

<div  style={{display:"none"}} className="buttoncont">
<FacebookLogin
 size="medium"
    appId="305382950448795"

    disableMobileRedirect={true}
 
    fields="name,email,picture"
    onClick={this.componentClicked}
    callback={this.loginFacebook}
    render={renderProps => (
        <button className="logFacebook" onClick={renderProps.onClick}  >
        <img src="/static/social/logofb.png" alt="facebook" className="imagenboton"/>
        <p>Ingresa con Facebook</p>
        </button > 
      )}
    
    />
 
</div>
<div className="buttoncont">
<p style={{color:"blue", fontStyle:"italic", marginTop:"10px", textDecoration:"underline", cursor:"pointer", fontSize:"16px"}}onClick={()=>{this.setState({resetpass:true, login:false})}}>Olvidaste tu contraseña?</p>
 
</div>
<div className="buttoncont">
<p style={{color:"blue", fontStyle:"italic", textAlign:"center", marginTop:"100px", textDecoration:"underline", cursor:"pointer"}}onClick={()=>{this.setState({registro:true, login:false})}}>Regístrate</p>
 
</div>
            </div>



          
            </Animate>
            <Animate show={this.state.registro}>
       
            <p className="tituloArt">Área de Registro</p>

          
          <div style={{display:"none"}} className="jwseccionCard">
          <FacebookLogin
          size="metro"
    appId="305382950448795"
    disableMobileRedirect={true}
    fields="name,email,picture"
    onClick={this.componentClicked}
    callback={this.registerFacebook}
    render={renderProps => (
        <button className="logFacebook" onClick={renderProps.onClick}  >
        <img src="/static/social/logofb.png" alt="facebook" className="imagenboton"/>
        <p>Registrate con Facebook</p>
        </button > 
      )}
    
    />

          </div>
          
            <div className="jwseccionCard">
              <p className="subtituloArt">  o Regístrate aquí</p>
                <p className="jwcomentario">Los campos que contengan un * son obligatorios</p>
            <ValidatorForm

   onSubmit={this.registroFuncion}
   onError={errors => console.log(errors)}
>
<div className="contenidoForm">
<div className="customInput">
        <div className="jwminilogo">
    <span className="material-icons">
    perm_identity
</span>
</div>
      <TextValidator
      label="Nombres Completos*"
       onChange={this.handleChangeform}
       name="nombresUsuarioReg"
       type="text"
       validators={['requerido']}
       errorMessages={['Escribe tus nombres'] }
       value={this.state.nombresUsuarioReg}
   />
   </div>
   <div className="customInput">
        <div className="jwminilogo">
    <span className="material-icons">
account_circle
</span>
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
    <span className="material-icons">
badge
</span>
</div>
      <TextValidator
      label="Cédula*"
       onChange={this.handleChangeform}
       name="cedulaUsuarioReg"
       type="number"
       validators={['requerido']}
       errorMessages={['Escribe tu usuario'] }
       value={this.state.cedulaUsuarioReg}
   />
   </div>
     <div className="customInput">
        <div className="jwminilogo">
    <span className="material-icons">
location_city
</span>
</div>
      <TextValidator
      label="Ciudad*"
       onChange={this.handleChangeform}
       name="ciudadUsuarioReg"
       type="text"
       validators={['requerido']}
       errorMessages={['Escribe tu Ciudad'] }
       value={this.state.ciudadUsuarioReg}
   />
   </div>
    <div className="customInput">
        <div className="jwminilogo">
    <span className="material-icons">
house
</span>
</div>
      <TextValidator
      label="Direccion*"
       onChange={this.handleChangeform}
       name="direccionUsuarioReg"
       type="text"
       validators={['requerido']}
       errorMessages={['Escribe tu Direccion'] }
       value={this.state.direccionUsuarioReg}
   />
   </div>
   <div className="customInput">
   <div className="jwminilogo">
   <span className="material-icons">
email 
</span>
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
   <span className="material-icons">
contact_phone
</span>
</div>
   <TextValidator
       label="Teléfono de contacto"
       onChange={this.handleChangeform}
       name="telefonoReg"
       type="number"
       validators={['requerido',"minimo7"]}
       errorMessages={['Ingresa tu número de contacto',"Mínimo 7 números"]}
       value={this.state.telefonoReg} 
   />
   </div>
  
   <div className="customInput">
   <div className="jwminilogo">
   <span className="material-icons">
vpn_key
</span>
</div>
   <TextValidator
       label="Contraseña*"
       onChange={this.handleChangeform}
       name="passReg"
       type="password"
       validators={["requerido", "minimo6"]}
       errorMessages={['Escribe una contraseña válida', "Mínimo 6 caracteres"]}
       value={this.state.passReg} 
   />
   </div>
   <div className="jwseccionCard buttoncont">

<button type="submit" className="botonGeneral loginbutton">Registrarse</button>


</div>
   </div>
</ValidatorForm>


<div className="jwseccionCard jwW100percent">
    <div className="jwminiCard" onClick={()=>{this.setState({registro:false,login:true})}}>
<span className="material-icons">
undo
</span>
<p> Regresa al ingreso</p>

</div>
</div>
            </div>




           
            </Animate>
     
        </div>
      
        </div>
            </div>
            <Animate show={this.state.modal}>
            <Modal flechafun={()=>{this.setState({modal:false})}} datos={this.state.datos} />
            </Animate>
            <Animate show={this.state.resetpass}>
            <Modalreset flechafun={()=>{this.setState({resetpass:false, login:true})}}  />
            </Animate>

            <Snackbar open={this.state.snackerror1} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="error">
        <p style={{textAlign:"center"}}>Ya estas registrado con ese correo electrónico {this.state.mailtoshow} </p>
    
    </Alert>
  </Snackbar>
  <Snackbar open={this.state.snackerror2} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="error">
        <p style={{textAlign:"center"}}>El correo electrónico {this.state.mailtoshow} no existe </p>
    
    </Alert>
  </Snackbar>
  <Snackbar open={this.state.snackerror3} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="error">
        <p style={{textAlign:"center"}}>La Contraseña es Incorrecta </p>
    
    </Alert>
  </Snackbar>
            <style jsx> {`
            form{
                    width:100%;
                }
                `}
               
            </style>
   </div>
    )
   }
 }


LoginCompo.propTypes = {}
export default connect()(LoginCompo)