import Grid from '@mui/material/Grid';
import Head from 'next/head';
import Footer from "../components/footer"
import React from "react"
import Link from 'next/link'
import { Animate } from 'react-animate-mount/lib/Animate';


class Encuentranos extends React.Component{
    state={ 
  Categorias:[],
  Publicaciones:[],
  PubliExist:true,
  CategoriaSelect:"",
  P1:"",
  P2:"",
  P3:"",
  P4:"",
    }
    
     componentDidMount(){
       
  this.getData()
        
     }

     getData=()=>{
        var url = 'http://localhost:3000/public/tienda/getconfigblog';
        var urldeploy = `${process.env.URL_BACKEND_SERVER}/public/tienda/getconfigblog `
          
        var data = {
          Userdata:{DBname:process.env.EMARKET_DATA_BASE },
          
        }
        
        var lol = JSON.stringify(data)
        fetch(urldeploy, {
          method: 'POST', // or 'PUT'
          body: lol, // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log('loadResponse:', response)
        if(response.status == "Error"){
      alert("error en el la solicitud")
 
        }else{
            this.setState({
                Categorias:response.Categorias,
                Publicaciones:response.Publicaciones,
                P1:response.Configuracion.Data[0].Publicacionprimera,
                P2:response.Configuracion.Data[0].Publicacionsegunda,
                P3:response.Configuracion.Data[0].Publicaciontercera,
                P4:response.Configuracion.Data[0].Publicacioncuarta,

            })

        }
    
    
    })


     }
   
