import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GoogleIcon from '@mui/icons-material/Google';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
export default function Footer() {


  const [clienteNombre, setclienteNombre] = useState("")
  const [clienteEmail, setclienteEmail] = useState("")

  useEffect(()=>{
    ValidatorForm.addValidationRule('requerido', (value) => {
      if (value === "") {
          return false;
      }
      return true;
  });
    })



const handleChangeform = (e)=>{

  console.log(e.target.name)
if(e.target.name == "clienteNombre"){
  setclienteNombre(e.target.value)
}else if(e.target.name == "clienteEmail"){
  setclienteEmail(e.target.value)
}
}

    return(<div className="MainFooter ">

<div className="justContFlex footerimage jwfull jwFlexWrap contFooter">
  <div className="contP">
  <Image src="/ramgaslogo.png" 
alt="logo" 

height={100}
width={300} 


/>

<p className='footerDescrip'>Aliquam mauris erat, volutpat bibendum ornare, vulputate eu justo. Curabitur pretium ultrices lobortis. Aenean pellentesque hendrerit eros, et ornare lacus aliquam eget. Duis tempor ante sed ultricies maximus. Nulla gravida erat sed nisi. </p>

<div className="BotoneraLight">
<FacebookIcon/>
<InstagramIcon/>
<YouTubeIcon/>
<GoogleIcon/>
</div>
  </div>
  <div className="contS">
    <p className='subtituloFooter'>
    Nuestros Servicios
    </p>
    <ul className='ulfoo'>
      <li>Distribucion</li>
      <li>Mantenimiento</li>
      <li>Envios</li>
      <li>Domicilios</li>
    </ul>

  </div>
  <div className="contS">
  <p className='subtituloFooter'>
    Nuestros Articulos
    </p>
    <ul className='ulfoo'>
      <li>Ampliamiento de area de servicio</li>
      <li>Mejoramos la atencion al cliente</li>
      <li>zona covertura mejorada</li>
      <li>Mejoramos todo</li>
    </ul>
  </div>
  <div className="contS">
  <p className='subtituloFooter'>
  Registrate
    </p>


    <ValidatorForm
          
          onSubmit={()=>{console.log("en sub")}}
          onError={errors => console.log(errors)}
      >
       <div className="inputorganize">

             <TextValidator
             id="nombreinput"
             label="Nombre"
              onChange={handleChangeform}
              name="clienteNombre"
              type="text"
              validators={['requerido']}
              errorMessages={['Escribe tu nombre'] }
              value={clienteNombre}
          />
      
          <TextValidator
               id="emailinput"
              label="E-mail"
              onChange={handleChangeform}
              name="clienteEmail"
              type="text"
              validators={['requerido']}
              errorMessages={['Escribe tu correo Electronico']}
              value={clienteEmail} 
          />
        
          
      

          <button type="submit" className="botonventa footerbot" >  Enviar</button>
          </div>
      </ValidatorForm>
  </div>

</div>
<div className='baseFinal'>
Copyrights © 2023 All Rights Reserved by JW Development.

</div>
          <style jsx>{`
.baseFinal{
  background: black;
  color: white;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

      .ulfoo{
      
    font-size: 19px;
    line-height: 56px;
    text-decoration: underline;

    font-style: italic;

      }
          .footerDescrip{
            font-size:18px;
            text-align: justify;
            line-height: 2;
            font-style: italic;
            width: 90%;
          
          
          }
          .contP{
            margin:20px 10px;
            display: flex;
            flex-flow: column;
            width: 30%;
          
            min-width: 370px;
          }
          .contS{
            margin:20px 10px;
            display: flex;
            flex-flow: column;
            width: 18%;
            min-width: 325px
       
          }
.contFooter{
  justify-content: space-around;
  padding-top: 30px;
}
          
          .MainFooter{
            background:white;
            z-index: 1;
            flex-flow: column;
            position: relative;
            display: flex;
           
          }
 
 `}
</style>
    </div>)
}