import Grid from '@mui/material/Grid';
import Head from 'next/head';
import Footer from "../components/footer"
import React from "react"



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
         <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

     <title key="title">Contacto con iGlass</title>
     <meta
                  key="description"
                  name="description"
                  content=" Encuentre los datos de contacto del servicio tecnico de celulares iGlass"
                />


</Head>
     
     
          <div className="contTitulo">
      <h1 className="subtitulocont">Contactanos</h1>
      </div>
      <div className="maincontsocial">
      <div className="contsocial ">
      <img src="/static/whatsapplogo.png" alt="" className="socialimg"/>
     <img src="/static/youtubelogo.png" alt="" className="socialimg"/>
     <img src="/static/instalogo.png" alt="" className="socialimg"/>
     <img src="/static/fblogo.png" alt="" className="socialimg"/>
     <img src="/static/maillogo.png" alt="" className="socialimg"/>
      </div>
      </div>
      <Grid container spacing={0}  >
      <div  className="subcontedorBanner">
     
      <Grid  item xs={6}> 
     <div className="contactcont padding-left" >
     
     <div>
     <i className="material-icons">home</i>
     <p className="jwBolder">Primera Imprenta 12-21 y espejo.(Detras del CC Teofilo Lopez)</p>
                  <p > (Ambato-Ecuador) </p>
                  </div>
        <div className="texto-centrado" >
            
<i className="material-icons">phone</i>
                <a href="tel:0988801564">0988801564</a>
                <a href="tel:0988450025">0988450025</a>
           
              
        </div>
        </div>
      </Grid>
      <Grid  item xs={6} > 
      <div className="contactcont "  >
      <i className="material-icons">access_time</i>
          <div>
  <p className="bold">Lunes a Viernes</p>
  <p>9:30AM a 6:30 PM</p>
  </div>
  <p className="bold">Sábados</p>
  <p>9:30AM a 4:00 PM</p>     
  
  <p>(Horario continuo)</p>
  </div>
        </Grid>
      
              
      
  
        </div> 
     </Grid> 
     <div className="visitanoscont">
    
        <h1 className="subtitulocont">Visitanos </h1>
        <div className="mapaCont">
        <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3988.862308309687!2d-78.6253749250344!3d-1.2542999987337589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMcKwMTUnMTUuNSJTIDc4wrAzNycyMi4xIlc!5e0!3m2!1ses!2sec!4v1690979714836!5m2!1ses!2sec" 
         allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
       
  
        </div>
        </div>
<div className="ghost">

</div>
        <style jsx>{`
            .ghost{
                height:200px;
                background: white;
            }
        .subtitulocont {
            text-align: center;
            border-radius: 10px;
            font-family: myriad-pro, sans-serif;
            font-size: 45px;
            padding: 10px;
        }
        .contmap{
            width:100%;
            height:500px;
        }
        .marginador{
            margin-bottom:450px
        }
        .maincontsocial{
            width:100%;
            display:flex;
            justify-content: center;
        }
        .contsocial{
            width:80%;
            display:flex;
            justify-content: center;
        }
        .contsocial img{
            width:18%;
        }

        .contTitulo{
            width:100%;
            display:flex;
            justify-content: center;
            margin-top: 80px;

        }
            .texto-centrado{
                text-align:center;
                display: flex;
                flex-flow: column;
            }
            .bold{
                font-weight: bolder;
            }
            p{
                margin:0;
                font-size: 20px;
            }
.visitanoscont{
    height:500px;
    overflow: hidden;
}
.contactcont{
   height:300px;
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
      

        @media only screen and (min-width: 950px) {

            .contsocial img{
                width:10%;
            }

        }




        `}
        </style>
      
        </div>
    )
    
}
}

export default Encuentranos;