import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserProfile from "../../components/perfilUsuario"
import {connect} from 'react-redux';


/**
* @author
* @class PerfilUsuario
**/

class PerfilUsuario extends Component {
 state = {

  mounted:false,

 }
 
 

 componentDidMount(){

    
this.setState({mounted:true})
 
    
 }



 render() {

   console.log(this.props)

  return(
  <div className="jwMainContainer">
     {this.state.mounted && this.props.usuario.userReducerEmarket !== ""?<UserProfile datos={this.props.usuario.userReducerEmarket.update} />:"Por favor inicie seción para continuar"}
  
  
  </div>

    )
   }
 }


PerfilUsuario.propTypes = {}
const mapStateToProps = state => {
   const usuario = state

   return {usuario}
};
export default connect(mapStateToProps)(PerfilUsuario)