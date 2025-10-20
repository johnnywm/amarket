import React from 'react';
import Cards from 'react-credit-cards';

import Grid from '@mui/material/Grid';
export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
    this.props.stateCapture(name, value)
  }
  
  render() {
      console.log(this.props.cardData)

      const TarOculta = this.props.cardData.TarjetaNumero.substring(0, 4) + "XXXXXXXXXXX"
      console.log(TarOculta)
    return (
    
      <div id="PaymentForm">
              <Grid  container>
          <Grid item xs={12} >
        <Cards
          cvc={"XXXX"}
          expiry={"XXXX"}
          focused={this.state.focus}
          name={this.props.cardData.TarjetaNombre}
          number={TarOculta }
        />
        </Grid>
     
        </Grid>
        <style >{`
            .central{
                display:flex;
                width: 100%;

    justify-content: center;
            }
            .textejemplo{
                margin-left:10%; 
            }
          #PaymentForm{
                margin-top:20px;
            }
            .formcont{
              padding:5px;
              margin-top: 40px
            }
            .formacontainer{
               
              
            }
            .formcont input{
                margin-bottom:10px;
                width:80%;
                border-radius:5px;
                margin-left:10%;
                
            }
            @media only screen and (min-width: 800px) { 
                .formcont{
               
               margin-top: 0px
           }
            }
            `}
        </style>
      </div>
  
    );
  }
}