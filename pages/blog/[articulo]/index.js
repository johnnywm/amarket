import React, { Component } from 'react'
import Link from 'next/link'
import ProductDetailComponent from '../../../reduxstore/components/ProductDetail/ProductDetail';

import ProductSlider from "../../../reduxstore/components/ProductSlider/ProductSlider";
import { Convertidor } from '../../../components/reusable/convertidorFecha';
import {connect} from 'react-redux';
import Footer from "../../../components/footer"
 class ProductDetail extends Component {
  static async getInitialProps(ctx) {
    const art = ctx.query.articulo.replaceAll("__","/").replaceAll("-"," ")

  let datos = {Userdata: {DBname:process.env.EMARKET_DATA_BASE,

  },          
  Titulo:art,
}


let deployUrl  = `${process.env.URL_BACKEND_SERVER}/public/getpubbyname`

let testUrl  = "http://localhost:3000/public/getpubbyname"

let datafetch = await fetch(deployUrl, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(datos), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
})

let jsondata = await datafetch.json();

  
    return jsondata
  }

 maincompoRef = React.createRef();

    state={
      ondesktop:false,
      stickyElement:false,
    }

    componentDidMount(){
   
      this.desktopverifi()
   
      let baseElement=   this.maincompoRef.current.clientHeight + 110

      window.addEventListener('scroll', (event) => {
      
       
        const scrollTop = window.scrollY + window.innerHeight
       
        if(this.state.ondesktop){
         
          
          if(  scrollTop >= baseElement ){
       
            this.setState({stickyElement:true})
          
          }else{
            this.setState({stickyElement:false})
          }
        }
      })
      window.addEventListener('resize',()=>{
      
        this.desktopverifi()
         })
    }
    desktopverifi(){
      if(window.document.body.clientWidth >= 1100){
        this.setState({ondesktop:true})


       
      } else if(window.document.body.clientWidth < 1100){
        this.setState({ondesktop:false})
      }
    }
    render(){

console.log(this.props)
  let imagen = ""
  let productoElegido
  let   publicHTML=""
  let Titulo = ""
  let Fecha=""
  let Publicaciones=""
  let sticky = this.state.stickyElement?"stickyon":"stickyoff"

  if(this.props.findArt){
    publicHTML=this.props.findArt.publicHtml
    imagen=this.props.findArt.Imagen[0]
    Titulo=this.props.findArt.Titulo
    Fecha=  Convertidor(this.props.findArt.Tiempo)
  }
  if(this.props.pubAts ){
   
    Publicaciones=this.props.pubAts.map(x=>{
      const handleRoot = ()=>{
                  
        let sinslash = x.Titulo.replaceAll("/", "__").replaceAll(/ /g, "-")
     
        const as = `/blog/${sinslash}`;
  
    return(`/blog/[articulo]/`,as)
    }
      return(
        <Link href={handleRoot()}><a style={{height:'100%', width:'100%'}}>
      <div className='jwDualCont' >
        <div className='dualImg'>
     
          <img src={x.Imagen[0]} />
        </div>
        <div className='dualTitle' >
          <p> {x.Titulo}</p>
        </div>
      </div>
      </a></Link>   
) })
  }
    return (
        <div className="" style={{paddingTop: "100px"}}>
            
            <div className="card">
              <div className="contFlex">
              <div   className="contCompo">
              <div  ref={this.maincompoRef} className={`subContCompo ${sticky}`}>
              <p>{Fecha}</p>
              <div>
              <img className='imgArt' src={imagen}/>
              <p className='subtituloArt'>{Titulo}</p>
              </div>
              <div className='contPublicaciones'>
                <p className='subtitlepub'> Publicaciones Recientes </p>
{Publicaciones}
              </div>
             </div>
            </div>
          
            <div className='htmlcontent'   dangerouslySetInnerHTML={{ __html: publicHTML}}></div>
        
            <Footer />
            </div>
         
            </div>

            <style >{`

            .dualImg{
              width:35%
            }
            .dualTitle{
              width:50%
            }
            .dualImg img{
              width:100%;
              border-radius: 50%;
              height:100%;
            }
.subtitlepub{
  font-size: 25px;
    text-align: center;
    margin: 28px 0px;
    font-weight: bold;
    color: darkblue;
}
            .jwDualCont{
              display: flex;
        
              margin-top:15px;
              justify-content: space-around;
    align-items: center;
    background: white;
    padding: 4px;
    border-radius: 23px;
    border-bottom: 3px solid black;
    cursor: pointer;
    min-height: 120px;
            }
            .imgArt{
              width: 100%;
    border-radius: 16px;
            }
            #u_body{
                    
              border-radius: 15px;
            }
            .htmlcontent{
              border-radius: 20px;
          
              max-width: 740px;
            
              border-radius: 15px;
            }
            .contFlex{
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
          
           
            
            }
            .contPublicaciones{
              display: flex;
              border-radius: 15px;
             
              flex-flow: column;
              margin-top:35px;
              background: whitesmoke;
    padding: 20px;
    box-shadow: inset 0px 0px 9px 1px grey;
}



            }
                .contCompo{
              
                    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
margin-bottom:10px;
    color: black;
    flex-flow: column;
   
    border-radius: 15px;
                }
                .subContCompo{
                  width: 100%; 
                }
                .stickyon{
                  position: fixed;
                  width: 30%; 
                  bottom: 0px;
                }
                
                @media only screen and (min-width: 1100px) { 
                  .htmlcontent{
                   
                    margin-right:10px;
                  }
                  .contCompo{
                    display: flex;
    flex-wrap: wrap;
    max-width: 30%;
margin-bottom:10px;
    color: black;
    flex-flow: column;
   transition:1s;
    border-radius: 15px;
                }
               }
               @media only screen and (min-width: 600px) { 
                .contCompo{
                  width: 65%;
             } 
            
            
            }
               @media only screen and (min-width: 800px) { 
                .contCompo{
                  width: 50%;
             } 
            
            
            }
           
                `}

            </style>
        </div>
    );
}
};




const mapStateToProps = state => {
 
  const itemSelect = state.itemSelectReducer

  return {itemSelect}
};

export default connect(mapStateToProps)(ProductDetail);