import Background from "../public/arts/calefaccion.jpg"
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
<img src="/arts/calefaccion.jpg" className="artimg"/>
</div>
 <div className="contTexto paddingTexto ">
			<h3 className='jwlowpadding tituloArtic'>Exapansion de mercado</h3>
			<p className='jwlowpadding descripcionproducts '>La vía más importante del sur de la urbe porteña desde ahora cuenta con la energía de Duragas Pro en la estación de servicio Terpel, ubicada en la avenida 25 de julio.</p>

            <a href="#" className="buttonseller">Saber más</a>
		</div>
</div>
<div className="mainContArt">
<div className="contArtImg" >
<img src="/arts/gas-empresas.jpg" className="artimg"/>
</div>
 <div className="contTexto paddingTexto ">
			<h3 className='jwlowpadding tituloArtic'>Distribucion para Restaurantes</h3>
			<p className='jwlowpadding descripcionproducts '>La vía más importante del sur de la urbe porteña desde ahora cuenta con la energía de Duragas Pro en la estación de servicio Terpel, ubicada en la avenida 25 de julio.</p>

            <a href="#" className="buttonseller">Saber más</a>
		</div>
</div>
<div className="mainContArt">
<div className="contArtImg" >
<img src="/arts/servicio-oficial.jpg" className="artimg"/>
</div>
 <div className="contTexto paddingTexto ">
			<h3 className='jwlowpadding tituloArtic'>Profesionales altamente capacitados</h3>
			<p className='jwlowpadding descripcionproducts '>La vía más importante del sur de la urbe porteña desde ahora cuenta con la energía de Duragas Pro en la estación de servicio Terpel, ubicada en la avenida 25 de julio.</p>

            <a href="#" className="buttonseller">Saber más</a>
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
            max-width: 400px;
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