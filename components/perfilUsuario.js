import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CompoSlider from "./compoSlider"
import {connect} from 'react-redux';
import {logOut} from "../reduxstore/actions/myact"
import Router from "next/router"
import postal from 'postal';
import Modaltel from "../components/modaljw"
import { Animate } from "react-animate-mount";
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
/**
* @author
* @class UserProfile
**/

class UserProfile extends Component {
 state = {
   modaltel:false,
   Coins:0
 }
 channeltel = null;
 channelteloff = null;
componentDidMount(){
  this.channeltel = postal.channel();
  this.channelteloff = postal.channel();

  this.channeltel.subscribe('modaltel', (data) => {
   
    this.setState({modaltel:true})
     
   });
   this.channelteloff.subscribe('modalteloff', (data) => {
   
    this.setState({modaltel:false})
     
   });


let datos = {Id: this.props.datos.usuario._id}

let lol = JSON.stringify(datos)
/*
   fetch("https://iglass.herokuapp.com/users/getusercoins", {
    method: 'POST', // or 'PUT'
    body: lol, // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
   
   this.setState({Coins:response.Coins})
  });
*/
}
 logOut=()=>{
 
 this.props.dispatch(logOut())
 Router.push("/ingreso")
 }
 render() {
   


const usuarioActivate = () =>{
  if(this.props.usuario){
  if(this.props.usuario.Confirmacion){
    return(
      <div className="contVeri">
<p>Verificado</p>
<CheckIcon />
      </div>
    )
  }
  else{
    return(  <div className="contNoVeri">
    <p>No Verificado</p>
   <ErrorIcon />
          </div>)
  }
}
}
    const perfilcondicional = ()=>{
      if(this.props.datos){
        if(this.props.datos.usuario.ImagenP){
         return(this.props.datos.usuario.ImagenP)
        }else{
          return("/static/profile.jpg")
        }

      }
      
    }
    const nombrecondicional = ()=>{
      if(this.props.datos){
        return(this.props.datos.usuario.Usuario)

      }
      
    }
  return(
   <div className="jwSubContainer">
  
<div className="jwCard-style2">
<div className="jwFlex-end" >
     <button className=" btn btn-danger btncuston"  onClick={this.logOut}>
<span>Cerrar sesión</span>
<LogoutIcon/>
</button>
     </div>
     <div className="perfilcont">
     <div className="jwseccionCard">
        <img src={perfilcondicional()} alt="" className="imagenperfil"/>
  <p className="subtituloArt">{nombrecondicional()}</p>
  <div>
      {usuarioActivate()}
    </div>
    </div>
     <div style={{display:"none"}} className="CoinCont ">
<img className="moneda" src="/user/iglassCoin.png"/>
  <div className="numeromoneda">{this.state.Coins}  </div>
 
</div>

     </div>
   
   
    <div className="jwseccionCard full">
        <CompoSlider/>
    </div>
<Animate show={this.state.modaltel}>
<Modaltel />
</Animate>

</div>

<style >{`

.jwFlexStar{
  display: flex;
  justify-content: flex-start;
  width: 100%;
}
.numeromoneda{
  font-family: monospace;
display: flex;
align-items: center;
font-size: 50px;
}
.moneda{
  width: 57%;
  max-width: 226px;
  height: auto;
}
.CoinCont{
padding: 10px;
display: flex;
border: 4px double #c5b819e3;
border-radius: 17px;
justify-content: space-around;
align-items: center;
text-align: center;
width: 40%;
max-width: 200px;
}
.perfilcont{
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
}


.btncuston{
  display:flex;
}
.jwFlex-end{
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
  .contVeri{
    display: flex;
    justify-content: space-around;
    width: 144px;
    border: 2px inset green;
    padding: 3px;
    border-radius: 26px;
    align-items: center;
  }
  .contNoVeri{
    display: flex;
    justify-content: space-around;
    width: 144px;
    border: 2px inset red;
    padding: 3px;
    border-radius: 26px;
    align-items: center;
  }
  .contNoVeri p{
    margin:0
  }
  .contVeri p{
    margin:0
  }
  .green{
    color:green;
    font-size:30px,
  }
  .red{
    color:red;
    font-size: 30px,
  }
  
  `}

</style>
   </div>
    )
   }
 }


 const mapStateToProps = (state, props) =>  {
  let userFind = state.userReducerEmarket.update
 
     return(userFind)
   
      
   };
 export default connect(mapStateToProps, null)(UserProfile)