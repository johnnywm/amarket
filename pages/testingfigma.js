import React, { Component } from 'react'
import {connect} from 'react-redux';

import { IPhoneSE1 } from '../components/IPhoneSE1/IPhoneSE1';



class purdata extends Component {



    componentDidMount(){

    }


    render() {
        
        const handleClose = (event, reason) => {
            let AleEstado = this.state.Alert
            AleEstado.Estado = false
            this.setState({Alert:AleEstado})
           
        }
        const Alert=(props)=> {
            return <MuiAlert elevation={6} variant="filled" {...props} className="uper" />;
          }

          return(
            <div style={{marginTop:"15vh"}} className='contPanelCuentas'>

test1
<IPhoneSE1/>
     <style jsx>    {`
     
     `}

     </style>
            </div>

          )

    }


}



const mapStateToProps = state => {


    return {state}
  };
  
  
  export default connect(mapStateToProps)(purdata)