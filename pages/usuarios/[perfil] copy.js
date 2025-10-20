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