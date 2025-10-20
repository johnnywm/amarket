import Grid from '@mui/material/Grid';
import Head from 'next/head';
import React from 'react';

class Encuentranos extends React.Component{
    state={ 
        altura: ''
    }
    
     componentDidMount(){
       
    
        
     }
     render(){
    return(


        <div className="Bannercont" >
        <Head>


</Head>
     
      <Grid container spacing={0} style={{height:"100%"}} >
      <div  className="subcontedorBanner">
      <h2 className="subtitulocont">Encuentranos</h2>
      <Grid  item xs={12}  > 
      <iframe 
      title="Mapa iGlass"
      loading="lazy"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8033590400305!2d-78.46826238528413!3d-0.15690829988550936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5900f98579a05%3A0xe0ef129074eb3f80!2siGlass+-+Reparaci%C3%B3n+de+Celulares+-+Servicio+T%C3%A9cnico!5e0!3m2!1ses!2sec!4v1557113886630!5m2!1ses!2sec" 
       frameBorder="0"  allowFullScreen>
       </iframe>
      </Grid>
      <Grid  item xs={6} style={{height:"30%"}} > 
     <div className="contactcont padding-left" >
     
     <div>
     <img src="/icons/home.svg" alt=""/>
                  <p className="bold"> Av.Eloy Alfaro N47-132 y Mortiños </p>
                  </div>
        <div className="texto-centrado" >
            
        <img src="/icons/call.svg" alt=""/>
                <p>0992492619</p>
                <p>0992546367</p>
                <p>0260064598</p>
              
        </div>
        </div>
      </Grid>
      <Grid  item xs={6}  style={{height:"30%"}}> 
      <div className="contactcont "  >
      <img src="/icons/time.svg" alt=""/>
          <div>
  <p className="bold">Lunes a Viernes</p>
  <p>9:30AM a 8:00 PM</p>
  </div>
  <div>
  <p className="bold"> Sábados</p>
  <p>9:30AM a 6:00 PM</p>

  </div>
  <p>(Horario continuo)</p>
  </div>
        </Grid>
      
        </div> 
     </Grid> 
  

        <style jsx>{`
            .texto-centrado{
                text-align:center;
            }
            .bold{
                font-weight: bolder;
            }
            p{
                margin:0;
                font-size: 20px;
            }
.contactcont{
   height:100%;
   background-color: white;
   display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-evenly;
}
.padding-left{
    padding-left: 2px;
    text-align:center;
}
            .subcontedorBanner{
                display:flex;
                align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    height:100%;
    background: whitesmoke;
            }
            iframe{
                width:100%;
                height:400px;
            }
            .imgprincell{
                width:100%
            }
            .subcontedorBanner{
                width: 100%;
            }
            .tituloban{
                font-weight: bolder;
                width: 100%;
                font-size:35px;
            }
        hr {border: 0; 
        height: 20px; 
        box-shadow: inset 0 12px 12px -12px blue;
            margin-bottom:0;
        width: 100%;
        
        }
            .imagenrepuestos{
                margin-top:25px;
                padding-left: 25px;
                  padding-right: 25px;
                  text-align: center;
                  height: 100%;
            }
            .full{
                text-align: center;
                height: 100%;
                padding-left: 10px;
                  padding-right: 10px;
}
            }
            .Bannercont{
                width: 100%; 
                padding-top: 30px;
                z-index: 50;
                background-color: rgb(255, 255, 255);
                position: relative;
                height: 900px;
            }

        .GridCentrada{
            display: flex;
            justify-content: center;
            align-items: center;  
            flex-wrap: wrap;
        }
      

        `}
        </style>
        </div>
    )
    
}
}

export default Encuentranos;