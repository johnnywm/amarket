import Animate from 'react-animate-mount/lib/Animate';
import React, { useState, useEffect } from 'react';

function Modalhook({onFlechaRetro}) {
    const [visual, setvisual] = useState(false)
   const onSalida =()=>{
        onFlechaRetro()
        setTimeout(()=>{setvisual(false)},100)
      }
    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
      setTimeout(()=>{setvisual(true),100})
      });
      
    return (<div>
<Animate show={visual}>
<div className='maincontacto'>
<div className='contcontacto'>
    en contact
    <img src="/flecharetro.png" alt="" className="flecharetro" onClick={onSalida}/>
                <div className="headercontact">
             
              <div className="tituloventa">
            <p> Asesoría Personalizada  </p>
                    
        </div>
        
              </div>
    </div>  
</div>
</Animate>

    </div>  );
}

export default Modalhook;