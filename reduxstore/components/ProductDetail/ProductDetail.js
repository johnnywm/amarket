import React, {useState} from 'react';
import {connect} from 'react-redux';


import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Link from "next/link"

const ProductDetail = (props) => {
      
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
    const {
        _id,
       Titulo,
       Precio_Venta,
       Marca,
       Calidad,
       Garantia,
       Modelos,
       Color,
       Descripcion,
       Existencia
    } = props.product;



const handleClose = (event, reason) => {
  
  if (reason === 'clickaway') {
    return;
  }
    setAgregado(false)
    setRepetido(false)
    
      }
let [Agregado, setAgregado] = useState(false)
let [Repetido, setRepetido] = useState(false)

let detachedprice = Existencia <= 0?"detached":""



    return (
        <aside className="">
           
            <article className="modern-card-body">
                <div className="modern-title">{Titulo}</div>
                <div className={`modern-price priceAccent`}>
                  <span className="currency">$</span>
                  <span className={`num ${detachedprice}`}>{Precio_Venta}</span>
                </div>
<div className="contcuaternario">
                {Marca !== "default" && Marca !== "" ?<dl className="item-property">
                    <dt>Marca</dt>
    <dd><p className="text-capitalize">{Marca}</p></dd>
                </dl>:
                ""}
                  {Calidad !== "default" && Calidad !== "" ?<dl className="item-property">
                    <dt>Calidad</dt>
    <dd><p className="text-capitalize">{Calidad}</p></dd>
                </dl>:
                ""}
                  {Color !== "default" && Color !== "" ?<dl className="item-property">
                    <dt>Color</dt>
    <dd><p className="text-capitalize">{Color}</p></dd>
                </dl>:
                ""}
                {Garantia !== "default" && Garantia !== "" ?<dl className="item-property">
                    <dt>Garantía</dt>
    <dd><p className="text-capitalize">{Garantia}</p></dd>
                </dl>:
                ""}
     </div>        

  
              
               
           
              
                <div className="contDescrip">
                {Descripcion !== "default" && Descripcion !== "" ?<dl className="item-property">
                    <dt className="tituloDescrip">Descripción adicional</dt>
                    <div className="detallesdescrip"  dangerouslySetInnerHTML={{ __html: Descripcion}}></div>
                </dl>:
                ""}
                </div>
               
              
            </article>
            <audio className="audio-element">
          <source src="/static/sonido/chime.wav"></source>
        </audio>
        <Snackbar open={Agregado} autoHideDuration={3000} onClose={handleClose}>
    <Alert onClose={handleClose}  severity="success">
        <p style={{textAlign:"center"}}>Se agrego un producto a tu Carrito</p>
    
    </Alert>
  </Snackbar>
  <Snackbar open={Repetido} autoHideDuration={3000} onClose={handleClose} >
    <Alert onClose={handleClose}  severity="info">
        <p style={{textAlign:"center"}}>El producto esta  <span style={{fontWeight:"bolder"}} >repetido</span>. Click en el <span style={{fontWeight:"bolder"}} >carrito </span> para agregar más cantidad del mismo</p>
    
    </Alert>
  </Snackbar>
            <style>
                {`
                .detached{
                  text-decoration: line-through;
                }
                .contbotoncarrito{
                    display:flex;
                    justify-content: center;
                }
                .botonventa{
                    max-width: 300px;
                
                    margin-top: 18px;
                    width: 80%;
                    padding: 0 16px;
                    border-radius: 10px;
                    background-color: #048b0b;
                    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
                      0 2px 2px 0 rgba(0, 0, 0, 0.14),
                      0 1px 5px 0 rgba(0, 0, 0, 0.12);
                    color: #fff;
                    transition: background-color 15ms linear;
                      box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
                  
                    height: 36px;
                    line-height: 2.25rem;
                    font-family: Roboto, sans-serif;
                    font-size: 0.875rem;
                    font-weight: 500;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    border: none;
                  }
                  .botonventa:hover, .botonventa:focus {
                    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
                      0 4px 5px 0 rgba(0, 0, 0, 0.14),
                      0 1px 10px 0 rgba(0, 0, 0, 0.12);
                    background-color: #039c0a;
                  }
                  
                  .botonventa:active {
                    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
                      0 8px 10px 1px rgba(0, 0, 0, 0.14),
                      0 3px 14px 2px rgba(0, 0, 0, 0.12);
                    background-color: #06d110;
                  }
                 .whatappButton{
                    background-color: #00af9c;
                    height: 80px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    line-height: 20px;
                  
                  }

.contWPB{display:flex;
    display: flex;
    justify-content: center;}
  
  
  .logowp{
    width: 20%;
  }
               
                .tituloDescrip{
                    text-align: center;
    font-size: 18px;
    margin-bottom: 16px;
                }
                .contcuaternario{
                    display:flex;
                    flex-wrap:wrap;
                    justify-content: space-around;
                }
                .contcuaternario dl{
                    margin: 10px;
    padding: 5px;
    /* border: 1px solid; */
    box-shadow: 1px 1px 1px 0px;
    border-radius: 7px;
    width: 40%;
    text-align: center;
                }
                .contDescrip{
                    width: 100%;
                }
                    .modern-card-body {
  background: rgba(255,255,255,0.85);
  border-radius: 2rem;
  box-shadow: 0 8px 32px 0 rgba(34,34,34,0.18), 0 1.5px 6px 0 rgba(0,0,0,0.10);
  border: 1.5px solid rgba(34,34,34,0.10);
  padding: 10px;
  margin-top: 1.5rem;
  margin-bottom: 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  backdrop-filter: blur(6px);
  transition: box-shadow 0.3s cubic-bezier(.4,2,.3,1), transform 0.2s cubic-bezier(.4,2,.3,1);
  position: relative;
}
.modern-title {
  font-size: 2.1rem;
  font-weight: 700;
  color: #111;
      
  letter-spacing: -0.5px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
.modern-brand {
  font-size: 1.1rem;
  color: #444;
  font-weight: 500;
  letter-spacing: 0.2px;
}
.modern-price {
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  text-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.priceAccent {
  color: #e53935 !important;
  text-shadow: 0 2px 8px rgba(229,57,53,0.10);
}

}

                `}
            </style>
        </aside>
    );
};

const mapStateToProps = state => {
    const cart = state.shop.cart
  

    return {cart}
};

export default connect(mapStateToProps)(ProductDetail);
