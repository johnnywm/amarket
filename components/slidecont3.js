import React, { useState, useEffect } from 'react';

import Animate from 'react-animate-mount/lib/Animate';
import dynamic from 'next/dynamic'
import postal from 'postal';
import Soporte from "./soporte"


export default  function Slide3() {

   
  let  channel3 = postal.channel();


    return (  

        <div className='fondoPrincipal imgcont3'>


<div className="contGeneral">
    <div className="subContGeneralSlide3"> 
<div className="textanim3">
    <div className="fondobanimSlide2">
   
         <span className="subtext3"> 
         <img src="/portadas/p3/st.png" className='stimg' />
    <p className='submainText' style={{lineHeight:"60px"}}>Servicio Técnico Profesional <span className='enfasistext'>Multimarca</span></p>
    
    </span>
    </div>
    </div>
<div className='centrar'>
<div className="textanim2Slide3"> 
    <p >
      Cotiza tu reparación 
    </p>
   
    <button onClick={()=>{
 channel3.publish('contactomodal', {
    message: 'enviado desde reset'
 });

    }}   className="botoncontact enfasis">Solicita  &gt; </button>
    </div>
    </div>
    </div>

    </div>
<div className='contArrow'>
    <a className="ca3-scroll-down-link ca3-scroll-down-arrow" data-ca3_iconfont="ETmodules" data-ca3_icon=""></a>
    </div>

  
    <style>
        {
        `
        .fondobanimSlide2{
            border-radius: 20px;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    height: 300px;
    align-items: flex-start;
        }
        .stimg{
            width:100px;
        }
        .textanim3 {
            position: relative;
            text-align: center;
            animation-name: mainani;
            animation-duration: 3s;
            animation-delay: 2s;
            animation-fill-mode: both;
            margin-top: 80px;
        }
         .subContGeneralSlide3{
                width: 90%;
    font-family: "Bitter";
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
         }
         .textanim2Slide3 {
            position: relative;
            font-size: 30px;
            font-weight: 100;
            text-align: center;
            border-radius: 15px;
            color: black;
            padding: 17px;
            margin-bottom: 35px;
            background: #f5f5f5eb;
            font-family: sans-serif;
            max-width:500px;
        }
         .subtext3{

            margin: 0;
            color: #000000;
            /* text-decoration: underline; */
            font-size: 30px;
            background: rgba(255, 255, 255, 0.9098039216);
            padding: 11px;
            /* margin-top: 26px; */
            border-radius: 29px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
          
    
            flex-flow: column;
            max-width: 300px;
    width: 65%;
         }
         .fondoimagenSlide3{
            object-fit:cover;
           
        }
       
         @media screen and (max-width: 700px) {
            .fondoimagenSlide3{
                object-fit:cover;
                object-position: 63%;
            }
         }

        `}

    </style>
        </div>
    );
}

