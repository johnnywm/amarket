import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GoogleIcon from '@mui/icons-material/Google';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
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
    <div>
  <Image src="/logodtccompleto.jpg" 
alt="logo" 
style={{borderRadius:"15px"}}
height={160}
width={200} 


/></div>
<p className='footerDescrip'>Nuestra misión es superar las expectativas de nuestros clientes. Brindamos productos/servicios excepcionales con compromiso, integridad y atención personalizada, creando experiencias que fortalecen conexiones y fomentan la lealtad. </p>

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
     <Link href="/blog/Distribución"><a > <li>Distribución</li></a></Link>
     <Link href="/blog/Mantenimiento-Preventivo-y-correctivo"><a >    <li>Mantenimiento</li></a></Link>
     <Link href="/blog/Asesoria-Tecnica-Profesional"><a >   <li>Asesoría</li></a></Link>
     <Link href="/blog/Excelencia-Técnica:-Nuestra-Fuerza-en-la-Reparación-de-Teléfonos-y-Computadoras"><a >   <li>Servicio Técnico</li></a></Link>
    </ul>

  </div>
  <div className="contS">
  <p className='subtituloFooter'>
    Nuestros Articulos
    </p>
    <ul className='ulfoo'>
    <Link href="/blog/Servicio-técnico-a-tu-alcance"><a >    <li>Servicio técnico a tu alcance</li></a></Link>
    <Link href="/blog/Mejoramos-la-atencion-al-cliente"><a >    <li>Mejoramos la atencion al cliente</li></a></Link>
    <Link href="/blog/Ubicados-Estrategicamente"><a >     <li>Ubicados Estrategicamente</li></a></Link>
  
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
      
    font-size: 12px;
    line-height: 25px;
    text-decoration: underline;

    font-style: italic;

      }
          .footerDescrip{
            font-size:12px;
            text-align: justify;
            line-height: 2;
            font-style: italic;
            width: 90%;
            background: white;
            padding: 10px;
            border-radius: 15px;
            margin-top: 30px;
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
            min-width: 250px
       
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
          .BotoneraLight{
            display: flex;
    justify-content: space-around;
    margin-top: 30px;
    background: #ffffffad;
    border-radius: 20px;
}
          }
 
 `}
</style>
    </div>)
}