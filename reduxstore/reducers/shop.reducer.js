import {
    ADD_PRODUCT_TO_CART,
    DECREMENT_CART_ITEM_QUANTITY,
    INCREMENT_CART_ITEM_QUANTITY,
    REMOVE_PRODUCT_FROM_CART,
    SET_SHOP_PRODUCTS,


} from '../../reduxstore/actions';

import {RESET_CARD, updateUser} from "../actions/myact"
import {phones} from "../../reduxstore/data/phones";

const initialState = {
    products: [],
    cart: []
};


const shopReducer = (state = initialState, action ) => {
    let updatedCart;
    let updatedItemIndex;

    switch (action.type) {
        case SET_SHOP_PRODUCTS:
            return { ...state, products: Array.isArray(action.payload) ? action.payload : [] };
        case INCREMENT_CART_ITEM_QUANTITY:
            updatedCart = [...state.cart];
            updatedItemIndex = updatedCart.findIndex(
                item => item._id === action.payload
            );

            let totalcompra = updatedCart[updatedItemIndex].CantidadCompra += 1
        
               updatedCart[updatedItemIndex].PrecioCompraTotal = parseFloat((totalcompra *updatedCart[updatedItemIndex].Precio_Venta).toFixed(2))

                updatedCart[updatedItemIndex].CantidadCompra = totalcompra

          return {...state, cart: updatedCart};


        case DECREMENT_CART_ITEM_QUANTITY:
            updatedCart = [...state.cart];
            updatedItemIndex = updatedCart.findIndex(
                item => item._id === action.payload
            );

            
            let totalcompradec = updatedCart[updatedItemIndex].CantidadCompra -= 1
        
            updatedCart[updatedItemIndex].PrecioCompraTotal = parseFloat((totalcompradec *updatedCart[updatedItemIndex].Precio_Venta).toFixed(2))

             updatedCart[updatedItemIndex].CantidadCompra = totalcompradec

       return {...state, cart: updatedCart};
        case ADD_PRODUCT_TO_CART:
        
        const carritoActual = state.cart
         carritoActual.push(action.payload)
               return {...state, cart: carritoActual};
         
        case REMOVE_PRODUCT_FROM_CART:
            updatedCart = [...state.cart];
        let newcart = updatedCart.filter(
                item => item._id != action.payload
            );

            

            return {...state, cart: newcart};
 

            case RESET_CARD:
                updatedCart = [...state.cart];
                  
                updatedCart = []
    
                return {...state, cart: updatedCart};
            default:
                return state;


    }
};

export default shopReducer; 
