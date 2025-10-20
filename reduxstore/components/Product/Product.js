import React, {useState} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link'
import {formatMoney} from "../../pipes/priceFormatter";
import {cumulativeOffSet} from "../../utilities/cumulativeOffset";
import Router from 'next/router';

import SlideDots from "../SlideDots/SlideDots";
import {addProductToCart,} from "../../actions/";
import {ItemSelected} from "../../actions/myact";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Animate } from 'react-animate-mount/lib/Animate';

const Product = (props) => {

   

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
      
        Modelos,
        MiniDescrip,
        Existencia,

    } = props.producto;

    let   {Imagen }  = props.producto;

let imagenDeplouy;
let dots;
let arrimg = ["/tienda/portada1.jpg","/tienda/portada2.jpg","/tienda/portada3.jpg"]

    if(Imagen[0]){
        imagenDeplouy = Imagen[0]
  
    }
    else{
        imagenDeplouy = arrimg[0]
        Imagen = arrimg
    }

    let [dotstoRender, setDots] = useState(dots)
    let [imgtoRender, setImg] = useState(imagenDeplouy)
    
    const [aItem, setAItem] = useState(0);

    let [Agregado, setAgregado] = useState(false)
    let [Repetido, setRepetido] = useState(false)
    const imageRef = React.createRef();

    const handleClose = (event, reason) => {
       

        if (reason === 'clickaway') {
            return;
          }
        setAgregado(false)
        setRepetido(false)
        
          }
          const Alert = React.forwardRef(function Alert(props, ref) {
            return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
          })
    
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

    
           

            let sinslash = Titulo.replaceAll("/", "__").replaceAll(/ /g, "*").replaceAll("+","~");
         
            const as = `/tienda/${sinslash}`;
      
        return(`/tienda/[articulo]/`,as)
        }
    
        const handleCarrito=()=> {
            const audioEl = document.getElementsByClassName("audio-element")[0]
            audioEl.volume = 0.4
            const agregador=()=>{
                audioEl.play()
                console.log(props.producto)
                props.dispatch(addProductToCart({...props.producto, CantidadCompra:1,PrecioCompraTotal:props.producto.Precio_Venta, PrecioVendido:props.producto.Precio_Venta}))
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
                  
                    agregador()
                }
    
            
            }
            else{
      
                agregador()
            }
    
    
    
          
          }


   let outStock = Existencia <= 0?"outStock":""
   let detachedprice = Existencia <= 0?"detached":""
   let fueraDeStock = Existencia <= 0?true:false


    return (
        <div className={`card  product ${outStock}`}>
         <Link href={handleRoot()}><a>
          <img  
                onMouseMove={handleImageChange}
                onMouseOut={handleMouseOut}
                onTouchMove={handleImageChange}
                onTouchEnd={handleMouseOut}
                className={`card-img-top product__img ${props.altClass}`} src={imgtoRender } alt={Titulo} ref={imageRef}/>
                
                <SlideDots len={dotstoRender} activeItem={aItem} changeItem={changeImage}
                 />
         </a></Link> 
            <div className=" product__text">
                <h4 className="card-title product__title">
                <div className="jwContFlexCenter">
                <Link href={handleRoot()}><a style={{textDecoration:"none"}}>  <div className="tituloProduct" >{Titulo}</div>  </a></Link> 
    </div>
                </h4>
                <h5 className={`product__price  ${detachedprice}`} >${Precio_Venta}</h5>
              
               <div className="jwContFlexCenter">
                <Animate show={!fueraDeStock}>
                <button
                   onClick={handleCarrito}
                    className="btn btn-info product__add-to-cart">Añadir al carrito
                </button>
                </Animate>
                <Animate show={fueraDeStock}>
                <div className="jwContFlexCenter">
                <p> AGOTADO</p>
                </div>
                </Animate>
                </div>
            
            </div>

  <audio className="audio-element">
          <source src="/static/sonido/chime.wav"></source>
        </audio>
        <Snackbar open={Agregado} autoHideDuration={3000} onClose={handleClose} >
    <Alert onClose={handleClose}  severity="success">
        <p style={{textAlign:"center"}}>Se agrego un producto a tu Carrito</p>
    
    </Alert>
  </Snackbar>
  <Snackbar open={Repetido} autoHideDuration={3000} onClose={handleClose} >
    <Alert onClose={handleClose}  severity="info">
        <p style={{textAlign:"center"}}>El producto esta  <span style={{fontWeight:"bolder"}} >repetido</span>. Click en el <span style={{fontWeight:"bolder"}} >carrito </span> para agregar más cantidad del mismo</p>
    
    </Alert>
  </Snackbar>


  <style jsx>
      {`
       .alternativeprod{
        min-height: 175px;
    }
      .detached{
        text-decoration: line-through;
      }
      .outStock{
        border:2px solid red; 
      }
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
};


const mapStateToProps = state => {
    const cart = state.shop.cart
  

    return {cart}
};

export default connect(mapStateToProps)(Product);

