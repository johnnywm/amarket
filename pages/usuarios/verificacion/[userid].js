import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { useRouter } from 'next/router'
import {connect} from 'react-redux';
import {updateUser} from "../../../reduxstore/actions/myact"
import Router from "next/router"
/**
* @author
* @class userID
**/

class userID extends Component {
 state = {}

 static async getInitialProps(ctx) {
    const users = ctx.router
    
        return { users}
      }

 componentDidMount(){


let datasting = JSON.stringify(this.props.router.query)
console.log(datasting)
fetch('https://iglass.herokuapp.com/users/activator', {
    method: 'PUT', // or 'PUT'
    body: datasting, // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
      console.log('Success updateing', response)
      const usuario= response.user
      this.props.dispatch(updateUser({usuario}))
    })


 }

 testingfun=()=>{
     
 }
 render() {
   console.log(this.props)
    
  
  return(
   <div style={{marginTop:"15vh"}}>
       <div className="jwPaper">
           <div className="jwseccionCard">
           <span className="material-icons" style={{ fontSize: "71px",  margin: "15px"}}>
thumb_up_alt
</span>
<p className="subtituloArt">Tu cuenta ha sido activada con éxito</p>
<p>Ahora puedes comprar y solicitar repuestos</p>
<div className="jwContFlexCenter">
  <button className="btn btn-warning" onClick={()=>{Router.push("/tienda")}}>Compra</button>
  <button className="btn btn-success" onClick={()=>Router.push("/reparacion")}>Repara</button>
  <button className="btn btn-info" onClick={()=>{Router.push("/usuarios/[perfil]", `/usuarios/${this.props.usuario.Usuario}`)}}>Perfil</button>
                              </div>
           </div>
       </div>
       <style jsx>{`
           
           .jwContFlexCenter button{
               margin:5px
           }

           `}

       </style>
      </div>
    )
   }
 }


userID.propTypes = {}

const mapStateToProps = (state, props) =>  {
 let userFind = state.userReducerEmarket.update

    return(userFind)
  
     
  };
export default connect(mapStateToProps)(withRouter(userID))