import React, { Component } from 'react'
import { Animate } from "react-animate-mount";
import postal from 'postal';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Link from 'next/link';

class Contacto extends Component {
    constructor(props){
        super(props);
            this.state={
                clienteNombre:"",
                clienteTelefono:"",
                pinicial:true,
                opciones:true,
                pfinal:false,
                llamada:false,
                despedida:false,
                urgente:false
         
        }
      this.sendMail = this.sendMail.bind(this)
   
        }

    componentDidMount(){


      console.log(this.props)
   
        ValidatorForm.addValidationRule('requerido', (value) => {
          if (value === "") {
              return false;
          }
          return true;
      });
      ValidatorForm.addValidationRule('soloNumeros', (value) => {
        if (isNaN(value)) {
            return false;
        }
        return true;
    });
      
      ValidatorForm.addValidationRule('minimo7', (value) => {
        if (value.length >= 7) {
            return true;
        }
        return false;
    }); 


      
      }
      componentWillUnmount() {
        // remove rule when it is not needed
        ValidatorForm.removeValidationRule('requerido');
        ValidatorForm.removeValidationRule('minimo7');
        ValidatorForm.removeValidationRule('soloNumeros');
    }

      solicitarllamada=()=>{
        this.setState({opciones:false, llamada:true})
      }

      contactodirecto=()=>{
        this.setState({opciones:false, contactodirecto:true})
      }


      handleChangeform=(e)=>{
        if(e.target.name === "nombre"){
            this.setState({clienteNombre:e.target.value})
          }
          if(e.target.name === "telefono"){
            this.setState({clienteTelefono:e.target.value})
          }
        }

