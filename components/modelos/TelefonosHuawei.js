import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Animate } from "react-animate-mount";
import Router from 'next/router';
import Doble from "../subcompo/dobleimg";
import Contacto from "../landingcontact";
class SamsungPhones extends Component {

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
console.log(item.titulo)
  const{modelo} = this.props.router.query;

  if(item.titulo =="Botones"){
    this.setState({ mainlistadoproblemas:false, sublistadoproblemas:true, subselection:"botones"})
  }
  else if(item.titulo =="Camaras"){
  
    this.setState({mainlistadoproblemas:false, sublistadoproblemas:true,subselection:"camaras"})
  }
  else if(item.titulo =="Microfonos"){
  
    this.setState({mainlistadoproblemas:false, sublistadoproblemas:true,subselection:"microfonos"})
  }
  else if(item.titulo =="Pin de Carga"){
  
    const as = `/reparacion/${modelo}/Flex-de-Carga`;
    Router.push(`/reparacion/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Botones laterales"){
  
    const as = `/reparacion/${modelo}/Flex-de-Volumen`;
    Router.push(`/reparacion/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Boton de encendido"){
  
    const as = `/reparacion/${modelo}/Flex-de-Power`;
    Router.push(`/reparacion/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Boton Home"){
  
    const as = `/reparacion/${modelo}/Boton-Home`;
    Router.push(`/reparacion/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Camara Posterior"){
  
    const as = `/reparacion/${modelo}/Camara-Posterior`;
    Router.push(`/reparacion/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Camara Frontal"){
  
    const as = `/reparacion/${modelo}/Flex-Camara-Frontal`;
    Router.push(`/reparacion/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Microfono de llamada"){
  
    const as = `/reparacion/${modelo}/Flex-de-Carga`;
    Router.push(`/reparacion/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Microfono al grabar"){
  
    const as = `/reparacion/${modelo}/Flex-de-Power`;
    Router.push(`/reparacion/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Microfono de videollamada"){
  
    const as = `/reparacion/${modelo}/Flex-Camara-Frontal`;
    Router.push(`/reparacion/[modelo]/[repuesto]`,as)
  }
  else if(item.titulo =="Sistema / Software"){
  
    const as = `/reparacion/${modelo}/Sistema`;
    Router.push(`/reparacion/[modelo]/[repuesto]`,as)
  }

  else{

    
  const as = `/reparacion/${modelo}/${item.titulo}`;
Router.push(`/reparacion/[modelo]/[repuesto]`,as)
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
console.log(this.state)
    let modeloMostrar;

    if(this.props.router.query.modelo){
    
      modeloMostrar = this.props.router.query.modelo.replace("-", " ")
    }


    const items = 
    [
         { "titulo": "Pantalla", "rutaimg": "/static/reparacion/pantallasamsung.png" },
         { "titulo": "Bateria", "rutaimg": "/static/reparacion/bateria.png"},
         { "titulo": "Pin de Carga", "rutaimg": "/static/reparacion/pin.png"},
         { "titulo": "Carcasa", "rutaimg": "/static/reparacion/iphone-cover.jpg"},
         { "titulo": "Botones", "rutaimg": "/static/reparacion/botones.jpg"},
         { "titulo": "Sistema / Software", "rutaimg":"/static/reparacion/software.jpg"},
         { "titulo": "Camaras", "rutaimg": "/static/reparacion/camara2.jpg"},
         { "titulo": "Microfonos", "rutaimg": "/static/reparacion/camara.jpg"},
         { "titulo": "Mojado", "rutaimg": "/static/reparacion/mojado.png"},
             
        ]
 

        const botones = 
        [
             { "titulo": "Botones laterales", "rutaimg": "/static/reparacion/botoneslaterales.jpg" },
             { "titulo": "Boton Home", "rutaimg": "/static/reparacion/botones.jpg"},
             { "titulo": "Boton de encendido", "rutaimg": "/static/reparacion/botonpower.jpg"},
      
                 
            ]

            const microfonos = 
            [
                 { "titulo": "Microfono de llamada", "rutaimg": "/static/reparacion/microfonollamada.jpg" },
                 { "titulo": "Microfono al grabar", "rutaimg": "/static/reparacion/microfonograbacion.jpg"},
                 { "titulo": "Microfono de videollamada", "rutaimg": "/static/reparacion/microfonovideo.png"},
                               
                ]
                const camaras = 
                [
                     { "titulo": "Camara Posterior", "rutaimg": "/static/reparacion/camaraposterior.png" },
                     { "titulo": "Camara Frontal", "rutaimg": "/static/reparacion/camarafrontal.png"},
                             
                         
                    ]


                    let array;
                    if(this.state.subselection == "items"){
                      array = items
                    } else if(this.state.subselection == "botones"){
                      array = botones
                    }else if(this.state.subselection == "camaras"){
                      array = camaras
                    }else if(this.state.subselection == "microfonos"){
                      console.log("dentro del arrayt")
                      array = microfonos
                    }

        
   const generadorProblemas = array.map((item, i) => (<div key={i}> 
                                                      <Doble
                                                      titulo={item.titulo} 
                                                      img={item.rutaimg}
                                                      onClickF={()=>{this.handlePC (item)}} />
                                                      </div>)); 


    return (
     
    <div>
    <div >
  
  <Animate show={this.state.problemas}>
   <h1> Selecciona el área afectada de tu {modeloMostrar}</h1>
<div className="contbotoninseguro">
      <button className="botoninseguro" onClick={this.botoncontact}>No estoy seguro/a</button>
      </div>
      <Animate show={this.state.sublistadoproblemas}>
    <div className="submenu">
    <img src="/static/flecharetro.jpg" alt="" className="flecharetro" onClick={this.onFlechaRetrosubmenu}/>
    <div className="submenucont">
    {generadorProblemas}
    </div>
    </div>

  </Animate>
  <Animate show={this.state.mainlistadoproblemas}>
  <div className="listadoproblemas">
{generadorProblemas}
 </div>
  </Animate>
  

 

  </Animate>
  <Animate show={this.state.contacto}>
  <Contacto flecharetro={this.flecharetro}/>
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
  height: auto;
  width: 40px;
  padding: 5px;
}
      `}</style>
  </div>
    )
  }
}

export default withRouter(SamsungPhones) 