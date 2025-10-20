import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link'
import {formatMoney} from "../../pipes/priceFormatter";
import {cumulativeOffSet} from "../../utilities/cumulativeOffset";
import Router from 'next/router';

import SlideDots from "../SlideDots/SlideDots";
import {addProductToCart} from "../../actions/";
import Snackbar from '@mui/material/Snackbar';

import postal from 'postal';

class Product extends Component{

   
state={

dotstoRender:3,
imgtoRender:"/static/profile.jpg" ,
Agregado:false,
Repetido:false,
aItem:0,
}
channel = postal.channel();

componentDidMount(){
    if(this.props.producto.Imagen.length > 0){
    this.setState({imgtoRender:this.props.producto.Imagen[0]})
    }

}

componentWillMount(){
    this.setState({imgtoRender:"/static/profile.jpg"})
    console.log("desmontado")
}

render(){
    console.log(this.state)
    const {
        _id,
        Categoria,
        Departamento,
        Titulo,
        Marca,
        Calidad,
        Color,
        Precio_Venta,
        Precio_Alt,
          Garantia,
        Imagen,
        Modelos,
        MiniDescrip

    } = this.props.producto;




 

    const imageRef = React.createRef();

    const handleClose = (event, reason) => {
        setAgregado(false)
        setRepetido(false)
        
          }
          const Alert = React.forwardRef(function Alert(props, ref) {
            return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
          });
    
     const handleImageChange = (e) => {
    
            let  clientX;
    
            if(e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
            } else {
                clientX = e.clientX;
            }
    
            const currentX = clientX - cumulativeOffSet(imageRef.current).left;
    
            // console.dir(imageRef.current);
    
            const part = imageRef.current.clientWidth / Imagen.length;
           // console.log(Math.ceil(currentX / part) - 1);
    
            let imgIndex = Math.ceil(currentX / part) - 1;
            if (imgIndex < 0) {
                imgIndex = 0;
            }
    
            if (imgIndex >= Imagen.length) {
                imgIndex = Imagen.length - 1;
            }
            setAItem(imgIndex);
            setImg(Imagen[imgIndex]);
        };
    
        const handleMouseOut = (e) => {
            setImg(Imagen[0]);
            setAItem(0);
        };
    
        const changeImage = (i) => {
            setImg(Imagen[i]);
            setAItem(i);
        }
    
        const handleRoot = ()=>{
    
            const as = `/tienda/${_id}`;
        Router.push(`/tienda/[articulo]/`,as)
        }
    
        const handleCarrito=()=> {
            const audioEl = document.getElementsByClassName("audio-element")[0]
            audioEl.volume = 0.4
            const agregador=()=>{
                audioEl.play()
                props.dispatch(addProductToCart({...props.producto}))
               setAgregado(true)
              }
            if(props.cart.length > 0){
              
                let comprobadorRep = false
           
                for (var i = 0; i < props.cart.length; i++) {
                    if( props.cart[i]._id === _id){
                        setRepetido(true);
                        comprobadorRep = true;
                    }
                   }
      
                if(comprobadorRep === false){
                    console.log("el comprobador es false")
                    agregador()
                }
    
            
            }
            else{
      
                agregador()
            }
    
    
    
          
          }

   


    return (
        <div className="card  product">
          
          <img
                onMouseMove={handleImageChange}
                onMouseOut={handleMouseOut}
                onTouchMove={handleImageChange}
                onTouchEnd={handleMouseOut}
                className="card-img-top product__img" src={ this.state.imgtoRender} alt={Titulo} ref={imageRef}/>
                
                <SlideDots len={this.state.dotstoRender} activeItem={this.state.aItem} changeItem={changeImage}/>
         
            <div className=" product__text">
                <h4 className="card-title product__title">
                <div className="jwContFlexCenter">
    <div className="tituloProduct" onClick={handleRoot}>{Titulo}</div>
    </div>
                </h4>
                <h5 className="product__price">${formatMoney(Precio_Venta)}</h5>
                <p className="card-text product__description">{MiniDescrip}</p>
               <div className="jwContFlexCenter">
                <button
                   onClick={handleCarrito}
                    className="btn btn-info product__add-to-cart">Añadir al carrito
                </button>
                </div>
            
            </div>

  <audio className="audio-element">
          <source src="/static/sonido/chime.wav"></source>
        </audio>
        <Snackbar open={this.state.Agregado} autoHideDuration={3000} onClose={handleClose}>
    <Alert onClose={handleClose}  severity="success">
        <p style={{textAlign:"center"}}>Se agrego un producto a tu Carrito</p>
    
    </Alert>
  </Snackbar>
  <Snackbar open={this.state.Repetido} autoHideDuration={3000} onClose={handleClose} >
    <Alert onClose={handleClose}  severity="info">
        <p style={{textAlign:"center"}}>El producto esta  <span style={{fontWeight:"bolder"}} >repetido</span>. Click en el <span style={{fontWeight:"bolder"}} >carrito </span> para agregar más cantidad del mismo</p>
    
    </Alert>
  </Snackbar>

  <style jsx>
      {`
      .product__text{
          display:flex;
          flex-flow: column;
        
    padding: 10%;
      }
      .tituloProduct{
          font-size:13px;
          color: #007bff;
     cursor:pointer;
          text-align:center;
          word-break: break-word;
      }
      `}
  </style>
        </div>
    );
};}


const mapStateToProps = state => {
    const cart = state.shop.cart
  

    return {cart}
};

export default connect(mapStateToProps)(Product);

