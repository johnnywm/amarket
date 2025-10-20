import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Tarjetas from "../tarjetas"
import { Animate } from "react-animate-mount";
import {connect} from 'react-redux';
import TarjetaInput from"../tarjetagenerate"
import {updateUser} from "../../reduxstore/actions/myact"
/**
* @author
* @class PersonalInf
**/

class PersonalCard extends Component {
 state = { 
      
     cvc: '',
     expiry: '',
     focus: '',
     name: '',
     number: '',
     edicion:false,
 }

 handleChangeform=(e)=>{
  this.setState({
      [e.target.name] : e.target.value
  })
   }
updateUser=()=>{
  this.setState({edicion:false})
  
  var url = 'https://iglass.herokuapp.com/users/update';  
  var data = {
    Id:this.props.usuario.update.usuario._id,
    Tarjetas:[{
    TarjetaNombre:this.state.name,
    TarjetaNumero:this.state.number,
    TarjetaExpira:this.state.expiry,
    TarjetaCVC:this.state.cvc
 
  }]
           
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

capturador=(name, value)=>{
  this.setState({
    [name] : value
})

}
   
 render() {
  
    const valueReturn = ()=>{
        if(this.props.usuario.update.usuario.Tarjetas.length > 0){
            return(<div className="jwseccionCard">

              <Animate show={!this.state.edicion}>
              <p className="subtituloArt">Tu tarjeta registrada es:</p>
<TarjetaInput cardData={this.props.usuario.update.usuario.Tarjetas[0]}/>
<div className="jwseccionCard buttoncont">
<button type="" className=" btn btn-primary botonperfil" onClick={()=>{this.setState({edicion:true})}}>
<p>Editar</p>

<span className="material-icons">
create
</span>

</button>
</div>
</Animate>
<Animate show={this.state.edicion}>
<div className="jwseccionCard ">
<p className="subtituloArt">Modifica tu tarjeta</p>
<Tarjetas stateCapture={this.capturador}/>
</div>
<div className="jwseccionCard buttoncont">
<div className=" flex-end-jw"  ><button className=" btn btn-success botonperfil" onClick={this.updateUser}>
<p>Aceptar</p>
<span className="material-icons">
check_circle_outline
</span>

</button></div>

</div>
</Animate>



            </div>)

        }
        else{
            return(<div className="jwseccionCard" > 
                      
            <Animate show={!this.state.addCard}>
          <p>No tienes tarjetas</p>
          <button className="btn btn-primary" onClick={()=>{this.setState({addCard:true})}}>Agregala </button>
          </Animate>
         
           
            <div className="jwseccionCard">
            <Animate show={this.state.addCard}>
            <p>Agrega tu tarjeta</p>
            <Tarjetas stateCapture={this.capturador}/>
          <div className=" flex-end-jw"  >
            <button className=" btn btn-success" onClick={this.updateUser} >
<span className="material-icons">
check_circle_outline
</span>

</button></div>
            </Animate>

            </div>
            </div>)
        }
    }
   
    console.log("en tarjetas")
  return(
   <div  className="jwPaper jwW100percent">
{valueReturn()}
   </div>
    )
   }
 }

 const mapStateToProps = state => {
  const usuario = state.userReducerEmarket

  return {usuario}
};

export default connect(mapStateToProps)(PersonalCard)