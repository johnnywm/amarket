import React, { Component } from 'react'
import { Animate } from "react-animate-mount";
import {connect} from 'react-redux';
import {updateOrders} from "../../reduxstore/actions/myact"
import Modal from "../../components/modal"
import Link from "next/link"
import Purdata from "./purchasedata"
import UpgradeIcon from '@mui/icons-material/Upgrade';
import postal from 'postal';
import { CircularProgress } from '@mui/material';
/**
* @author
* @class PersonalInf
**/

class PersonalInf extends Component {
  
 state = { 
  modal:false,
  datos:"",
  loadingUpdate:false,
 }

 channellive = null;

 
 componentDidMount(){
  if(!this.props.state.orderReducer.items) {
 
    this.getOrdenesCompraCliente()

  }else if(this.props.state.orderReducer.items.length == 0) {
    
      this.getOrdenesCompraCliente()
    
  }

 }
 
getOrdenesCompraCliente=()=>{

  var url = 'http://localhost:3000/public/tienda/clienteOrdenes';
  var urldeploy = `${process.env.URL_BACKEND_SERVER}/public/tienda/clienteordenes `
    
  var data = {
    Userdata:{DBname:process.env.EMARKET_DATA_BASE },
    user:{id:this.props.state.userReducerEmarket.update.usuario._id}
   
  }
  var lol = JSON.stringify(data)
  console.log(lol)
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

  }else {
    let ordenes = response.ordenes
    let ventas = response.ventas

    let listaVentasDuplicadas = ordenes.map(x => {
      if(x.estatus.pago.idMongoVenta != ""){
        return x.estatus.pago.idMongoVenta
      }
    })

    let nuevasventas = ventas.filter(x=> !listaVentasDuplicadas.includes(x._id))
    //aqui mesclaremos las ventas ya usadas por el cliente y las ordenes de compra virtuales 
  let ventaseditadas = nuevasventas.map(x=> ({...x,
    carrito:x.articulosVendidos,
    formadePago:x.formasdePago[0].Tipo,
    bancoCliente:"",
    estatus: {
      pago:{EstadoPago:"Concluido",
      estado:true,
      },
    },
        envio:{status:false}
  
  }))

  let nuevasOrdenes = ventaseditadas.concat(ordenes)




   this.props.dispatch(updateOrders({ordenes:nuevasOrdenes}))
   this.setState({loadingUpdate:false})
  }
    
  });
}



modalopen=(e)=>{
let datosparse = JSON.parse(e)
  console.log(datosparse)
  this.setState({datos:datosparse, modal:true})

}

comprasComprobador=()=>{
 
   
    if(this.props.state.orderReducer.items){
let arraycompras = this.props.state.orderReducer.items

      let compras = arraycompras.map((compra, index)=>{
     
     return(<Purdata key={index} compra={compra} modal={this.modalopen}/>)   

       
         
      })

      return(<div className="jwW95percentC" > 
      <div className='jwContFlexCenter contHeaderbuttons '>
        <p className="subtituloArt">Compras Realizadas:</p>
        <div className="contBotonPago">
      <Animate show={this.state.loadingUpdate}>
<CircularProgress />
</Animate>
<Animate show={!this.state.loadingUpdate}>
<div className='buttonUpdate' onClick={()=>{

this.getOrdenesCompraCliente()

}}>
<UpgradeIcon/>
          </div></Animate>



            
                    </div>  
         </div>
         {compras}
         </div>
         )
    }

    else{
      return(<div> 
        <p className="textoArt">No has comprado nada aún</p>
        <div className="jwContFlexCenter">
        <Link href="/tienda"><a > <button className="btn btn-primary"> Compra Aquí</button></a></Link> 
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
 

  return {state}
};


export default connect(mapStateToProps)(PersonalInf)