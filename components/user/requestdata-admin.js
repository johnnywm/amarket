import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {updateRep} from "../../reduxstore/actions/myact"
import {connect} from 'react-redux';
import Modal from "../modal"
import { Animate } from "react-animate-mount";

/**
* @author
* @className purdata
**/

class ReqDataAdmin extends Component {
 state = {carritoimagen:this.props.compra.Imagen[0],


  
    artSelect:0,
detalles:false
}

componentDidMount(){

}

uploadRep=(e)=>{
  

  var data = {Solicitud: this.props.compra.solicitudNumero,

    Estado:e.estado}

let stingdata = JSON.stringify(data)
console.log(stingdata)
const options = {
method: 'PUT',
body: stingdata,

 headers: {
   'Content-Type': 'application/json',
 }
}

fetch('https://iglass.herokuapp.com/admin/orderdata/updateRep', options).then(response => response.json())
.then(success => {
console.log(success)
let indextoRemplace = this.props.estado.requestReducer.items.findIndex((item,i)=>(item.solicitudNumero === success.solicitud.solicitudNumero))

let soli = this.props.estado.requestReducer.items 

soli[indextoRemplace] = success.solicitud
console.log(soli)
this.props.dispatch(updateRep(soli))
})
.catch(error => console.log(error)
);

let datatomail = {Solicitud:this.props.compra.solicitudNumero,
  mail:this.props.compra.correoCliente,
estado:e.estado}

let stringmail =  JSON.stringify(datatomail);
const optionsmail = {
method: 'POST',
body: stringmail,

headers: {
'Content-Type': 'application/json',
}
}
fetch('https://iglass.herokuapp.com/admin/mailtoclientrep', optionsmail).then(response => response.json())
.then(success => {
console.log(success)

})
.catch(error => console.log(error)
);

var datatoupdate = {
  Id:this.props.compra.idCliente,
  Solicitud:this.props.compra.solicitudNumero,
  Estado: e.estado}

  let dataupdateString = JSON.stringify(datatoupdate )
  const urlpay = "/users/updaterep"

  fetch(urlpay, {
    method: 'PUT', // or 'PUT'
    body: dataupdateString  , // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
    console.log('Success userupdate:', response)

    console.log(response)
    const datos = {usuario:response.user, actualizacion: data}
    this.socket.emit('datosUser', datos)

  });
}
 clickArt=(e)=>{

    this.setState({artSelect:e.i, carritoimagen:e.producto.images[0]})

   
   
   }
   handleContinue=(e)=>{


    console.log(e.target.id)
    

    this.props.modal(e.target.id)
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
    <p>Nº{this.props.compra.solicitudNumero}</p>
        </div >
        <div className="contCompraPrincipal">
        <div className="contDatos" style={{width:"90%", fontSize:"13px"}}>
        <div className="jwClave">Fecha y hora:</div>
    <div className="jwValor">{this.props.compra.timestamp}</div>
              
      </div>
        <div className="contTitulo">
          <div className="contTituloSub1">
      <div className="jwClave">Estado de  Solicitud:</div>
    
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

     <div className="jwPaper custompaper">
       <div className="botonespago">
      
    <p>Botones Estado de Solicitud</p>
    <div>
    <button className="btn btn-warning" onClick={()=>{this.uploadRep({estado:"Revicion-rep"})}}>Revicion</button>
    <button className="btn btn-danger"  onClick={()=>{this.uploadRep({estado:"No-disponible"})}}>No Disponible</button>
    <button className="btn btn-success"  onClick={()=>{this.uploadRep({estado:"Disponible"})}}>Disponible</button>

    </div>
    </div>
     </div>
     <span className="barraprin">  </span>

     <div className="contDatos">
        <div className="jwClave">Nombre:</div>
    <div className="jwValor">{this.props.compra.nombreCliente}</div>
              
      </div>
      <div className="contDatos">
        <div className="jwClave">Correo:</div>
    <div className="jwValor">{this.props.compra.correoCliente}</div>
              
      </div>
      <div className="contDatos">
        <div className="jwClave">Telefono:</div>
    <div className="jwValor">{this.props.compra.telefonoCliente}</div>
              
      </div>
      <span className="barraprin">  </span>


     <div style={{  padding: "0px 5px",  display: "flex", justifyContent:"center", width:"100%"
    }
    
    }
    
     >
          <div className="contenedorDatosPrincipales">
      
     <div className="contDatosP">
      <div className="jwClave">Articulos:</div>
    
    <div className="jwValor"><ul className="ulart">{producs}</ul> </div>
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
     
    </div>
    
    
      </div>
     
  
      <style >
        {`
        .botonespago{
          display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
        }
        .botonespago div{
          display: flex;
    justify-content: space-around;

    flex-wrap: wrap;
        }
        .botonespago button{
         margin:5px;
    
        }
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
    .custompaper{
      width: 100%;
    justify-content: center;
    display: flex;
    margin: 15px;
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
  const estado = state

  return {estado}
};


export default connect(mapStateToProps)(ReqDataAdmin)

  
  
