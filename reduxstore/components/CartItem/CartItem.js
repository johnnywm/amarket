import React, {useState} from 'react';
import {connect} from 'react-redux';
import {shortenTitle} from "../../pipes/shortenTitle";
import {formatMoney} from "../../pipes/priceFormatter";

import {addProductToCart, decrementCartQuantity, incrementCartQuantity, removeProductToCart} from "../../actions";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const CartItem = (
    {
       Titulo,
       Precio_Venta,
        MiniDescrip,
        Existencia,
        _id,
        img,
        dispatch
    }
) => {

    const handleQuantityChange = (e) => {
        /*  const value = e.target.value;
          console.log(value)
  
          if(value > 0 && value <= 10) {
              setItemQuantity(value);
              dispatch(addProductToCart(id));
          } */
      };
    const [itemQuantity, setItemQuantity] = useState(1);
    const removeItem = () => {
        dispatch(removeProductToCart(_id));
    };


    const incrementOrDecrement = (e, type) => {
        const value = itemQuantity;
        console.log(type, value);

        if(type === 'inc' && value < 10) {
            setItemQuantity(itemQuantity + 1);
            dispatch(incrementCartQuantity(_id));
        }


        if(type === 'desc' && value > 1) {
            setItemQuantity(itemQuantity - 1);
            dispatch(decrementCartQuantity(_id));
        }

    };


    return (
        <div className="fullcardcontainer">
       <div className="imgcontainer">
                <img className="responimg" src={img}  alt={Titulo}
                      />
            </div>
            
            <div className="textocont">
                <h4 className="product-name"><strong>{Titulo}</strong></h4>
                <h4>
                   
                </h4>
            </div>
            
            <div className="contNum">
                <div className="" style={{paddingTop: '5px'}}>
                    <h6><strong>${Precio_Venta}   x <span className="text-muted"></span></strong></h6>
                </div>
                <div className="">
                    <div className="quantity">
                        <input
                            onClick={(e) => {incrementOrDecrement(e, 'inc')}}
                            type="button" value="+" className="plus" />
                            <input
                                onChange={handleQuantityChange}
                                type="number" step="1" max="10" min="1" value={itemQuantity} title="Qty"
                                   className="qty"
                                   size="4" />
                                <input
                                    onClick={(e) => {incrementOrDecrement(e, 'desc')}}
                                    type="button" value="-" className="minus" />
                    </div>
                </div>
                </div>
            
                  
                <div className="">
                    <button
                        onClick={removeItem}
                        type="button" className="btn btn-outline-danger btn-xs">
            <DeleteForeverIcon />
                    </button>
                </div>
          
        </div>
    );
};

export default connect()(CartItem);
