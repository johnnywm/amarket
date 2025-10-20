import Grid from '@mui/material/Grid';
import React from 'react';

import postal from 'postal';


class Why extends React.Component{
    state={ 
        altura: '',
        paralax2: false
    }
    
    channel7 = null;
    channel8 = null;

     componentDidMount(){
    
        this.channel7 = postal.channel();
        this.channel8 = postal.channel();
        this.channel7.subscribe('scrollon', (data) => {
          console.log("chanel7")
          this.setState({ paralax2: true})
        });
        this.channel7.subscribe('scrollof', (data) => {
          this.setState({ paralax2: false})
        });
     
      
     }
     render(){
         const Whyset  = !this.state.paralax2? "Whycont":"whycontactive";
   
        
    return(


        <div id="bg-why" className={`${Whyset} `}  >
      
     
       
       <p className="titulowhy"> Nosotros Somos</p>
       <div className="contenidowhy">
       <Grid  className="subcontedorwhy"container  >
        <Grid  item xs={12}  > 
        <div className="subcontWhy">
      <div className="contimgwhy">
          <img className="imgwhy lazy" src="/whycont/honesty.png" alt="icono honestidad"/>       
        </div> 
        <div className="textwhy">
        <h4 className="valtext">Honestidad</h4>
        <p className="subwhytext">Nuestro objetivo es servir a la sociedad. </p>
        </div>
        </div>
        </Grid>
        <Grid  item xs={12}  > 
        <div className="subcontWhy">
      <div className="contimgwhy">
          <img className="imgwhy lazy" src="/whycont/puntualidad.png" alt="icono honestidad"/>       
        </div> 
        <div className="textwhy">
        <h4  className="valtext">Puntualidad</h4 >
        <p className="subwhytext">Consideramos la importancia de su herramienta de trabajo. </p>
        </div>
        </div>
        </Grid>
        <Grid  item xs={12}  > 
        <div className="subcontWhy">
      <div className="contimgwhy">
          <img className="imgwhy lazy" src="/whycont/capacitacion.png" alt="icono honestidad"/>       
        </div> 
        <div className="textwhy">
        <h4  className="valtext">Profesionalidad</h4 >
        <p className="subwhytext">Personal calificado con años de experiencia en el area de repación. </p>
        </div>
        </div>
        </Grid>
        <Grid  item xs={12}  > 
        <div className="subcontWhy">
      <div className="contimgwhy">
          <img className="imgwhy lazy" src="/whycont/flexibilidad.png" alt="icono honestidad"/>       
        </div> 
        <div className="textwhy">
        <h4  className="valtext">Flexibilidad</h4>
        <p className="subwhytext">Atencion personalizada dependiendo tus requerimientos. </p>
        </div>
        </div>
        </Grid>
    
        </Grid>
        </div>

        </div>
    )
    
}
}

export default Why;