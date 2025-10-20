import React, { useState, useEffect } from 'react';
import Image from "next/image"
import Animate from 'react-animate-mount/lib/Animate';
import dynamic from 'next/dynamic'
import Link from "next/link"

const Contacto = dynamic(() => import('./subcompo/modalhook'), {
    loading: () => 'Loading...',
  })

export default  function Slide1() {

    const [contacto, setContacto] = useState(false)



    return (  

        <div className='fondoPrincipal imgcont2'>


<div className="contGeneral">
    <div className="subContGeneralSlide2"> 
<div className="textanim1">
    <div className="fondobanimSlide2">
 
    <span className="subtext2"> 
   
    <p className='submainText'>Soporte total en </p>
    <span className=' simpleEnf'>Laptops </span>
    </span>
    </div>
    </div>

<div className="textanim2Slide2"> 
<div className='jwContDual'>
<Link href="/tienda?grupo=COMPUTADOR&categoria=PANTALLA%20LAPTOP">
<a>
   
    
        <div className='contImgPortada'>
        <img src='/portadas/p2/display.png' className='imgportada' /> 
        </div>
        <p>Pantallas</p>
   
    </a>
    </Link>
    </div>
    <div className='jwContDual'>
    <Link href="/tienda?grupo=COMPUTADOR&categoria=BATERIA%20LAPTOP">
<a>
    <div className='contImgPortada'>
        <img src='/portadas/p2/bateria.png' className='imgportada' /> 
        </div>
        <p>Baterias</p>
        </a>
    </Link>
    </div>
    <div className='jwContDual'>
    <Link href="/tienda?grupo=COMPUTADOR&categoria=CARGADOR%20LAPTOP">
<a>
    <div className='contImgPortada'>
        <img src='/portadas/p2/cargador.png' className='imgportada' /> 
        </div>
        <p>Cargadores</p>
        </a>
    </Link>
    </div>
    <div className='jwContDual'>
    <Link href="/tienda?grupo=COMPUTADOR&categoria=DISCO%20LAPTOP">
<a>
    <div className='contImgPortada'>
        <img src='/portadas/p2/disco.png' className='imgportada' /> 
        </div>
        <p>Discos</p>
        </a>
    </Link>
    </div>
    </div>

    </div>

    </div>
<div className='contArrow'>
    <a className="ca3-scroll-down-link ca3-scroll-down-arrow" data-ca3_iconfont="ETmodules" data-ca3_icon=""></a>
    </div>

    <Animate show={contacto}>
<Contacto onFlechaRetro={()=>{setContacto(false)}} />
    </Animate>
    <style>
        {
        `
        .setColor{
            color:Black;
        }
    
        .fondobanimSlide2{
            border-radius: 20px;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    height: 300px;
    align-items: flex-start;
        }
         .subContGeneralSlide2{
                width: 90%;
    font-family: "Bitter";
    height: 96%;
    display: flex;
    flex-flow: column;
    
         }
    
         .textanim2Slide2 {
            position: relative;
            font-size: 30px;
            font-weight: 100;
            text-align: center;
            border-radius: 15px;
       
            display: flex;
    justify-content: space-around;
        flex-wrap:wrap;
            font-family: sans-serif;
           
        }
        .jwContDual{
            margin: 5px 0px;
            background: #f5f5f5eb;
            border-radius: 20px;
            padding: 15px;
            border-bottom: 4px solid black;
            min-width: 140px;
            width: 20%;
            display: flex;
            flex-flow: column;
            word-wrap: break-word;
            justify-content: space-around;
            font-size: 25px;
            cursor:pointer;
    max-width: 190px;
        }
       
        .contImgPortada{
            height: 70%;
       
    justify-content: center;
    display: flex;
    align-items: center;
        }
        .imgportada{
            width: 100%;
        }
         .subtext2{

            margin: 0;
            color: #000000;
            /* text-decoration: underline; */
            font-size: 30px;
            background: rgba(255, 255, 255, 0.9098039216);
            padding: 11px;
            /* margin-top: 26px; */
            border-radius: 29px;
            text-align: left;
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 500px;
            flex-flow:column;
         }
        `}

    </style>
        </div>
    );
}

