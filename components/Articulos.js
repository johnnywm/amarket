//import Background from "../public/arts/calefaccion.jpg"
import Link from "next/link"

export default function example() {



    return(<div>

<div className='contFlex contArts'>
    <div className="conttitulo customTitleArts">
    <p className='tituloBaner '>Articulos </p>
<p className='  subtituloBanner3 '>Información</p>

    </div>



<div className="contArticulos">

<div className="mainContArt">
<div className="contArtImg" >
<img src="/arts/art3.png" className="artimg"/>
</div>
 <div className="contTexto paddingTexto ">
			<h3 className='jwlowpadding tituloArtic'>Exapansion de Mercado</h3>
			<p className='jwlowpadding descripcionproducts '>Estamos emocionados de anunciar nuestra expansión nacional en la distribución de repuestos para celular y computadora. Ofrecemos calidad premium, entrega rápida y un catálogo excepcional para satisfacer las crecientes demandas del mercado. ¡Construyendo conexiones confiables y duraderas en todo el país!</p>

         <a href="/blog/Expansión-Estratégica" className="buttonseller">Saber más</a>
		</div>
</div>
<div className="mainContArt">
<div className="contArtImg" >
<img src="/arts/art2.png" className="artimg"/>
</div>
 <div className="contTexto paddingTexto ">
			<h3 className='jwlowpadding tituloArtic'>Técnicos Profesionales</h3>
			<p className='jwlowpadding descripcionproducts '>Contamos con un equipo de técnicos altamente capacitados, expertos en las últimas tecnologías. Su dedicación garantiza soluciones precisas y eficientes, respaldando nuestra promesa de calidad. Confía en nosotros para la excelencia en cada servicio técnico.</p>

            <a href="/blog/Excelencia-Técnica:-Nuestra-Fuerza-en-la-Reparación-de-Teléfonos-y-Computadoras" className="buttonseller">Saber más</a>
		</div>
</div>
<div className="mainContArt">
<div className="contArtImg" >
<img src="/arts/art1.png" className="artimg"/>
</div>
 <div className="contTexto paddingTexto ">
			<h3 className='jwlowpadding tituloArtic'>Herramientas especializadas</h3>
			<p className='jwlowpadding descripcionproducts '>Nuestra empresa proporciona a nuestros técnicos y clientes, herramientas de alta calidad para garantizar un rendimiento óptimo en cada proceso. Con equipos de vanguardia, estamos comprometidos a ofrecer servicios excepcionales y resultados superiores en cada caso de reparación.</p>

            <a href="/blog/Servicio-técnico-a-tu-alcance" className="buttonseller">Saber más</a>
		</div>
</div>

</div>
</div>

          <style jsx>{`
          .customTitleArts{
            display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
          }
          .paddingTexto{
            padding:25px;
          }
          .tituloArtic{
            font-size: 30px;
          }
          .artimg{
            width: 100%;
            height: 100%;
          }
          .mainContArt{
            border: 2px outset grey;
            margin: 15px;
            margin-bottom:30px;
            border-radius: 8px;
            max-width: 350px;
            background: whitesmoke;
          }
          .contArtImg{
            height:300px
          }
          .contArts{
            background: linear-gradient(180deg,rgb(255 255 255)18%,rgb(221 221 221)50%);
            flex-flow: column;
            z-index: 1;
            position: relative;
            
          }
          .contArticulos{
            display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 200px;
}
          }
 
 `}
</style>
    </div>)
}