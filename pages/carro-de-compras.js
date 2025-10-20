import React from 'react';
import {connect} from 'react-redux';
import {formatMoney} from "../reduxstore/pipes/priceFormatter";
import CartItem from "../reduxstore/components/CartItem/CartItem";
import { Animate } from "react-animate-mount";
import Compra from "../components/landingContactPayment"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Head from "next/head"
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';

class ShoppingCart extends React.Component {
    state = {inicial:true,
        compra:false,
        snack:false,
        mounted:false,
        terminos:false,
        Alert:{Estado:false},
}

componentDidMount() {
    this.setState({mounted:true})
}

comprasComprobador=()=>{

    if(this.state.terminos){

   
 
    if(this.props.cartItems.length > 0 ){
        this.setState({compra:true})
  
    }else if(this.props.cartItems.length == 0) {
            let add = {
                Estado:true,
                Tipo:"error",
                Mensaje:"Agregue Productos"
            }
            this.setState({  Alert: add})
           }
        }else{
            let add = {
                Estado:true,
                Tipo:"error",
                Mensaje:"Acepte los Terminos y Condiciones"
            }
            this.setState({  Alert: add}) 
        }
      

}
handleCheckForm=()=>{
    this.setState({terminos:!this.state.terminos})
  }
render() {
console.log(this.props)
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

 const handleClose = (event, reason) => {
      
         this.setState({Alert:{Estado:false},})
        
    }
    return (
    
        <div>
         

         <Animate show={this.state.inicial}>
         <div className="container" style={{paddingTop: '6rem'}}>
<div className="card shopping-cart">
        <div className="card-header bg-dark text-light">
            <i className="fa fa-shopping-cart pr-2" aria-hidden="true"></i>
            Carrito de compras
            <div className="clearfix"></div>
        </div>
        <div className="card-body">
            {this.props.cartItemCount && this.state.mounted? this.props.cartItems.map((cart,i) => {
                let imgrender;
                if(cart.Imagen.length > 0){
                  
                    if(cart.Imagen[0] != ""){
                        imgrender = cart.Imagen[0] 
                    }else{
                        imgrender = "/tienda/portada1.jpg"
                    }
                }
                else{
                    imgrender = "/tienda/portada1.jpg"
                }
                return(<CartItem key={i} {...cart} img={imgrender} />)
            }) : <h1 className="display-4 mt-5 text-center">No hay productos en su carrito</h1> }
        </div>
        <div className="card-footer">
            <div className="pull-right" style={{margin: '10px'}}>
                <div className="pull-right" style={{margin: '5px'}}>
                    Precio productos : <b>${this.state.mounted?this.props.totalPrice.toFixed(2):"" }</b>
                </div>
            </div>
        </div>
    </div>
    <div className="contbotonventa" style={{marginBottom:"100px"}}>
    <div className='centrar custonCondiciones'>
   <Checkbox
   name="condiciones"
        checked={this.state.terminos}
        onChange={this.handleCheckForm}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      /> 
      <span>Acepto los 
                                                    <Link href="/terminos-y-condiciones"><a target="_blank" > Terminos y condiciones<a /></a></Link> </span>
</div>
   
    <button className="botonventa " 
    onClick={this.comprasComprobador}
    >Comprar</button>
    </div>
</div>
</Animate>
<Animate show={this.state.compra}>
    <Compra flechafun ={ ()=>{this.setState({compra:false, inicial:true})}}/>
</Animate>
<Snackbar open={this.state.Alert.Estado} autoHideDuration={5000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={this.state.Alert.Tipo}>
        <p style={{textAlign:"center"}}> {this.state.Alert.Mensaje} </p>
    
    </Alert>
  </Snackbar>
<style >{`
   .custonCondiciones{
    border:1px solid darkblue;
    border-radius:15px;
  }
.contbotonventa{
    margin-top:20px;
display:flex;
justify-content:center;
width:100%;
flex-wrap: wrap;
}
.contTerminos{

}
.botonventa{

margin-top: 17px;
border-radius: 10px;

background-color: #048b0b;
box-shadow: 0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12);
color: #fff;
transition: background-color 15ms linear, box-shadow 280ms cubic-bezier(0.4,0,0.2,1);
height: 36px;
line-height: 2.25rem;
font-family: Roboto,sans-serif;
font-size: 0.875rem;
font-weight: 500;
-webkit-letter-spacing: 0.06em;
-moz-letter-spacing: 0.06em;
-ms-letter-spacing: 0.06em;
letter-spacing: 0.06em;
text-transform: uppercase;
border: none;
width: 40%;
}
    `}</style>


            </ div >
    );
};
}

const mapStateToProps = state => {
let cartItems = state.shop.cart

    return {
        cartItems,
        cartItemCount: cartItems.length,
        totalPrice: state.shop.cart.reduce((count, curItem) => {
            return count + (curItem.Precio_Venta * curItem.CantidadCompra);
        }, 0)
    }
}

export default connect(mapStateToProps, null)(ShoppingCart);
