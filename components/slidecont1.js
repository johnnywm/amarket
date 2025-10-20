import React, { useState, useEffect } from 'react';

import Animate from 'react-animate-mount/lib/Animate';
import dynamic from 'next/dynamic'

import Link from 'next/link';
const Contacto = dynamic(() => import('../components/subcompo/modalhook'), {
    loading: () => 'Loading...',
  })

export default  function Slide1() {

    const [contacto, setContacto] = useState(false)



    return (  

        <div  className='fondoPrincipal imgcont1'>


<div className="contGeneral">
    <div className="subContGeneral"> 
<div className="textanim1">
  
    <h1 className="maintext">Distribución de Repuestos</h1>
    <span className="subtext">Celulares - Laptop - Consolas</span>
  
    </div>

<div className="textanim2">
<h2 >
     Encuentra la mejor calidad al precio mas competitivo
    </h2>
    
    <div className="bannerbotones">
    <Link href="/tienda" >
    <button  className="botoncontact enfasis">Compra
     &nbsp;&nbsp; &gt; </button>
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
        </div>
    );
}

