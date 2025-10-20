
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import Link from "next/link"

function ContProducts() {

    const slides = [
        { title: 'Display de  Laptop', 
        description: 'Pantallas de laptop de alta calidad ofrecen colores vibrantes, nitidez impresionante y tecnología avanzada para una experiencia visual inigualable.', 
        image:"/products/laptopBanner.png",precio:"50 - $130", link:"/tienda?grupo=COMPUTADOR&categoria=PANTALLA%20LAPTOP"},
        
        { title: 'Pantalla Celulares', description: 'Amplia game de calidades, TFT, OLED, INCELL, etc. Nos adaptamos a tu presupuesto y necesidades específicas. ',
        image:"/products/celularbanner.png",precio:"30 - $400",link:"/tienda?grupo=CELULAR&categoria=PANTALLA"},

        { title: 'Consolas', description: 'Consolas de videojuegos de última generación: potencia sin igual, gráficos envolventes, y experiencias de juego inigualables para emociones sin límites. ',
        image:"/products/consolasbanner.png",precio:"300 - $800",link:"/tienda?grupo=CONSOLA"},

        { title: 'Cables', description: 'Cables  de última tecnología: carga rápida, durabilidad premium y conexiones fiables, diseñados para un rendimiento excepcional y sin complicaciones',
        image:"/products/bannerCable.png",precio:"1-$10",link:"/tienda?grupo=CELULAR&categoria=CABLE"},
      ];
    return ( <div className=' whiteBack ContProducts' >

<div className='jwcontFlex jwcolumna  jwfull conttitulo'>
<p className='productStylesub jwlowmarginleft'>Nuestros </p>
<p className='  productStyle jwlowmarginleft'>Productos</p>
</div>

<Slider autoplay={5000} touchDisabled>
{slides.map((item, index) => (
	<div
		key={index}
		style={{ background: `no-repeat center center` }}
        className="jwContResponsive"  
	>
		<div className="center jwlowpadding ">
			<h1 className='jwlowpadding'>{item.title}</h1>
			<p className='jwlowpadding descripcionproducts'>{item.description}</p>
           <div className='contPreciongen'>
            <p className='jwlowpadding preciotext'>${item.precio}</p>
            <Link href={item.link}>
            <a style={{textDecoration:"none"}}>
            <div className='conBotonflexend'> <button  className="mybutton">Comprar</button></div>
            </a>
    </Link>
    </div>
		</div>
        <div className="jwcontFlex"> 
            <img src={item.image} className="Productsimg jwlowpadding"></img>
        </div>
	</div>
))}
</Slider>

    </div> );
}

export default ContProducts;