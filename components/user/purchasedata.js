import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { Convertidor } from '../reusable/convertidorFecha';
import { CircularProgress } from '@mui/material';
import { Animate } from "react-animate-mount";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HttpsIcon from '@mui/icons-material/Https';
import StoreIcon from '@mui/icons-material/Store';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

import { updateOrders } from '../../reduxstore/actions/myact';
/**
* @author
* @class purdata
**/

class purdata extends Component {
 state = {
  carritoimagen:this.props.compra.carrito[0].Imagen[0],
    artSelect:0,
detalles:false,
loadingUpdate:false
}

 clickArt=(e)=>{

    this.setState({artSelect:e.i, carritoimagen:e.producto.Imagen[0]})

   
   
   }
   updateButton=()=>{
    this.setState({loadingUpdate:true})
   
    var url = 'http://localhost:3000/public/tienda/getUptadeOrder';
    var urldeploy = `${process.env.URL_BACKEND_SERVER}/public/tienda/getUptadeOrder`
      
    var data = {
      Userdata:{DBname:process.env.EMARKET_DATA_BASE },
      idCompra:this.props.compra._id
     
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
      console.log('Res OrdenCompra Cliente:', response)
    if(response.status == "Error"){
  alert("error en el la solicitud")
  this.setState({loadingUpdate:false})
    }else {
           

      let ordenes = this.props.state.orderReducer.items
  
      let indextoRemplace = ordenes.findIndex((item,i)=>(item._id === response.orden._id))
      
      ordenes[indextoRemplace] = response.orden
    
     this.props.dispatch(updateOrders({ordenes}))
     this.setState({loadingUpdate:false})
    }
      
    });
  }
   handleContinue=(e)=>{


    console.log(e.target.id)
    

    this.props.modal(e.target.id)
    }
    componentDidMount(){
   
    }
 render() {

  let fechaDate = Convertidor(this.props.compra.tiempo)
     console.log(this.props)
     
    const coloresPago = this.props.compra.estatus.pago.EstadoPago === "default"?"redEnf":
    this.props.compra.estatus.pago.EstadoPago === "Pagado"?"yellowEnf":
    this.props.compra.estatus.pago.EstadoPago === "Concluido"?"greenEnf":
    this.props.compra.estatus.pago.EstadoPago === "Revision-de-pago"?"orangeEnf":
    this.props.compra.estatus.pago.EstadoPago === "Revicion_Cliente"?"cianEnf":
    ""
const coloresCarrito = this.props.compra.estatus.pago.EstadoPago === "default"?"carritorojo":
this.props.compra.estatus.pago.EstadoPago === "Pagado"?"carritoamarillo":
this.props.compra.estatus.pago.EstadoPago === "Concluido"?"carritoverde":
this.props.compra.estatus.pago.EstadoPago === "Revision-de-pago"?"carritotomate":
this.props.compra.estatus.pago.EstadoPago=== "Revicion_Cliente"?"carritocian":
    ""

    const producs = this.props.compra.carrito.map((producto, i)=>{

       let defa = i === this.state.artSelect ?"estiloSeleccionado":""


          if(this.props.compra.carrito.length > 1){
            return(<button  key={i} className={`artClick ${defa} `}
            onClick={()=>{this.clickArt({producto, i})}}
            >
              
              {producto.Titulo}
              </button>)
          }

else{        return(<button  key={i} className={`artClick  `}
onClick={()=>{this.clickArt({producto, i})}}
>
  
  {producto.Titulo}
  </button>)
           }
       })

console.log()

let titulocondicional = this.props.compra.articulosVendidos ? <div className='jwContFlexCenter'>
 <StoreIcon/>
<p>Nº{this.props.compra.iDVenta}</p>
</div>  :
<div className='jwContFlexCenter'>
<div className="contBotonPago">
      <Animate show={this.state.loadingUpdate}>
<CircularProgress />
</Animate>
<Animate show={!this.state.loadingUpdate}>
<div className='buttonUpdate' onClick={this.updateButton}>
<UpgradeIcon/>
          </div></Animate>



            
                    </div>  
  
                    <ShoppingCartIcon/>
<p>Nº{this.props.compra.carritoNumero}</p>
</div>  

let tipoCompraCondicional =this.props.compra.articulosVendidos ?"Compra en Punto de venta":"Compra en Tienda Virtual"

let valorTotalCondicional =this.props.compra.articulosVendidos ?this.props.compra.PrecioCompraTotal:this.props.compra.valorFinal


    return(

        <div className={`contCompra ${coloresPago}`}>
        <div className={`contCarrito ${coloresCarrito}`}>
       
         
      {titulocondicional}
        </div >
        <div className="contCompraPrincipal">
          <div className='contDual'>
          <div className="contTituloSub1">
      <div className="jwClave">Fecha:</div>
      <p>{fechaDate}</p>
      </div>
      <div className="contTituloSub1">
      <div className="jwClave">{tipoCompraCondicional}</div>
      </div>
          </div>
        <div className="contTitulo">
          <div className="contTituloSub1">
      <div className="jwClave">Estado:</div>
    
    <div className="jwValorimg">
    
    {this.props.compra.estatus.pago.EstadoPago ==="default"?<MoneyOffIcon/>:
                            this.props.compra.estatus.pago.EstadoPago ==="Pagado"?<MonetizationOnIcon/>:
                            
                            this.props.compra.estatus.pago.EstadoPago ==="Revision-de-pago"?<ZoomInIcon/>: 
    
    this.props.compra.estatus.pago.EstadoPago ==="Concluido"?<ThumbUpAltIcon/>:   
                                 
                                 this.props.compra.estatus.pago.EstadoPago ==="Revicion_Cliente"?<HourglassFullIcon/>:   
                                 "" 
    }
       {this.props.compra.estatus.pago.EstadoPago ==="default"?"Por pagar":
                            this.props.compra.estatus.pago.EstadoPago ==="Pagado"?"Pagado":
                            this.props.compra.estatus.pago.EstadoPago ==="Revision-de-pago"?"Revisión de pago":
                            this.props.compra.estatus.pago.EstadoPago ==="Concluido"?"Concluido":
                            this.props.compra.estatus.pago.EstadoPago ==="Revicion_Cliente"?"Orden en Revisión":
                           ""       }
                            
    </div>
     </div>
    
     {this.props.compra.Envio &&  <div className="contTituloSub1">
      <div className="jwClave">Estado de envío:</div>
    
    <div className="jwValorimg">
    
    {this.props.compra.estatus.pago.EstadoPago ==="default"?<HourglassEmptyIcon/>:
                            this.props.compra.estatus.pago.EstadoPago ==="Pagado"?
                           <LocalShippingIcon/>:
                            
                            this.props.compra.estatus.pago.EstadoPago ==="Revision-de-pago"?<HourglassFullIcon/>:         
                                this.props.compra.estatus.pago.EstadoPago ==="Concluido"?<ThumbUpAltIcon/>:  
                                                    
                                this.props.compra.estatus.pago.EstadoPago ==="Revicion_Cliente"?<HourglassFullIcon/>:   
                                 ""  
                            
                            }
    
       {this.props.compra.estatus.pago.EstadoPago ==="default"?"Esperando confirmación":
                            this.props.compra.estatus.pago.EstadoPago ==="Pagado"?"Realizado":
                            this.props.compra.estatus.pago.EstadoPago ==="Revision-de-pago"?"Revisión de pago":         
                            this.props.compra.estatus.pago.EstadoPago ==="Concluido"?"Concluido": 
                            this.props.compra.estatus.pago.EstadoPago ==="Revicion_Cliente"?"Orden en Revisión":   ""  } 
    </div>
     </div>
     }
      {this.props.compra.Envio === false &&  <div className="contTituloSub1">
      <div className="jwClave">Estado de reserva:</div>
    
    <div className="jwValorimg">
    
    {this.props.compra.estatus.pago.EstadoPago ==="default"?<LockOpenIcon/>:
                            this.props.compra.estatus.pago.EstadoPago ==="Pagado"?<HttpsIcon/>:
                            
                            this.props.compra.estatus.pago.EstadoPago ==="Revision-de-pago"?<HttpsIcon/>:         
                               this.props.compra.estatus.pago.EstadoPago ==="Concluido"?<ThumbUpAltIcon/>: 
                                  this.props.compra.estatus.pago.EstadoPago ==="Revicion_Cliente"?<HourglassFullIcon/>: 
                                 ""  
                            
                            }
    
       {this.props.compra.estatus.pago.EstadoPago ==="default"?"Esperando confirmación":
                            this.props.compra.estatus.pago.EstadoPago ==="Pagado"?"Reservado":
                            this.props.compra.estatus.pago.EstadoPago ==="Revision-de-pago"?"Revisión de pago":         
                            this.props.compra.estatus.pago.EstadoPago ==="Concluido"?"Concluido":  
                            this.props.compra.estatus.pago.EstadoPago ==="Revicion_Cliente"?"Revisión de orden":
                            ""  } 
    </div>
     </div>
     }
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
    <div className="jwValor">${valorTotalCondicional}</div>
     </div>
     </div>
     <div className="contimagen">
       <img src={this.state.carritoimagen} alt="producto"/>
     </div>
     </div>
     <div className="jwW100percent">
     <Animate show ={!this.state.detalles } >
     <div className="jwW100percentC2 contbotonesduales" >
    <button className="btn btn-primary" onClick={()=>{this.setState({detalles:true})}}>Mas detalles</button>
    {this.props.compra.estatus.pago.EstadoPago === "default" ?   <button id={JSON.stringify(this.props.compra)}  className="btn btn-success"  onClick={this.handleContinue}>Continuar compra</button>:""}
    {this.props.compra.estatus.pago.EstadoPago === "Pagado" ?   <button id={JSON.stringify(this.props.compra)}  className="btn btn-success"  onClick={this.handleContinue}>Estado de compra</button>:""}
    {this.props.compra.estatus.pago.EstadoPago === "Revision-de-pago" ?   <button id={JSON.stringify(this.props.compra)}  className="btn btn-success"  onClick={this.handleContinue}>Estado de compra</button>:""}
  
    </div>
    <div className="problemcont">
    

    </div>
    </Animate>
    </div>
    
    
      </div>
     
      <Animate show ={this.state.detalles}>
      <div className="subContCompra">
      <div className="contDatos">
      <div className="jwClave">Entrega:</div>
      <Animate show={this.props.compra.envio.status}> 
      <div className="jwValor">Envio a domicilio</div>
      </Animate>
      <Animate show={!this.props.compra.envio.status }> 
      <div className="jwValor">Retiro en Tienda</div>
      </Animate>
      </div>
      <div className="contDatos">
      <div className="jwClave">Forma de Pago:</div>
      <div className="jwValor">{this.props.compra.formadePago}</div>
      </div>
     
      {this.props.compra.formadePago === "Transferencia" && <div className="contDatos">
                <div className="jwClave">Banco:</div>
    <div className="jwValor">{this.props.compra.bancoCliente}</div>
    </div> }

     {this.props.compra.Envio && <div className="CondicionalCont"><div className="contDatos">
        <div className="jwClave">Ciudad:</div>
    <div className="jwValor">{this.props.compra.Ciudad}</div>
              
      </div>
      <div className="contDatos">
        <div className="jwClave">Direccion:</div>
    <div className="jwValor">{this.props.compra.Direccion}</div>
              
      </div>
      </div>}
       
      {this.props.compra.Pago === "Tarjeta" && <div className="CondicionalCont"><div className="contDatos">
      <div className="jwClave">Tarjeta Nombre:</div>
    <div className="jwValor">{this.props.compra.tarjetaNombre}</div>
              
      </div>
      <div className="contDatos">
      <div className="jwClave">Tarjeta Numero:</div>
    <div className="jwValor">{this.props.compra.tarjetaNumero?this.props.compra.tarjetaNumero.substring(0,4)+"-XXXX-XXXX-XXXX":""}</div>
              
      </div>
      </div>}
    
       
       
      
       
    {this.props.compra.Pago === "Transferencia" && <div className="contDatos">
                <div className="jwClave">Banco:</div>
    <div className="jwValor">{this.props.compra.Banco}</div>
    </div> }
     
       
    
       
          
       
    
       
     
    
    
      <div className="jwW100percent">
     <Animate show ={this.state.detalles } >
     <div className="jwW100percentC2 contbotonesduales" >
    <button className="btn btn-primary" onClick={()=>{this.setState({detalles:false})}}>Menos detalles</button>
    {this.props.compra.estatus.pago.EstadoPago === "default" ?   <button id={JSON.stringify(this.props.compra)}  className="btn btn-success"  onClick={this.handleContinue}>Continuar compra</button>:""}
    {this.props.compra.estatus.pago.EstadoPago === "Pagado" ?   <button id={JSON.stringify(this.props.compra)}  className="btn btn-success"  onClick={this.handleContinue}>Estado de compra</button>:""}
    {this.props.compra.estatus.pago.EstadoPago === "Revision-de-pago" ?   <button id={JSON.stringify(this.props.compra)}  className="btn btn-warning"  onClick={this.handleContinue}>Estado de compra</button>:""}
    {this.props.compra.estatus.pago.EstadoPago === "Concluido" ?   <button id={JSON.stringify(this.props.compra)}  className="btn btn-danger"  onClick={this.handleContinue}>Reportar Problema</button>:""}
    </div>
    
    </Animate>
    </div>
      </div>
      </Animate>
    
      <style >
        {`
        .buttonUpdate{
              display: flex;
    margin: 10px;
    border: 1px solid;
    border-radius: 50%;
    padding: 3px;
    align-items: center;
    background: white;
    border-bottom: 2px solid;
    cursor: pointer
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
    .contDual{
      display:flex;
      align-items: center;
      width: 100%;
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
    .carritocian{
      background-color: darkcyan;
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
        .cianEnf{
          border: 1px solid darkcyan;box-shadow: 0px -1px 11px -1px darkcyan;
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
      height:30px;
      align-items: center;
      justify-content: center;
 
    font-size: 20px;
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

  
    return {state}
  };
  
  
  export default connect(mapStateToProps)(purdata)