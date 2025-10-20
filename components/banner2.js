import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GppGoodIcon from '@mui/icons-material/GppGood';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { Animate } from 'react-animate-mount/lib/Animate';
import React, { useState, useEffect } from 'react';



export default function banner2() {
    const [view1, setview1] = useState(false)
    const [view2, setview2] = useState(false)
const [view3, setview3] = useState(false)
const [view4, setview4] = useState(false)
    return ( <div className='contFlex darkBack banner2' >
<div className='contClaveValor'>

<div className='claveIco'>
    <HandshakeIcon style={{color:"#8a0916",fontSize:"70px"}}   />
</div>
<div className='valorIco'>

<h2>Confianza </h2>
<p>  Con integridad, calidad y transparencia, construimos relaciones sólidas y duraderas.
     {view1 == false && <span className='vermasmenos'onClick={()=>{setview1(true)}}> ver más</span>}
    <Animate show ={view1}>
    Nuestra empresa se distingue por la confianza que generamos, garantizando la satisfacción y lealtad de nuestros clientes.
    <span className='vermasmenos' onClick={()=>{setview1(false)}}> ver menos</span>
    </Animate>
    </p></div>
</div>
<div className='contClaveValor'>

<div className='claveIco'>
    <LocalShippingIcon style={{color:"rgb(207 55 45)",fontSize:"70px"}}   />
</div>
<div className='valorIco'>

<h2>Delivery </h2>
<p> Puntualidad, cuidado y eficiencia son la esencia de nuestro servicio de entrega.
{view2 == false && <span className='vermasmenos'onClick={()=>{setview2(true)}}> ver más</span>}
<Animate show ={view2}>
Ofrecemos un servicio de entrega excepcional, rápido y confiable para garantizar la satisfacción de nuestros clientes.
    <span className='vermasmenos' onClick={()=>{setview2(false)}}> ver menos</span>
    </Animate>
</p>

</div>
</div>
<div className='contClaveValor'>

<div className='claveIco'>
    <GppGoodIcon style={{color:"#8a0916",fontSize:"70px"}}  />
</div>
<div className='valorIco'>

<h2>Seguridad </h2>
<p>Priorizamos la seguridad de nuestros clientes con medidas robustas.
{view3 == false && <span className='vermasmenos'onClick={()=>{setview3(true)}}> ver más</span>}
<Animate show ={view3}>
Desde la calidad del producto hasta la protección de datos, nos comprometemos a brindar una experiencia confiable y tranquila en todo momento.
    <span className='vermasmenos' onClick={()=>{setview3(false)}}> ver menos</span>
    </Animate>
</p>
    

</div>
</div>
<div className='contClaveValor'>

<div className='claveIco'>
    <ManageAccountsIcon style={{color:"rgb(207 55 45)",fontSize:"70px"}}  />
</div>
<div className='valorIco'>

<h2>Logistica </h2>
<p>Optimizamos la logística para ofrecer a nuestros clientes un servicio eficiente y sin contratiempos.
{view4 == false && <span className='vermasmenos'onClick={()=>{setview4(true)}}> ver más</span>}
    
     <Animate show ={view4}>
     Desde el almacenamiento hasta la entrega, garantizamos precisión, puntualidad y una experiencia de compra sin complicaciones
    <span className='vermasmenos' onClick={()=>{setview4(false)}}> ver menos</span>
    </Animate>
     
      </p>
</div>
</div>

    </div> );
}

