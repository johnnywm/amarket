import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
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
    return (
    
      <div id="PaymentForm">
              <Grid  container>
          <Grid item xs={12} md={6}>
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        </Grid>
        <Grid item xs={12} md={6}>
            <div className="formacontainer">
       
            <div className="formcont">
        	<input
            type="tel"
            name="number"
            placeholder="Número de Tarjeta"
            onChange={this.handleInputChange}
          
            maxLength="16"
          />
     <p className="textejemplo">Ejemplo: 48..., 51..., 36..., 37...</p>
          	<input
            type="text"
            name="name"
            autocomplete="chrome-off"
            placeholder="Nombre de la tarjeta"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
            	<input
            type="tel"
            name="expiry"
            placeholder="Fecha de expiración"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            maxLength="4"
          />
          	<input
            type="tel"
            name="cvc"
            placeholder="CVC"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            maxLength="4"
          />
         </div>
      
      
        </div>
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
              margin-top: 10px 
              
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