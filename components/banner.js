import Grid from '@mui/material/Grid';
import Serv from "../components/subcompo/servimg";



import React from 'react';




class Banner extends React.Component{
    state={ 
        altura: '',
        paralax2: false,
        titleanim: "thidden",
       
    }
    channer2= null
     componentDidMount(){
    

          



                 
}

componentWillUnmount() {

}



     render(){
      
   

        const items = 
        [
          { "marca": "Reparación", "rutaimg": "/banner/serv1.png","descripcion":"Cotizador automático, mira el valor de tu arreglo.", "Url":"/reparacion"  },
            { "marca": " Accesorios", "rutaimg": "/banner/serv2.png", "descripcion":"Todos los complementos que necesita tu dispositivo.", "Url":"/tienda"},
           { "marca": "Asesoria Técnica", "rutaimg": "/banner/serv3.png", "descripcion":"Estamos para solventar cualquier duda.", "Url":"/contactanos"}
       
        
           ]

        const generServicios = items.map((item, i) => (         <Serv 
                                                                key={i}
                                                                Url={item.Url}
                                                                titulo={item.marca} 
                                                                img={item.rutaimg}
                                                                descrip={item.descripcion}
                                                                estilo="botonClickserv"
                                                             /> 
                                                                ));


        
    return(
        <div id="subcontainer"  >
 <Grid  container >
        <div id="bg-image" className="Bannercont lazy hide"  >
            
    <div id="subcontainer"  className="subcontainer">
   
    <div className="fondoblur">
    <Grid  item xs={12} md={4}  > 
             <div className="gridcont">
             										 
             <img data-src="/banner/atencion2.PNG" className="lazy imgbanner hide" alt=""/>   

                                 
             </div>
        </Grid>
    <Grid  item xs={12} md={8}  > 
             <div style={{paddingTop:"30px"}} className="gridcont">
             										 
                                         <h2>Atención 100% personalizada</h2>
     
                                         <p>Nuestros clientes son lo mas importante para nosotros, por
                                             ello, hemos desarrolado un sistema de seguimiento completo 
                                             para cada dispositivo, consta de:
                                        </p>
                                        <ul>
                                            <li>Reporte inmediato</li>
                                            <li>Revición exhaustiva</li>
                                            <li>Diagnostico en tiempo real</li>
                                            <li>Notificacion en cada paso</li>
                                        </ul>
                                        <p>
                                            Cada detalle se le enviara a su correo electrónico... 
                                        </p>

                                        <button   className="botonClickserv">Saber más </button>
             </div>
        </Grid>
        <hr className="bannerhr"/>
        <Grid  item xs={12} md={4}  > 
             <div className="gridcont">
             										 
                                       <img data-src="/banner/coti.PNG"className="lazy imgbanner hide" alt=""/>
             </div>
        </Grid>
      
    <Grid  item xs={12} md={7}  > 
             <div className="gridcont">
             										 
                                         <h2>Cotización en 3 Clicks</h2>
     
                                         <p>Ponemos a su disposición nuestro sistema de cotización automático, necesitas saber es:
                                        </p>
                                        <ul>
                                            <li>Marca</li>
                                            <li>Modelo</li>
                                           <li>Repuesto a remplazar</li>
                                          
                                        </ul>
                                        <p>
                                            Ademas puede elegir, color (en algunos casos) y la calidad del repuesto que desea
                                        </p>
                                        <button   className="botonClickserv">Cotiza</button>
             </div>
        </Grid>
        <hr className="bannerhr"/>
        <Grid  item xs={12} md={4}  > 
             <div className="gridcont">
             										 
             <img data-src="/banner/marcas.PNG"className="lazy imgbanner hide " alt=""/>
             </div>
        </Grid>
      
    <Grid  item xs={12} md={8}  > 
             <div className="gridcont">
             										 
                                         <h2>Soporte en la mayoria de marcas </h2>
     
                                       <p>

                                       Nos enfocamos en darte un servicio lo más completo posible, con el objetivo de que encuentres todo el soporte tecnológico en el mismo lugar.

                                       </p>
                                       <button   className="botonClickserv">Saber más </button>
             </div>
        </Grid>
      
        </div>

   
    </div>
    </div>

    <div className="contedorServicios lazy" id="servinter" >
             <h2 className="subtitulocont"> Servicios </h2>
       
             <div className="subcontedorServicios" > 
             {generServicios}
                </div> 
            
            </div>


            </Grid>
 
          


            <style >{`
            .hide{
                opacity:0;
                transition: 1s;
            }
            .unhide{
                opacity:1
              
            }


#bg-image.lazy {
    background-image: none;
    background-color: #F1F1FA;
 }
            .buttonmargin{
        margin: 15px 0px 15px 0px;
       }
       .bannerhr{
        box-shadow: inset 0px 16px 34px -10px #000000;
    margin: 30px 0px 30px 0px;
    width: 100%
   
       }

   .gridcont{
       display:flex;
       align-items: center;
       justify-content: center;
       flex-flow: column;
       padding-left: 5%;
       padding-right: 5%;
       text-align: justify;
       height: 100%;
   }
  

         
           
         .imgbanner{
width:100%;

max-width: 500px;    
            }
            .imagenrepuestos{
                margin-top:25px;
                padding-left: 25px;
                  padding-right: 25px;
                  text-align: center;
                  height: 600px;
                  border: 2px solid yellow;
                  align-items: center;
                  overflow:auto;
                  flex-flow: column;
                    justify-content: flex-end;
             
            }
          
 

   .Bannercont{

             margin-top:101vh;
             background-size: cover;
             z-index: 50;
           
             position: relative;
             display: flex;
             flex-flow: column;
             align-items: center;
             padding: 5% 0%;
              background-attachment: fixed;
              width: 100vw;
              height: auto;
              background-color: #b1abab;
              background-image: url(/banner/2.jpg);
         }
         
.subcontainer{
 padding-top: 80px;
 padding-left: 5vw;
 padding-right: 5vw;
}
         
            .full{
                text-align: center;
                height: 100%;
                padding-left: 10px;
                  padding-right: 10px;
                }
            
       
    
     
        .imgcentral{
      height: 300px;;
      overflow: auto;
   
  }



  

            .fondoblur{
           
                    background-color: rgba(255,255,255,0.8);
                    border-radius:20px;

 display: flex;
 flex-wrap:wrap;
 justify-content:center;

 
}





        `}
        </style>
     
        
        </div>
    )
    
}
}

export default Banner;