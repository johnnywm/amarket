import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {updateUser} from "../../reduxstore/actions/myact"
import Modal from "../../components/modal"
import { Animate } from "react-animate-mount";
/**
* @author
* @class purdata
**/

class Reqdata extends Component {
 state = {carritoimagen:this.props.compra.Imagen[0],

    artSelect:0,
detalles:false
}

   handleContinue=(e)=>{


   
    

    this.props.modal(e)
    }
 render() {
     
    const coloresPago = this.props.compra.Estatus === "No disponible"?"redEnf":
    this.props.compra.Estatus === "Por realizar"?"yellowEnf":
    this.props.compra.Estatus === "Disponible"?"greenEnf":
    this.props.compra.Estatus === "Revicion"?"orangeEnf":
    ""
const coloresCarrito = this.props.compra.Estatus === "No disponible"?"carritorojo":
this.props.compra.Estatus === "Por realizar"?"carritoamarillo":
this.props.compra.Estatus === "Disponible"?"carritoverde":
this.props.compra.Estatus === "Revicion"?"carritotomate":
    ""

    const producs = this.props.compra.Repuesto
           


console.log()

    return(

        <div className={`contCompra ${coloresPago}`}>
        <div className={`contCarrito ${coloresCarrito}`}>
        <span className="material-icons" style={{fontSize:"35px"}}>
        devices_other
    </span>
    <p>Nº{this.props.compra.SolicitudNumero}</p>
        </div >
        <div className="contCompraPrincipal">
        <div className="contTitulo">
          <div className="contTituloSub1">
      <div className="jwClave">Estado de Solicitud:</div>
    
    <div className="jwValorimg">
    
    {this.props.compra.Estatus ==="Por realizar"?<span className="material-icons">
                                                 hourglass_empty
                                                    </span>:
                            this.props.compra.Estatus ==="Disponible"?<span className="material-icons">
                              thumb_up_alt
                            </span>:
                            
                            this.props.compra.Estatus ==="No disponible"?<span className="material-icons">
                        error_outline
                            </span>: 
    
    this.props.compra.Estatus ==="Concluido"?<span className="material-icons">
                            
                                 </span>:  
                                 this.props.compra.Estatus ==="Revicion"?<span className="material-icons">
                                 hourglass_full
                                      </span>: 
                                 "" 
    }
       {this.props.compra.Estatus ==="Por realizar"?"En espera":
                            this.props.compra.Estatus ==="Disponible"?"Disponible":
                            this.props.compra.Estatus ==="No disponible"?"No disponible":
                            this.props.compra.Estatus ==="Revicion"?"Revicion":
                            ""       }
                            
    </div>
     </div>
    
   
     
     </div>
     <span className="barraprin">  </span>
     <div style={{  padding: "0px 5px",  display: "flex", justifyContent:"center", width:"100%"
    }
    
    }
    
     >
          <div className="contenedorDatosPrincipales">
      
     <div className="contDatosP">
      <div className="jwClave">Repuesto:</div>
    
    <div className="jwValor">
      {producs}
    
     </div>
     </div>
     <div className="contDatosP">
      <div className="jwClave">Modelo:</div>
    
    <div className="jwValor">
      {this.props.compra.Modelo.replace("-"," ")}
    
     </div>
     </div>
    
    {this.props.compra.Color !== "false" &&  <div className="contDatosP">
      <div className="jwClave">Color:</div>
    
    <div className="jwValor">
      {this.props.compra.Color}
    
     </div>
     </div>
     }
    <div className="contDatosP">
     <div className="jwClave">Instalación:</div>
    <div className="jwValor">Incluida</div>
     </div>
     <div className="contDatosP">
     <div className="jwClave">Precio Final:</div>
    <div className="jwValor">${this.props.compra.Precio}</div>
     </div>
     </div>
     <div className="contimagen">
       <img src={`/${this.state.carritoimagen}`} alt="producto"/>
     </div>
     </div>
     <div className="jwW100percent">
  
     <div className="jwW100percentC2 contbotonesduales" >
  
    {this.props.compra.Estatus === "Por realizar" ?   <button  className="btn btn-success"  onClick={()=>{this.handleContinue(this.props.compra)}}>Estado de Solicitud</button>:""}
    {this.props.compra.Estatus === "Disponible" ?   <button className="btn btn-success"  onClick={()=>{this.handleContinue(this.props.compra)}}>Estado de Solicitud</button>:""}
    {this.props.compra.Estatus === "No disponible" ?   <button  className="btn btn-success"  onClick={()=>{this.handleContinue(this.props.compra)}}>Estado de Solicitud </button>:""}

    </div>
    <div className="problemcont">
    
    {this.props.compra.Estatus === "Concluido" ?   <button  className=" btn btn-danger btnproblem"  onClick={()=>{this.handleContinue(this.props.compra)}}>
      
      
  !</button>:""}
    </div>
  
    </div>
    
    
      </div>
     
     
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
          padding-left: 15px;
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
    .btnproblem{
      border-radius: 50%;
    display: flex;

    margin-right: 6px;
 
    font-size: 23px;
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

    .problemcont{
      display: flex;
    justify-content: flex-end;
    }
    }
    
        `}</style>
      
    
        </div>)
      
    
    
  
   }
 }




const mapStateToProps = state => {
    const usuario = state.userReducerEmarket
  
    return {usuario}
  };
  
  
  export default connect(mapStateToProps)(Reqdata)