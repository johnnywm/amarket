import React, { Component } from 'react'
import { Animate } from "react-animate-mount";
import {connect} from 'react-redux';
import {updateUser} from "../../reduxstore/actions/myact"
import Modal from "../../components/modalrep"
import Link from "next/link"
import Reqdata from "./requestdata"

/**
* @author
* @class PersonalInf
**/

class RequestInf extends Component {
  
 state = { 
  modal:false,
  datos:""
 }



 
 componentDidMount(){

 }
 
updateUser=()=>{
 
  this.setState({readOnly:true})
  var url = 'https://iglass.herokuapp.com/users/update';  
  var data = {Id: this.state.id,
              Usuario:this.state.usuario,
              Telefono:this.state.telefono,
              Email:this.state.correo,
              ModeloTel:this.state.modelo,
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



modalopen=(e)=>{

  this.setState({datos:e, modal:true})

}

comprasComprobador=()=>{
 
    
    if(this.props.usuario.update.usuario.SolicitudR.length > 0){
let arraycompras = this.props.usuario.update.usuario.SolicitudR

      let compras = arraycompras.map((comprau, index)=>{
     
     return(<Reqdata key={index} compra={comprau} modal={this.modalopen}/>)   

       
         
      })

      return(<div className="jwW95percentC" > 
        <p className="subtituloArt">Repuestos Solicitados:</p>
        {compras}
         </div>)
    }

    else{
      return(<div> 
        <p className="textoArt">Aun no solicitas un repuesto.</p>
        <div className="jwContFlexCenter">
        <Link href="/reparacion"><a > <button className="btn btn-primary"> Repara Aquí</button></a></Link> 
          </div> 
        
         </div>)
    }


}
   
 render() {
   console.log(this.state)
   
  return(
   <div className="jwPaper jwW100percent">
    <div className="jwseccionCard">
      {this.comprasComprobador()}
    </div>
   
    <Animate show={this.state.modal}>
    <Modal flechafun={()=>{this.setState({modal:false})}} compra={this.state.datos}/>
    </Animate>
    <style >
    {`
    .barraprin{
      width: 90%;
    margin-left: 5%;
    color: green;
    background-color: #007bff;
    height: 1px;
    box-shadow: 0px 3px 4px black;
    border-radius: 24px;
    margin-top: 10px;
    margin-bottom: 10px;
    }
    .ulart{
     padding:0
    }
    .contenedorDatosPrincipales{
      width: 50%;
    }
    .contDatosP{
      width:100%;
      margin: 22px 0px;
    }
    .contimagen{
      display: flex;
    width: 50%;
    justify-content: center;
    align-items: center;
    }
    .contimagen img{
      width: 86%;
    margin: 10px;
    max-width:150px;
    height: 200px;
    }
    .jwW95percentC{
  width: 95%;
  
}
.jwW45percent{
  width: 45%;
}
.jwW100percentC{
  width: 100%;
  display:flex;
}
.jwW100percent{
  width: 100%;

}
.jwW100percentC2{
  width: 100%;
  display:flex;
  justify-content:center;
  align-items:center
}
.contbotonesduales{
  margin: 15px 0px;
  display:flex;
  justify-content:space-around
}
.contTitulo{
  display: flex;
    width: 100%;
    margin-top: 20px;

    border-radius: 10px;
    padding: 5px;
    justify-content: space-around;
    align-items: center;}
.contCarrito{
 
    border-radius: 14px 14px 0px 0px;
    display: flex;
    justify-content: flex-end;
  
    padding-right: 11px;
    padding-top: 16px;
  
    font-size: 25px;
    align-items: center;
}
.carritorojo{
  background-color: #ff8080;
}
.carritotomate{
  background-color: orange;
}
.carritoamarillo{
  background-color: #ffffbb;
}
.carritoverde{
  background-color: lightgreen;
}
.contCarrito p{
  margin:0
}
.contCarrito span{
  font-size:25px
}
    .contCompra{
      display: flex;
   
    padding-bottom: 24px;
    flex-flow: column;
 
    border-radius: 16px;
    margin: 20px 0px;
    }
    .redEnf{
      border: 1px solid red;box-shadow: 0px -1px 11px -1px red;
    }
    .orangeEnf{
      border: 1px solid orange;box-shadow: 0px -1px 11px -1px orange;
    }
    .yellowEnf{
      border: 1px solid #ffe074;box-shadow: 0px -1px 11px -1px yellow;
    }
    .greenEnf{
      border: 1px solid green;box-shadow: 0px -1px 11px -1px green;
}
    .contCompraPrincipal{
      text-align: left;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    }
    .CondicionalCont{
      width: 100%;
    display: flex;
    }
    .subContCompra{
      text-align: left;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    }

    .contDatos{
      margin: 22px 0px 15px 15px;
      width: 45%;
    }
    .jwClave{
      font-size: 20px;
    font-weight: bold;
    }
    .jwValorimg{
      display: flex;
    justify-content: space-around;
    margin-top: 5px;
    padding: 0px 12px;
    }
.contTituloSub1{
  margin: 5px;
 
    text-align: center;
    box-shadow: 0px 3px 3px grey;
    padding: 4px;
    border-radius: 12px;
}
.artClick {
  list-style: none;
    padding: 7px;
    margin: 5px 0px;
    border-radius: 9px;
    font-size: 15px;
}
.estiloSeleccionado{
  background-color: #a6ccf5;
    box-shadow: 0px 2px 2px black;
    transition: 1s;
}
}

    `}</style>
  
   </div>
    )
   }
 }
 const mapStateToProps = state => {
  const usuario = state.userReducerEmarket

  return {usuario}
};


export default connect(mapStateToProps)(RequestInf)