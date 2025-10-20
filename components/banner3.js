
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Image from 'next/image';
function banner3() {
    return ( <div className='contFlex darkBack banner3' >

<div className='jwcontBanner3 darkBackGradient'>
<p className='tituloBaner3 '>Te ofrecemos los mejores servicios </p>
<p className='  subtituloBanner3 '>Accede de forma rapida a:</p>
</div>

<div className='fondomainIcons'>
<div className='contClaveValorAlt2 '>

<div className='claveIcoAlt2'>
<Image src="/banner3/call.gif" 
    width={80}
    height={80}
    />
</div>
<div className='valorIcoAlt2'>

<h2>WhatsApp </h2>

</div>
</div>
<div className='contClaveValorAlt2 '>

<div className='claveIcoAlt2'>
<Image src="/banner3/repair-tools.gif" 
    width={100}
    height={100}
    />
</div>
<div className='valorIcoAlt2'>

<h2>Servicios </h2>

</div>
</div>
<div className='contClaveValorAlt2 '>

<div className='claveIcoAlt2'>
<Image src="/banner3/social-engagement.gif" 
    width={100}
    height={100}
    />
</div>
<div className='valorIcoAlt2'>

<h2>Información </h2>

</div>
</div>
<div className='contClaveValorAlt2 '>

<div className='claveIcoAlt2'>
<Image src="/banner3/bill.gif" 
    width={100}
    height={100}
    />
</div>
<div className='valorIcoAlt2'>

<h2>Facturación Electrónica </h2>

</div>
</div>
<div className='contClaveValorAlt2 '>

<div className='claveIcoAlt2'>
<Image src="/banner3/mobile-app.gif" 
    width={100}
    height={100}
    />
</div>
<div className='valorIcoAlt2'>

<h2>Aplicación Web</h2>

</div>
</div>
</div>
  <style jsx>{`
 
        .fondomainIcons{
            padding-top: 30px;
            background: white;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

        }`}
    </style>
    </div> );
}

export default banner3;