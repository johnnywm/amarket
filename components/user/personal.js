import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Router from "next/router"
import {connect} from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HouseIcon from '@mui/icons-material/House';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CreateIcon from '@mui/icons-material/Create';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


import LocationCityIcon from '@mui/icons-material/LocationCity';
import {deleteUser, updateUser} from "../../reduxstore/actions/myact"
/**
* @author
* @class PersonalInf
**/

class PersonalInf extends Component {
  
 state = { 
   id:this.statefun("_id"),
  usuario:this.statefun("Usuario"),
  readOnly:true,
     correo:this.statefun("Email"),
     telefono:this.statefun("Telefono"),

     ciudad:this.statefun("Ciudad"),
     direccion:this.statefun("Direccion"),
     cedula:this.statefun("Cedula"),
     edditButton:true,
 }

statefun(e){
  if(this.props.usuario){
    const user =eval("this.props.usuario.update.usuario." + e)
    return (user)
  }
  
}

 
 componentDidMount(){

 }
 handleChangeform=(e)=>{
  this.setState({
      [e.target.name] : e.target.value
  })
   }



updateUser=()=>{
 
  this.setState({readOnly:true})
  var url = 'https://iglass.herokuapp.com/users/update';  
  var data = {Id: this.state.id,
              Usuario:this.state.usuario,
              Telefono:this.state.telefono,
              Email:this.state.correo,
             
              Ciudad:this.state.ciudad,
              Direccion:this.state.direccion,
              Cedula:this.state.cedula
              }

 var lol = JSON.stringify(data)

  fetch(url, {
    method: 'PUT', // or 'PUT'
    body: lol, // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
   
    console.log('Success:', response);
      let usuario = response.user


    this.props.dispatch(updateUser({usuario}))

  });

  
}

   
 render() {
  
   
  return(
   <div>
      <ValidatorForm
   
   onSubmit={this.updateUser}
   onError={errors => console.log(errors)}
>
<div className="contenidoForm">
    <div className="customInput">
        <div className="jwminilogo">
  <AccountCircleIcon />
</div>
      <TextValidator
      label="Usuario*"
       onChange={this.handleChangeform}
       name="usuario"
       type="text"
       validators={['requerido']}
       errorMessages={['Escribe tu usuario'] }
       value={this.state.usuario}
       InputProps={{
        readOnly: this.state.readOnly,
      }}
   />
   
   
   </div>
   <div className="customInput">
        <div className="jwminilogo">
  <EmailIcon/>
</div>
      <TextValidator
      label="Correo"
       onChange={this.handleChangeform}
       name="correo"
       type="mail"
       validators={['requerido']}
       errorMessages={['Escribe tu correo'] }
       value={this.state.correo}
       InputProps={{
        readOnly: this.state.readOnly,
      }}
   />
   
   
   </div>
   <div className="customInput">
        <div className="jwminilogo">
    <PhoneIcon/>
</div>
      <TextValidator
      label="Teléfono de contacto"
       onChange={this.handleChangeform}
       name="telefono"
       type="tel"
       validators={[]}
       errorMessages={[]}
       value={this.state.telefono}
       InputProps={{
        readOnly: this.state.readOnly,
      }}
   />
   
   
   </div>
 
  
   <div className="customInput">
        <div className="jwminilogo">
  <LocationCityIcon/>
</div>
      <TextValidator
      label="Ciudad"
       onChange={this.handleChangeform}
       name="ciudad"
       type="text"
       validators={[]}
       errorMessages={[] }
       value={this.state.ciudad}
       InputProps={{
        readOnly: this.state.readOnly,
      }}
   />
   
   
   </div>
   <div className="customInput">
        <div className="jwminilogo">
   <HouseIcon />
</div>
      <TextValidator
      label="Direccion"
       onChange={this.handleChangeform}
       name="direccion"
       type="text"
       validators={[]}
       errorMessages={[] }
       value={this.state.direccion}
       InputProps={{
        readOnly: this.state.readOnly,
      }}
   />
   
   
   </div>
   <div className="customInput">
        <div className="jwminilogo">
   <PermIdentityIcon/>
</div>
      <TextValidator
      label="Cédula o Ruc"
       onChange={this.handleChangeform}
       name="cedula"
       type="number"
       validators={[]}
       errorMessages={[] }
       value={this.state.cedula}
       InputProps={{
        readOnly: this.state.readOnly,
      }}
   />
   
   
   </div>
   <div className="jwseccionCard buttoncont">

{this.state.readOnly && <button type="" className=" btn btn-primary botonperfil" onClick={()=>{this.setState({readOnly:false})}}>
<p>Editar</p>

<CreateIcon/>

</button>}

{!this.state.readOnly && <div className=" flex-end-jw"  ><button className=" btn btn-success botonperfil" onClick={this.updateUser}>
<p>Aceptar</p>
<CheckCircleOutlineIcon/>

</button></div>}


</div>




   </div>
</ValidatorForm>
<div className="jwseccionCard buttoncont">
  

</div>
   </div>
    )
   }
 }
 const mapStateToProps = state => {
  const usuario = state.userReducerEmarket

  return {usuario}
};


export default connect(mapStateToProps)(PersonalInf)