import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Link from "next/link"
/**
* @author
* @class carrito
**/

class Carrito extends Component {
    state={
        mounted:false
    }
    componentDidMount() {
        this.setState({mounted:true})
    }
 state = {}
 exampleRef = React.createRef()
 render() {
    const numerodelcarrito =this.props.cartLength?this.props.cartLength:0

    const data = this.exampleRef.current
 
    if(numerodelcarrito>0){
        if(data){
    
        data.classList.add("estilo2");
    
        setTimeout(()=>{ data.classList.remove("estilo2"); }, 1005);
    }
    }
  return(
    <div className={`carrito `}>
            <Link href="/carro-de-compras">
    <a>
        <div className="carritocont">
        <img  src="/icons/shopping.svg" ref={this.exampleRef} id="carrito" className={`material-icons estilo1 `}/>

  <p>{this.state.mounted && numerodelcarrito}</p>
</div>
</a>
        </Link>
        <style >
                {`
                .carritocont{
                    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}
.carritocont p{
       margin-bottom:0px;
       margin-left:4px;       
}

                }
                
                .estilo2{
                 font-size:35px;
                 transition:1s;
                 color:red;
                }
                .estilo1 {
                    transition:1s
  
}


                
                .carrito{
                        width: 91px;
    border: 2px outset #007bff;
    height: 71px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    box-shadow: inset 0px -2px 12px black;
    cursor: pointer;
    position: fixed;
    bottom: 6vh;
    background-color: white;
    right: 2vw;
                }`}
            </style>
   
   
                 </div>
    )
   }
 }


 const mapStateToProps = state=>  {
   
    return {
        cart : state.shop.cart,
        cartLength: state.shop.cart.length
    }
};

export default connect(mapStateToProps, null)(Carrito);