        sendMail=(e)=>{
  
                       
            const {clienteNombre,clienteTelefono } = this.state;
        
          let data = {
            clienteNombre, clienteTelefono,
            cuentadestino:this.props?.datosTienda?.correoNotificaciones
          }
            
     
           
        
        var url = 'http://localhost:3000/public/solicitudllamada';
        var deployUrl =  `${process.env.NEXT_PUBLIC_PROD_URL}/solicitudllamada `
        fetch(deployUrl, {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
         headers:{
           'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {console.log('Success:', response)
        if(response != undefined){
          this.setState({pfinal:false,despedida:true})
         }else {
          Alert("ERROR EN LA SOLICITUD")
         }
      });
        
        

            }

        
        onFlechaRetro=()=>{
          if(this.state.llamada){
            this.setState({llamada:false, opciones:true})
          }
          else if(this.state.contactodirecto){
            this.setState({contactodirecto:false, opciones:true})
          }
          else if(this.state.pfinal){
            this.setState({pfinal:false, llamada:true})
          }
          else{
            this.props.flechafun()
          }
        }

    render () {
console.log(this.state)
      const {pinicial, pfinal} = this.state
        return ( 

         <div >
<Animate show={pinicial}>
            <div className="maincontacto" >
            <div className="contcontacto"  >
            <img src="/static/flecharetro.png" alt="" className="flecharetro" onClick={this.onFlechaRetro}/>
                <div className="headercontact">
             
              <div className="tituloventa">
            <p> Asesoría Personalizada  </p>
                    
        </div>
        
              </div>
            <div className="marginador">
              
       
          <Animate show={this.state.opciones}>
          <p className="asesoriaT">Seleccione una opción</p>
        <div className="contsolicitador">
          <div className="optionSoporte" onClick={this.solicitarllamada}>
          <p className="titulocontactd">Solicite una Llamada</p>
           <img src="/contacto/solicitar.png" alt=""/>
          </div>
          <div className="optionSoporte"onClick={this.contactodirecto}>
          <p className="titulocontactd">Contáctenos Directamente</p>
          <img src="/contacto/contactodirecto.png" alt=""/>
          </div>

        </div>
        </Animate>

        <Animate show={this.state.llamada}>
          <div className="contTituloCont1"> 
          <p>Servicio válido para Ecuador </p>
          <img src="/contacto/banderaec.png" alt="Bandera-Ecuador" className="banderaec"/>
           </div>
        <p className="asesort"> Uno de nuestros asesores se comunicara en los proximos minutos </p>
        <div className = "contform" > 
           <p> Ingresa tu:</p>
           <ValidatorForm
   
         onSubmit={()=>{this.setState({llamada:false, pfinal:true})}}
         onError={errors => console.log(errors)}
     >
      
            <TextValidator
            label="Nombre"
             onChange={this.handleChangeform}
             name="nombre"
             type="text"
             validators={['requerido']}
             errorMessages={['Escribe tu nombre'] }
             value={this.state.clienteNombre}
         />
         <br/>
         <TextValidator
             label="Telefono"
             onChange={this.handleChangeform}
             name="telefono"
             type="tel"
             validators={['requerido', 'soloNumeros', "minimo7"]}
             errorMessages={['Escribe un número de contacto', 'Ingresa solo números',"Mínimo 7 números"]}
             value={this.state.clienteTelefono} 
         />
         <br/>
         <div className="contbotonventa">
         <button type="submit" className="botonventa FULL" >  Continuar</button>
         </div>
     </ValidatorForm>

         
               
           </div>
         

        </Animate>
        <Animate show={this.state.contactodirecto}> 
<div className="contcontactoDirecto">
 
  <div className="cdoptions">
   <a
  style={{ textDecoration: "none" }}
  target="_blank"
  rel="noopener noreferrer"
  href={`https://api.whatsapp.com/send?phone=${
    this.props?.datosTienda?.WaNumber
      ? `593${this.props.datosTienda.WaNumber.replace(/^0+/, "")}`
      : ""
  }&text=Necesito%20asesor%C3%ADa%20en%20mi%20compra`}
>
  <p className="titulocontactd"> Chatéanos</p>
<img className="chat" src="/contacto/whatsapplogo.png" alt=""/>
</a>
  </div>
  <div className="cdoptions">
  <a style={{textDecoration:"none"}} target=" _blank" href={this.props?.datosTienda?.ubicacionMaps }>
<p className="titulocontactd"> Visítenos</p>
<img className="chat" src="/contacto/logomaps.png" alt=""/>
</a>
  </div>
 

  <div className="cdoptions">

<p className="titulocontactd"> Llámenos</p>
<a
  href={`tel:${
    this.props?.datosTienda?.WaNumber
      ? this.props.datosTienda.WaNumber
      : ""
  }`}
>
  <p>{this.props?.datosTienda?.WaNumber}</p>
</a>



  </div>

  <div className="cdoptions">

<p className="titulocontactd"> Escríbanos </p>
<a
  href={`mailto:${this.props?.datosTienda?.correoNotificaciones}?Subject=Solicitud%20soporte`}
  target="_top"
>
  <p>{this.props?.datosTienda?.correoNotificaciones}</p>
</a>

  </div>
  


  
  </div>          
          
          
        </Animate>
        <Animate show={this.state.pfinal}> 
                 <div className="contPfinal">
                 <i className="icofont-handshake-deal icoIMG"></i>
                
              <p>Por favor  {`${this.state.clienteNombre} `} confirma tu número de contacto </p>
              <div className="contDatosC">
              <div className="cDc1">
              <p style={{fontWeight:"bolder"}}>  Teléfono:  </p>
            
              </div>
              <div className="cDc2">
               
               <p>{`  ${this.state.clienteTelefono} `}</p>
             
               </div>
              </div>
             
              
         
                 
             <div className="PFCbuttons">
                
                 <button className="botonventa secondary" onClick={this.onFlechaRetro} > Corregir  </button>
                 <button className="botonventa" onClick={()=>{this.sendMail(); }} > Continuar  </button>
                 </div>
                 </div>
                </Animate>
                <Animate show={this.state.despedida}> 
                  <div className="contPfinal">
                   <img src="/static/vistillo.png" className="imgventa"/>
                   <p className="subtituloArt">Exito en tu solictud </p>
                  
                <p className="comunicacionart">Nos comunicaremos en los proximos minutos. </p>

                <button  className="buttonURG"onClick={()=> {this.setState({urgente:!this.state.urgente})}}>¿Es urgente?</button>
                  <Animate show={this.state.urgente}> 
                  <div className="urgente">
                  <p>Sientete libre de contactarnos de inmediato</p>
                  <div className="datosFinalescont">
   <a
  href={`tel:${
    this.props?.datosTienda?.WaNumber
      ? this.props.datosTienda.WaNumber
      : ""
  }`}
>
  <p>{this.props?.datosTienda?.WaNumber}</p>
</a>

<a
  href={`mailto:${
    this.props?.datosTienda?.correoNotificaciones
      ? this.props.datosTienda.correoNotificaciones
      : ""
  }?Subject=Solicitud%20soporte`}
  target="_top"
>
  <p>{this.props?.datosTienda?.correoNotificaciones}</p>
</a>
                    </div>
                  </div>
                  </Animate>
                
           
                   
               <div className="PFCbuttons">
                  
                  <button className="botonventa" onClick={this.onFlechaRetro} > Continuar  </button>
                   </div>
                   </div>
                  </Animate>
            </div>
            </div>

           </div>
          
           </Animate>

         

           <style jsx>{`
             
             .contPfinal{
              display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
             }
           .imgventa{
            margin-top: 30px;
    height: 100px;
    width: 100px;
   }
   .PFCbuttons{
     margin-top:20px;

    display: flex;
    width: 100%;
    justify-content: space-around;
   }
           .cDc2{
     margin-left:10px;
   }
   .urgente{
    text-align: center;
    border: 1px solid rgba(96, 165, 250, 0.3);
    margin-top: 10px;
    border-radius: 16px;
    padding: 12px 16px;
    background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%);
    box-shadow: 0 6px 16px rgba(30, 58, 138, 0.06);
   }
   .urgente p{
  margin-top:0px;
  margin-bottom:15px;
   }
   .buttonURG{
     padding: 8px 16px;
     border-radius: 16px;
     background: linear-gradient(180deg, #fef2f2 0%, #fee2e2 100%);
     color: #991b1b;
     border: 1px solid rgba(239, 68, 68, 0.3);
     font-weight: 700;
     font-size: 0.875rem;
     cursor: pointer;
     transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
     box-shadow: 0 6px 16px rgba(239, 68, 68, 0.08);
   }
   .buttonURG:hover {
     box-shadow: 0 10px 24px rgba(239, 68, 68, 0.12);
     transform: translateY(-1px);
   }
   .buttonURG:active {
     transform: translateY(0.5px);
     box-shadow: 0 4px 12px rgba(239, 68, 68, 0.06);
   }
   .icoIMG{
     margin-top:10px;
     font-size:100px;
   }
   .contDatosC{
     display:flex;
     width: 100%;
   }
.cDc1{
  width:30%;
  text-align: right;
  
}
             .contTituloCont1{
              margin-top: 10px;
              display: flex;
              font-size: 20px;
              justify-content: center;
              align-items: center;
              font-weight: 700;
              text-align: center;
              border: 1px solid rgba(96, 165, 250, 0.4);
              border-radius: 22px;
              background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%);
              color: #1d4ed8;
              padding: 12px 16px;
              box-shadow: 0 6px 16px rgba(30, 58, 138, 0.08);
             }
             .contTituloCont1 p{
               margin-top:5px;
               margin-bottom:5px;
             }

.cdoptions{
  width: 40%;
    word-break: break-all;
    margin-left: 4%;
    margin-right: 4%;
    margin-top: 20px;
    border-radius: 16px;
    padding: 12px;
    background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
    border: 1px solid rgba(226, 232, 240, 0.85);
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.06);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.cdoptions:hover {
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.1);
  transform: translateY(-1px);
}
           .headercontact {

            display:flex;
            justify-content: space-around;

           }

.chat{

width:100px;
margin: 5px
}


           .contbotonventa{
             display:flex;
             justify-content:center;
             width:100%;
           }

.asesoriaT{
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
  border: 1px solid rgba(226, 232, 240, 0.85);
  border-radius: 16px;
  margin-bottom: 10px;
  padding: 12px 16px;
  color: #0f172a;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.06);
}

             .botonventa{
              margin-top: 17px;
    border-radius: 16px;
    background: linear-gradient(180deg, #f0fdf4 0%, #dcfce7 100%);
    box-shadow: 0 6px 16px rgba(22, 101, 52, 0.12);
    color: #166534;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    height: 40px;
    line-height: 1;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    border: 1px solid rgba(34, 197, 94, 0.3);
    width: 40%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
             }
             .botonventa:before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 1px;
              background: rgba(255, 255, 255, 0.8);
             }
             .botonventa:hover {
              box-shadow: 0 10px 24px rgba(22, 101, 52, 0.15);
              transform: translateY(-1px);
             }
             .botonventa:active {
              transform: translateY(0.5px);
              box-shadow: 0 4px 12px rgba(22, 101, 52, 0.1);
             }
             .botonventa.secondary {
              background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%);
              color: #1d4ed8;
              border: 1px solid rgba(96, 165, 250, 0.4);
              box-shadow: 0 6px 16px rgba(30, 58, 138, 0.12);
             }
             .botonventa.secondary:before {
              background: rgba(255, 255, 255, 0.8);
             }
             .botonventa.secondary:hover {
              box-shadow: 0 10px 24px rgba(30, 58, 138, 0.15);
              transform: translateY(-1px);
             }
             .botonventa.secondary:active {
              transform: translateY(0.5px);
              box-shadow: 0 4px 12px rgba(30, 58, 138, 0.1);
             }
          .contsolicitador{

            display:flex;
            width:100%;
            flex-wrap: wrap;
            justify-content: space-around;
         text-align: center;
         font-size:20px;
          }
          .optionSoporte{
            width: 44%;
            min-width: 180px;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
    border-radius: 22px;
    padding-bottom: 5%;
    padding-top: 16px;
    padding-left: 8px;
    padding-right: 8px;
    height: 290px;
    word-break: break-word;
    cursor: pointer;
    flex-flow: column;
    display: flex;
    justify-content: space-around;
    margin: 14px 0px;
    align-items: center;
    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
    border: 1px solid rgba(226, 232, 240, 0.85);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
          }
          .optionSoporte:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 22px 22px 0 0;
          }
          .optionSoporte:hover {
            box-shadow: 0 24px 48px rgba(15, 23, 42, 0.12);
            transform: translateY(-2px);
          }
          .optionSoporte:active {
            transform: translateY(0px);
            box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
          }
          .optionSoporte img {
    width: 100%;
    max-width: 120px;
}
        
        .maincontacto{
          z-index: 9999;
                width: 100%;
         height: 100vh;
         background-color: rgba(15, 23, 42, 0.52);
         backdrop-filter: blur(4px);
         left: 0px;
         position: fixed;
         top: 0px;
         display: flex;
         justify-content: center;
         align-items: center;
         
       }
       .contcontacto{
        border-radius: 26px;
        width: 90%;
        background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        box-shadow: 0 32px 90px rgba(15, 23, 42, 0.22);
        border: 1px solid rgba(226, 232, 240, 0.8);
      }
       .marginador{
         margin: 0px 35px 15px 35px;
         color: black;
         
         display: flex;
         flex-flow: column;
         align-items: center;
   
       }
   
       .asesort{
        margin-top: 20px;
  
         text-align: center;
         font-size: 20px;
         margin-bottom: 0;
       }
       .engrane{
         height: 75px;
       }
   
       .banderaec{
         width: 40px;
         height: 40px;
         margin: 10px;
   
       }
   
       .tituloventa{
         display: flex;
         align-items: center;
         font-size: 30px;
         font-weight: bolder;
         text-align: center;
         justify-content: center;
       }
       .tituloventa p{
         margin-top:5px;
         margin-bottom:5px
       }
     
       .flecharetro{
         height: 40px;
         width: 40px;
         padding: 5px;
       }
          
       body {
            height:100%

           }

           .contform{
            padding-bottom: 25px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
           }

          .contcontactoDirecto{
        
         
            text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
          }
        

          .titulocontactd{
            font-size: 18px;
            font-weight: 700;
            color: #0f172a;
            height: 35%;
            letter-spacing: 0.03em;
            text-transform: capitalize;
          }
          .FULL{
               width:60%
             }
             @media only screen and (max-width: 320px) { 
               .subtituloArt{
                margin-top:2px;
                margin-bottom:2px;
               }
               .comunicacionart{
                 margin-bottom:2px;
               }
               .marginador{
                margin: 0px 2px 15px 2px;
               }
         .contcontacto{
          width: 95%;
         }
          }
          @media only screen and (min-width: 600px) { 
         

              .contcontacto{
       
         width: 70%;
      
      
       }
          }
          @media only screen and (min-width: 950px) { 
           
              .imgventa{
            margin-top: 40px;
    height: 150px;
    width: 150px;
   }
          }
          
           `}</style>
        

          
           </div>
        )
    }
}

export default Contacto