     genPubli=(url)=>{
        if(this.state.Publicaciones.length > 0){
         
            let publicacion = this.state.Publicaciones.find(x=> x._id == url)

           
            if(publicacion != null){
                const handleRoot = ()=>{
                  
                    let sinslash = publicacion.Titulo.replaceAll("/", "__").replaceAll(/ /g, "-")
                 
                    const as = `/blog/${sinslash}`;
              
                return(`/blog/[articulo]/`,as)
                }
                let tiempo = new Date(publicacion.Tiempo)
                let mes= tiempo.getMonth() 
                let dia = tiempo.getDate()
                let listameses=["Ene","Feb","Mar","Abr", "May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"]
                const addCero=(n)=>{
                    if (n<10){
                      return ("0"+n)
                    }else{
                      return n
                    }
                  }
                return(
                    <Link href={handleRoot()}><a style={{height:'100%', width:'100%'}}>
                    <div className='contDataPubli' 
                    
                   
                    style={{backgroundImage: `url(${publicacion.Imagen[0]})`}} 
                    
                    >

                        <div className='contdatatext'>
                            <div className='contFecha'>
                                <div className='contDia'>     {addCero(dia)}</div>
                                <div className='contMes'>  {listameses[mes]}   </div>
                            </div>
                            
                            {publicacion.Titulo}</div>
                        <style >{`  
   .contDataPubli{
    width:100%;
    border-radius: 20px;
    height: 100%;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
}
 
 .contdatatext{
    display: flex;
    color:white;
    width: 100%;
    background: #393939bd;
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    justify-content: flex-start;
    align-items: flex-end;
    border-radius: 20px;
 }

.contFecha{
    background: #000000f2;
    color: white;
    padding: 15px;
    border-radius: 12px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    max-height: 50px;
    margin: 5px;
}
}
                            `}
                            </style>
                    </div>
                                    </a></Link>   
                )
            }

        }

     }
     render(){
   console.log(this.state)
        let categoriasRender=""
        let publicacionesRender=""

        if(this.state.Categorias.length > 0){
            categoriasRender = this.state.Categorias.map(x=>{

                let catActive = this.state.CategoriaSelect ==  x.nombreCat?"catActive":""

                return(
             
                <div className={`contCat ${catActive}`} 
                onClick={()=>{
                    
        
            let renderPub = this.state.Publicaciones.filter((z)=>z.Categoria == x.nombreCat)
            console.log(renderPub)
            if(renderPub.length >0){
                this.setState({PubliExist:true,CategoriaSelect:x.nombreCat})
            }else{
                this.setState({PubliExist:false,CategoriaSelect:x.nombreCat}) 
            }
            
            }}
                style={{backgroundImage: `url(${x.imagen[0]})`}} 
                >
               
                    <span className='catspan'>{x.nombreCat} </span>
                </div>
    
                )
            })
        }
        if(this.state.Publicaciones.length > 0){
            let publiToRender =''
            let filteredPubli = this.state.Publicaciones.filter(x=>
                 x._id != this.state.P1 &&
                 x._id != this.state.P2 &&
                 x._id != this.state.P3 &&
                 x._id != this.state.P4  
                 
                 )

            if(this.state.CategoriaSelect ==""){
                publiToRender = filteredPubli
            }else{
                publiToRender = filteredPubli.filter((x)=>x.Categoria == this.state.CategoriaSelect)
            }

            publicacionesRender = publiToRender.map((publicacion)=>{
                const handleRoot = ()=>{
                  
                    let sinslash = publicacion.Titulo.replaceAll("/", "__").replaceAll(/ /g, "-")
                 
                    const as = `/blog/${sinslash}`;
              
                return(`/blog/[articulo]/`,as)
                }
                   let tiempo = new Date(publicacion.Tiempo)
                let mes= tiempo.getMonth() 
                let dia = tiempo.getDate()
                let listameses=["Ene","Feb","Mar","Abr", "May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"]
                const addCero=(n)=>{
                    if (n<10){
                      return ("0"+n)
                    }else{
                      return n
                    }
                  }
                return(
                    <Link href={handleRoot()}><a style={{}}>
                    <div className='contPubliUnitaria' 
                    
                   
                    style={{backgroundImage: `url(${publicacion.Imagen[0]})`}} 
                    
                    >

                        <div className='contdatatext'>
                            <div className='contFecha'>
                                <div className='contDia'>     {addCero(dia)}</div>
                                <div className='contMes'>  {listameses[mes]}   </div>
                            </div>
                            
                            {publicacion.Titulo}</div>
                        <style >{`  
   .contPubliUnitaria{
    width:300px;
    border-radius: 20px;
    height: 300px;
    margin:10px;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
}
 
 .contdatatext{
    display: flex;
    color:white;
    width: 100%;
    background: #393939bd;
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    justify-content: flex-start;
    align-items: flex-end;
    border-radius: 20px;
 }

.contFecha{
    background: #000000f2;
    color: white;
    padding: 15px;
    border-radius: 12px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    max-height: 50px;
    margin: 5px;
}
}
                            `}
                            </style>
                    </div>
                                    </a></Link>   
                )
            })

        }
   
    return(


        <div className="Bannercont"  >
       
     
          <div className="contTitulo">
      <h1 className="subtitulocont">Publicaciones</h1>
      </div>
     <div className='mainContPubli'>

<div className='cont50'>
{this.genPubli(this.state.P1)}
</div>
<div className='cont50'>
<div className='subCont50'>
{this.genPubli(this.state.P2)}
</div>
<div className='subCont50'>
<div className='subCont25'>
{this.genPubli(this.state.P3)}
</div>
<div className='subCont25'>
{this.genPubli(this.state.P4)}
</div>
</div>
</div>

     </div>

     <div className='mainContCate'>
{categoriasRender}

     </div>
     <Animate show={this.state.PubliExist}>
     <div className='mainContCate'>
 
{publicacionesRender}

     </div>
     </Animate>
        <style >{`
      
        .mainContCate{
            flex-wrap: wrap;
            display: flex;
            justify-content: space-around;
            width: 90%;
            margin-left: 5%;
            border-top: 3px solid blue;
            margin-top: 50px;
            padding-top: 35px;
        }
        .catspan{
            background: #ffffffe0;
    border-radius: 14px;
    padding: 5px;
    border-bottom: 2px solid darkblue;
        }
        .contCat{
            min-width: 250px;
            overflow: hidden;
            min-height: 250px;
            margin: 10px;
            background-position: center;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 30px;
            border-radius: 25px;
            cursor:pointer;
            border-bottom:2px inset black;
            transition:1s;
            border:0px solid black
        }

        .catActive{
            min-height: 260px;
            min-width: 260px;
            border:2px solid darkblue
        }
         .mainContPubli{
            width:100%;
            display:flex;
            flex-wrap: wrap;
            justify-content: center;
         }
         
         .cont50{
            width: 100%;
            display: flex;
            min-height: 400px;
            margin: 5px;
         
            border-radius:20px;
            max-width: 600px;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
         }
     .subCont50{
        width: 100%;
        display: flex;
        min-height: 450px;
        height: 1px;
        margin: 5px;
     
        border-radius:20px;
        max-width: 600px;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
 
  
     }
     .subCont25{
        border-radius:20px;
        display:flex;
        width:100%;
        margin: 5px 0px;
        min-height: 225px;
        height: 1px;
       
     }
        .contmap{
            width:100%;
            height:500px;
        }
        .marginador{
            margin-bottom:450px
        }
        .maincontsocial{
            width:100%;
            display:flex;
            justify-content: center;
        }
        .contsocial{
            width:80%;
            display:flex;
            justify-content: center;
        }
        .contsocial img{
            width:18%;
        }

        .contTitulo{
            width:100%;
            display:flex;
            justify-content: center;
            margin-top: 80px;

        }
            .texto-centrado{
                text-align:center;
                display: flex;
                flex-flow: column;
            }
            .bold{
                font-weight: bolder;
            }
            p{
                margin:0;
                font-size: 20px;
            }
.visitanoscont{
    height:500px;
    overflow: hidden;
}
.contactcont{
   height:300px;
   background-color: white;
   display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-evenly;
}
.padding-left{
    padding-left: 2px;
    text-align:center;
}
            .subcontedorBanner{
                display:flex;
                align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    height:100%;
            }
            iframe{
                width:100%;
                height:400px;
            }
            .imgprincell{
                width:100%
            }
            .subcontedorBanner{
                width: 100%;
            }
            .tituloban{
                font-weight: bolder;
                width: 100%;
                font-size:35px;
            }
        hr {border: 0; 
        height: 20px; 
        box-shadow: inset 0 12px 12px -12px blue;
            margin-bottom:0;
        width: 100%;
        
        }
            .imagenrepuestos{
                margin-top:25px;
                padding-left: 25px;
                  padding-right: 25px;
                  text-align: center;
                  height: 100%;
            }
            .full{
                text-align: center;
                height: 100%;
                padding-left: 10px;
                  padding-right: 10px;

            }
            .Bannercont{
                width: 100%; 
             
                margin-top:100px;
                z-index: 50;
                background-color: rgb(255, 255, 255);
                position: relative;
                height: 900px;
                
            }

       
       

        @media only screen and (min-width: 800px) {

            .subCont50{
                width: 48%;
                max-height: 500px;
                
            }
            

        }




        `}
        </style>
      
        </div>
    )
    
}
}

export default Encuentranos;