import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Animate } from "react-animate-mount";
import Router from 'next/router';
import Doble from "../subcompo/dobleimg";
import Contacto from "../landingcontact";
import Head from 'next/head';

class Post extends Component {

  state={
    problemas:true,
    contacto:false,
    submenu:false,
    subselection:"items",
    mainlistadoproblemas:true,
    sublistadoproblemas:false
  }
componentDidMount () {

  
 
}

handlePC(item) {

  const{modelo, marcas} = this.props.router.query;

  if(item.titulo =="Botones"){
    this.setState({ mainlistadoproblemas:false, sublistadoproblemas:true, subselection:"botones"})
  }
  else if(item.titulo =="Camaras"){
  
    this.setState({mainlistadoproblemas:false, sublistadoproblemas:true,subselection:"camaras"})
  }
  else if(item.titulo =="Sonido"){
  
    this.setState({mainlistadoproblemas:false, sublistadoproblemas:true,subselection:"sonido"})
  }
  else if(item.titulo =="Micrófonos"){
  
    this.setState({mainlistadoproblemas:false, sublistadoproblemas:true,subselection:"micrófonos"})
  }
  else if(item.titulo =="Pin de Carga"){
  
    const as = `/reparacion/${marcas}/${modelo}/Flex-de-Carga`;
    Router.push(`/reparacion/[marcas]/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Botones laterales"){
  
    const as = `/reparacion/${marcas}/${modelo}/Flex-de-Volumen`;
    Router.push(`/reparacion/[marcas]/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Boton de Encendido"){
  
    const as = `/reparacion/${marcas}/${modelo}/Flex-de-Power`;
    Router.push(`/reparacion/[marcas]/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Boton Home"){
  
    const as = `/reparacion/${marcas}/${modelo}/Boton-Home`;
    Router.push(`/reparacion/[marcas]/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Camara Posterior"){
  
    const as = `/reparacion/${marcas}/${modelo}/Camara-Posterior`;
    Router.push(`/reparacion/[marcas]/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Camara Frontal"){
  
    const as = `/reparacion/${marcas}/${modelo}/Flex-Camara-Frontal`;
    Router.push(`/reparacion/[marcas]/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Microfono de llamada"){
  
    const as = `/reparacion/${marcas}/${modelo}/Flex-de-Carga`;
    Router.push(`/reparacion/[marcas]/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Microfono al grabar"){
  
    const as = `/reparacion/${marcas}/${modelo}/Flex-de-Power`;
    Router.push(`/reparacion/[marcas]/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Microfono de videollamada"){
  
    const as = `/reparacion/${marcas}/${modelo}/Flex-Camara-Frontal`;
    Router.push(`/reparacion/[marcas]/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Sistema / Software"){
  
    const as = `/reparacion/${marcas}/${modelo}/Sistema`;
    Router.push(`/reparacion/[marcas]/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Sonido de llamada"){
  
    const as = `/reparacion/${marcas}/${modelo}/Parlante-Superior`;
    Router.push(`/reparacion/[marcas]/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Altavoz"){
  
    const as = `/reparacion/${marcas}/${modelo}/Altavoz`;
    Router.push(`/reparacion/[marcas]/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Lente de cámara"){
  
    const as = `/reparacion/${marcas}/${modelo}/Lente-de-Camara`;
    Router.push(`/reparacion/[marcas]/[modelo]/[repuesto]`,as)
  }

  
  else if(item.titulo =="Tapa de cristal"){

    const as = `/reparacion/${marcas}/${modelo}/Tapa`;
    Router.push(`/reparacion/[marcas]/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Vibrador"){

    const as = `/reparacion/${marcas}/${modelo}/Vibrador`;
    Router.push(`/reparacion/[marcas]/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Micrófono de videollamada"){

    const as = `/reparacion/${marcas}/${modelo}/Flex-Camara-Frontal`;
    Router.push(`/reparacion/[marcas]/[modelo]/[repuesto]`,as)
  }

  else{

    
  const as = `/reparacion/${marcas}/${modelo}/${item.titulo}`;
Router.push(`/reparacion/[marcas]/[modelo]/[repuesto]`,as)
}
}

botoncontact=()=>{
  this.setState({ problemas:false,contacto:true})
  }
  
  flecharetro=()=>{
    this.setState({contacto:false, problemas:true})
  }
  onFlechaRetrosubmenu=()=>{
    this.setState({mainlistadoproblemas:true, sublistadoproblemas:false,subselection:"items"})
  }


  render () {

    let modeloMostrar;
    let repuestosToRender=[]
    let microfonosToRender=[]
    let botonesToRender=[]
    let camarasToRender=[]
    let sonidoToRender=[]
    if(this.props.router.query.modelo){
    
      modeloMostrar = this.props.router.query.modelo.replace(/-/g, " ")
    }
if(this.props.repuestosModelo.length > 0){
console.log(this.props.repuestosModelo)
    for(let i =0; i<this.props.repuestosModelo.length;i++){

          if(this.props.repuestosModelo[i]=== "Pantalla"){

              repuestosToRender.push({ "titulo": "Pantalla", "rutaimg": "/static/reparacion/pantalla.png" })
          }
          if(this.props.repuestosModelo[i]=== "Bateria"){

            repuestosToRender.push({ "titulo": "Bateria", "rutaimg": "/static/reparacion/bateria.png"})
           
           }
    
        if(this.props.repuestosModelo[i]=== "Flex-de-Carga"){
          repuestosToRender.push({"titulo": "Pin de Carga", "rutaimg": "/static/reparacion/pin.png"},
                                  { "titulo": "Micrófonos", "rutaimg": "/static/reparacion/microfono.png"} )
          microfonosToRender.push({ "titulo": "Micrófono de llamada", "rutaimg": "/static/reparacion/microfonollamada.jpg" })
             }

             if(this.props.repuestosModelo[i]=== "Carcasa"){
              repuestosToRender.push({ "titulo": "Carcasa", "rutaimg": "/static/reparacion/iphone-cover.png"})                         
                 }
                 if(this.props.repuestosModelo[i]=== "Boton-Home"){
                     
                  if(!repuestosToRender.some(rep => rep.titulo === "Botones")){
                    repuestosToRender.push({ "titulo": "Botones", "rutaimg": "/static/reparacion/botones.jpg"}) 
                  }        
                  botonesToRender.push({ "titulo": "Boton Home", "rutaimg": "/static/reparacion/botones.jpg"})              
                 }
                 
                 if(this.props.repuestosModelo[i]=== "Parlante-Superior" ){
                  
             
                  if(!repuestosToRender.some(rep => rep.titulo === "Sonido")){
                    repuestosToRender.push( { "titulo": "Sonido", "rutaimg":"/static/reparacion/sonido.png"})  
                console.log("dentro del ifPS")
                  }
                  sonidoToRender.push({ "titulo": "Sonido de llamada", "rutaimg": "/static/reparacion/llamada.jpg"})
                }

                if( this.props.repuestosModelo[i]=== "Altavoz" ){
                                                

                  if(!repuestosToRender.some(rep => rep.titulo === "Sonido")){
                    console.log("dentro del altavoz")
                    repuestosToRender.push( { "titulo": "Sonido", "rutaimg":"/static/reparacion/sonido.png"})  
                  }
                  sonidoToRender.push({ "titulo": "Altavoz", "rutaimg": "/static/reparacion/altavoz.jpg"})
                }


                 if(this.props.repuestosModelo[i]=== "Flex-de-Power"){
                                  if(!repuestosToRender.some(rep => rep.titulo === "Botones")){
                                    repuestosToRender.push({ "titulo": "Botones", "rutaimg": "/static/reparacion/botones.jpg"}) 
                                  }
                                                          
                                  botonesToRender.push({ "titulo": "Boton de Encendido", "rutaimg": "/static/reparacion/botonpower.png"})  
                                  microfonosToRender.push({ "titulo": "Micrófono al grabar", "rutaimg": "/static/reparacion/microfonograbacion.jpg"})   
                                       
                                }
                 if(this.props.repuestosModelo[i]=== "Flex-de-Volumen"){
                                if(!repuestosToRender.some(rep => rep.titulo === "Botones")){
                                  repuestosToRender.push({ "titulo": "Botones", "rutaimg": "/static/reparacion/botones.jpg"}) 
                                }
                                                        
                                botonesToRender.push( { "titulo": "Botones laterales", "rutaimg": "/static/reparacion/botoneslaterales.png" })    
                                     
                              }
                 
                 if(this.props.repuestosModelo[i]=== "Camara-Posterior"){
               
                      
                            if(!repuestosToRender.some(rep => rep.titulo === "Camaras")){
                              repuestosToRender.push( { "titulo": "Camaras", "rutaimg": "/static/reparacion/camara.png"}) 
                            }
                            camarasToRender.push({ "titulo": "Camara Posterior", "rutaimg": "/static/reparacion/camaraposterior.png" }) 
                
                 }
                 if(this.props.repuestosModelo[i]=== "Flex-Camara-Frontal"){
                  
                            if(!repuestosToRender.some(rep => rep.titulo === "Camaras")){
                              repuestosToRender.push( { "titulo": "Camaras", "rutaimg": "/static/reparacion/camara2.jpg"}) 
                            }
                            camarasToRender.push({ "titulo": "Camara Frontal", "rutaimg": "/static/reparacion/camarafrontal.png"}) 
                            microfonosToRender.push({ "titulo": "Micrófono de videollamada", "rutaimg": "/static/reparacion/microfonovideo.png"})
                  
                 }
                 if(this.props.repuestosModelo[i]=== "Mojado"){
                  
                  repuestosToRender.push( { "titulo": "Mojado", "rutaimg": "/static/reparacion/mojado.png"}) 
        
                }
                if(this.props.repuestosModelo[i]=== "Sistema"){
                  
             
                  repuestosToRender.push( { "titulo": "Sistema / Software", "rutaimg":"/static/reparacion/software.jpg"}) 
                }

                if(this.props.repuestosModelo[i]=== "Tapa"){
                  
             
                  repuestosToRender.push( { "titulo": "Tapa de cristal", "rutaimg":"/static/reparacion/tapa.jpg"}) 
                }
               
                if(this.props.repuestosModelo[i]=== "Lente-de-Camara"){
                  
             
                  repuestosToRender.push( { "titulo": "Lente de cámara", "rutaimg":"/static/reparacion/lente-camara.jpg"}) 
                }
               
                if(this.props.repuestosModelo[i]=== "Vibrador"){
                               
                  repuestosToRender.push( { "titulo": "Vibrador", "rutaimg":"/static/reparacion/vibrador.jpg"}) 
                }
                


                   
    
    
    
    
    
    
      }//fin del for
} 

                  
                             
                         
                    


                    let array =[];
                   
                    if(this.state.subselection == "botones"){
                      array = botonesToRender
                    }else if(this.state.subselection == "camaras"){
                      array = camarasToRender
                    }else if(this.state.subselection == "micrófonos"){
                     
                      array = microfonosToRender
                    }
                    else if(this.state.subselection == "sonido"){
                     
                      array = sonidoToRender
                    }

        
   const generadorProblemas = repuestosToRender.map((item, i) => (<div key={i}> 
                                                      <Doble
                                                      titulo={item.titulo} 
                                                      img={item.rutaimg}
                                                      onClickF={()=>{this.handlePC (item)}} />
                                                      </div>)); 
     const generadorsubProblemas = array.map((item, i) => (<div key={i}> 
                                                            <Doble
                                                            titulo={item.titulo} 
                                                            img={item.rutaimg}
                                                            onClickF={()=>{this.handlePC (item)}} />
                                                            </div>)); 


    return (
     
    <div>
      <Head>
        <title key="title">{`Reparacion ${modeloMostrar}`}</title>
        <meta
                  key="description"
                  name="description"
                  content={`Encontraras los repuestos para ${modeloMostrar}`}
                />
          </Head>
    <div >
  
  <Animate show={this.state.problemas}>
   <h1> Selecciona el área afectada de tu {modeloMostrar}</h1>
<div className="contbotoninseguro">
      <button className="botoninseguro" onClick={this.botoncontact}>No estoy seguro/a</button>
      </div>
      <Animate show={this.state.mainlistadoproblemas}>
  <div className="listadoproblemas">
{generadorProblemas}
 </div>
  </Animate>
     
     
     
     
      <Animate show={this.state.sublistadoproblemas}>
    <div className="submenu">
    <img src="/static/flecharetro.png" alt="" className="flecharetro" onClick={this.onFlechaRetrosubmenu}/>
    <div className="submenucont">
    {generadorsubProblemas}
    </div>
    </div>

  </Animate>
 
  

 

  </Animate>
  <Animate show={this.state.contacto}>
  <Contacto flechafun={this.flecharetro}/>
  </Animate>
  
    </div>
   

    <style jsx >{`

    .submenucont{
      display:flex;
      flex-wrap: wrap;
    justify-content: center;
    }

    .submenu{
      display:flex;
   
      flex-flow: column;
      
    }
   
.contbotoninseguro{
  width:100%;
  display:flex;
  justify-content: center;
}

    .botoninseguro{
      border-radius: 15px;
      height: 40px;
    width: 200px;
    background-color: greenyellow;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12);
       transition: background-color 15ms linear, box-shadow 280ms cubic-bezier(0.4,0,0.2,1);
    line-height: 15px;
    font-family: Roboto,sans-serif;
    font-size: 0.875rem;
    font-weight: bolder;
   
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: none;
    border-bottom: 2px outset black;
  
    }

  h1{
    text-align:center;
    font-size:30px;
  
  }

    
    
.imagenproblema{

  height: 200px;
  width: 200px;
}

.listadoproblemas{

display: flex;
flex-wrap: wrap;
text-align: center;
align-items: center;
justify-content: center;

}

.flecharetro{
  height: 40px;
  width: 40px;
  padding: 5px;
}
      `}</style>
  </div>
    )
  }
}

export default withRouter(Post) 