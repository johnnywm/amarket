import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Animate } from "react-animate-mount";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { updateOrders } from '../reduxstore/actions/myact';
import Link from "next/link"
import {updateUser} from "../reduxstore/actions/myact"
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';




import ErrorIcon from '@mui/icons-material/Error';

import { CircularProgress } from '@mui/material';

class Modal extends Component {
  
            state={
              textarea:"" ,
              loadingTrans:false,
              newImg:[]
        }

       
    componentDidMount(){
   
   
  
      ValidatorForm.addValidationRule('requerido', (value) => {
        if (value === "") {
            return false;
        }
        return true;
    });
          
      }

 
        handlechangearea=(event)=> {
          this.setState({textarea: event.target.value});
        }
        
         soporteFlechaFun=()=>{
          this.setState({
          
            pinicial:true,
            flecharetro:true,
            soporte:false,
            soporteBox:true,
        
          
           })

         }
         


            





        onFlechaRetro=()=>{
         
            this.props.flechafun()
         
        }
        uploadTransfer=()=>{
  
       if(this.state.loadingTrans == false){
        this.setState({loadingTrans:true})
        let formDataa = new FormData();
        let imagenesLength = document.getElementById('rimagen').files.length;
        if(imagenesLength == 0){
          alert("Ingrese una imagen")
          this.setState({loadingTrans:false})
        }else{
          for (var x = 0; x < imagenesLength; x++) {
            formDataa.append("file", document.getElementById('rimagen').files[x]);
            formDataa.append("upload_preset","perpeis7")
            const options = {
              method: 'POST',
              body: formDataa,
              // If you add this, upload won't work
              // headers: {
              //   'Content-Type': 'multipart/form-data',
              // }
              };
              fetch('https://api.cloudinary.com/v1_1/registrocontabledata/image/upload', options)
              .then((response) => (
               response.json()
               )).then((data)=>{
                console.log(data)
                 if(data.secure_url){
            let archivos = this.state.newImg
            let stateactualizado = [...archivos, data.secure_url]
            this.setState({newImg:stateactualizado})
                  
            console.log(imagenesLength)
            console.log('dentro de cond')
            if(imagenesLength == stateactualizado.length){
              console.log('dentro de cond')
              let sendData ={...this.props.compra,
                imgComprobante:stateactualizado,
                 Userdata:process.env.EMARKET_DATA_BASE,
                 DireccionMail: process.env.CLIENT_PRINCIPAL_MAIL
                }

              const options =     {
                method: 'POST', // or 'PUT'
                body: JSON.stringify( sendData), // data can be `string` or {object}!
                headers:{
                  'Content-Type': 'application/json'
                }
              }

              var url = 'http://localhost:3000/public/tienda/enviocomprobante';
             
               var deployUrl2 =  `${process.env.URL_BACKEND_SERVER}/public/tienda/enviocomprobante`
              fetch(deployUrl2, options).then(response => response.json())
              .catch(error => {console.log(error);alert("Error en la solicitud");this.setState({loadingTrans:false})})
              .then(response => {
                console.log('updateorder:', response)
                if(response.status == "Error"){
                  alert("error en el la solicitud")
                  this.setState({loadingTrans:false})
                    }else {
                           
                console.log(this.props)
                      let ordenes = this.props.orderReducer.items
                  
                      let indextoRemplace = ordenes.findIndex((item,i)=>(item._id === response.orden._id))
                      
                      ordenes[indextoRemplace] = response.orden
                      this.props.dispatch(updateOrders({ordenes}))
                      this.props.flechafun()
                      this.setState({loadingTrans:false})
                    }
              
              }
              
              )


           
            }
            }
              })
        
        
          }

        }
      
          

          }

              
   
          }   
          
        


         

sendIssue=()=>{
  const compraJson = this.props.compra
  var data = {
    Id:compraJson.Id,
    carritoNumero:compraJson.carritoNumero,
    Estado:"Revicion_Cliente",
    Mail:compraJson.Correo,
    Queja:this.state.textarea,
    Nombre:compraJson.Nombre,
      }
      let dataIssue = JSON.stringify(data)
      let options= {
        method: 'POST', // or 'PUT'
        body: dataIssue , // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
        
      }

  fetch('https://iglass.herokuapp.com/admin/sendIssue', options).then(response => response.json())
  .then(success => {
   console.log(success)
  })
  .catch(error => console.log(error)
  );

 

}

userConfirm=()=>{




}



          modalCont=()=>{
         
                    
            let compraJson = this.props.compra
           
            const imgruta =         compraJson.formadePago === "Transferencia"?"/static/imgpagos/banco.jpg":
                                    compraJson.formadePago === "Efectivo"?"/static/imgpagos/efectivo.jpg":
                                    compraJson.formadePago === "Tarjeta"?"/static/imgpagos/creditcard.jpg":""
                                
           
                                    if(compraJson.estatus.pago.EstadoPago==="Revision-de-pago"){
              
                                      return( <div className="jwseccionCard jwW100percent">
                                      <p className="subtituloArt">Tu pago en {compraJson.formadePago.toLowerCase()} esta siendo revisado</p>
                                  <img src={imgruta} alt="" className="imgventafull"/>
                                  
                                  <p>Te enviaremos un correo electrónico de confirmación al momento de revisarlo  </p>
                                  <div className="jwContFlexCenter">
                                   
                                      <button className="btn btn-success" onClick={this.props.flechafun}>Entiendo, estare pendiente</button>
                                      </div>
                                  </div>)
                                  
                                    }
                                    else if(compraJson.estatus.pago.EstadoPago==="Concluido"){
                                      return( <div className="jwseccionCard jwW100percent">
                                     
                                     <p className="subtituloArt">Reporte de problemas</p>
                                    
                                              <ErrorIcon style={{fontSize:"70px", color:"red",margin:"15px"}}/>
                                     <p>Porfavor cuentanos a detalle cual es el problema.</p>
                                     <textarea id="w3mission" rows="5"  placeholder="Redacta aquí tu problema" onChange={this.handlechangearea} value={this.state.textarea} className="quejabox">
                                  
                                  </textarea>
                                  
                                  <div className="jwContFlexCenter">
                                   
                                      <button className="btn btn-primary" onClick={this.sendIssue}>Enviar</button>
                                      </div>
                                  </div>)
                                    }
                                    else if(compraJson.estatus.pago.EstadoPago==="Pagado"){
                                                            
                                    
                                      return( <div className="jwSeccionCard"> 
                                    
                                    <p className="subtituloArt">Tu pago en {compraJson.formadePago} fue recibido con éxito.</p>
                                    <div className="jwContFlexCenter"> 
                                   
                                    <img src={imgruta} alt="" className="imgventafull"/>
                                    </div>
                                    {compraJson.envio.status&&<div>
                                      
                                      <p>Los articulos del carrito <span className="jwBolder">  Nº {compraJson.carritoNumero}</span> han sido enviados a la dirección  <span className="jwBolder"> {compraJson.Direccion}</span> </p>
                                      
                                      <p>Porfavor avisanos al momento de recir tus productos</p>
                                    
                                      <div className="jwContFlexCenter jwJustifySpace">
                                     
                                     <button className="btn btn-primary" onClick={this.props.flechafun}>Aún no los recibo</button>
                                     <button className="btn btn-success" onClick={()=>{this.userConfirm()}}>Ya los recibí</button>
                                     </div>
                                    
                                       </div>}
                                       {compraJson.envio.status===false&&<div>
                                      
                                      <p>Los articulos del carrito <span style={{fontWeight:"bolder"}}> Nº {compraJson.carritoNumero}</span> han sido separados y reservados a tu nombre</p>
                                      <p>Puedes acercarte cuando gustes a retirarlos</p>
                                      <div className="contenedorab">
            <div className="gradient-border" id="box">
              <div className="boxinside">
              <div className="contenedorcontaco">
                                      <div className="contactcont " >
                                        
                                         <div className=" subContactCont " >
                                         <HomeIcon/>
                                         <p className="jwBolder">Primera Imprenta 12-21 y espejo.(Detras del CC Teofilo Lopez)</p>
                                                      </div>      

                                                      <div className=" subContactCont " > 

                                                      <Link href="https://goo.gl/maps/FLenSxtACyAHKesz8"><a target="_blank" >
                                                       <div>
                                                    <div className="icentrado">
                                                    <GpsFixedIcon/>
                                         </div>
                                                    
                                                      </div></a></Link> 
                                                      <p className="jwBolder"> Ubicación exacta</p>
                                                      </div>
                                            <div >
                                                
                                        
                                                  
                                            </div>
                                            </div>
                                            <div className="contactcont "  >
                                            <AccessTimeIcon/>
                                              <div>
                                      <p className="jwBolder">Lunes a Viernes</p>
                                      <p>9:30AM a 6:30 PM</p>
                                      </div>
                                      <div>
                                      <p className="jwBolder"> Sábados</p>
                                      <p>9:30AM a 4:00 PM</p>
                                    
                                      </div>
                                      <p>(Horario continuo)</p>
                                      </div>
                                      </div>
   
              </div>

            </div>
            </div>                                
     
                              
                                      <div className="jwContFlexCenter" style={{marginTop:"15px"}}>
                                     
                                        <button className="btn btn-success" onClick={this.props.flechafun}>Lo retirare pronto</button>
                                        </div>
                                       </div>}
                                    
                                          </div>)
                                    }
                                    else if(compraJson.estatus.pago.EstadoPago==="default"){
                                      let databank =[
                                        {NombreBanco:"Pichincha", Imagen:"/static/imgpagos/banco1.jpg",numeroCuenta:5166278600 },
                                        {NombreBanco:"Produbanco", Imagen:"/static/imgpagos/banco2.jpg",numeroCuenta:20059241691},
                                        {NombreBanco:"Guayaquil", Imagen:"/static/imgpagos/banco-guayaquil2.jpg",numeroCuenta:13836251},
                                        {NombreBanco:"Loja", Imagen:"/static/imgpagos/banco-loja.jpg",numeroCuenta:2902986209},
                                       ]

                                       let bancoElegido = databank.filter(x=>x.NombreBanco == compraJson.bancoCliente)
                                       let cuentaRender =""
                                   
                                       if(bancoElegido[0]){
                                         cuentaRender = bancoElegido[0].numeroCuenta 
                                       }

                                      
                                      return( <div className="jwseccionCard jwW100percent">
                                        <p className="subtituloArt">Tu pago en {compraJson.formadePago.toLowerCase()} aun no ha sido recibido.</p>
                                    <img src={imgruta} alt="" className="imgventafull"/>
                                    {compraJson.formadePago === "Efectivo"&&<div className="contenedorPago">
                                      
                                      <p>Los articulos del carrito <span className="jwBolder">  Nº {compraJson.carritoNumero}</span> han sido separados  y reservados durante  <span className="jwBolder"> 24 horas</span> </p>
                                      
                                      <p>Porfavor acercate a retirarlo en nuestro local, con tu nombre y número de carrito</p>
                                      <div className="contenedorcontaco">
                                    
                                            <div className="contenedorab">
            <div className="gradient-border" id="box">
              <div className="boxinside">
              <div className="contenedorcontaco">
                                      <div className="contactcont " >
                                        
                                         <div className=" subContactCont " >
                                         <HomeIcon/>
                                                      <p className="jwBolder"> Av.Eloy Alfaro N47-132 y Mortiños </p>
                                                      </div>      

                                                      <div className=" subContactCont " > 

                                                    <Link href="https://g.page/iglassphone?share"><a target="_blank" >
                                                       <div>
                                                    <div className="icentrado">
                                        <GpsFixedIcon/>
                                         </div>
                                                    
                                                      </div></a></Link> 
                                                      <p className="jwBolder"> Ubicación exacta</p>
                                                      </div>
                                            <div >
                                                
                                        
                                                  
                                            </div>
                                            </div>
                                            <div className="contactcont "  >
                                            <AccessTimeIcon/>
                                              <div>
                                      <p className="jwBolder">Lunes a Viernes</p>
                                      <p>10:30AM a 8:00 PM</p>
                                      </div>
                                      <div>
                                      <p className="jwBolder"> Sábados</p>
                                      <p>10:30AM a 6:00 PM</p>
                                    
                                      </div>
                                      <p>(Horario continuo)</p>
                                      </div>
                                      </div>
   
              </div>

            </div>
            </div>                                
               
                                      </div>
                                   
                                   
                                      <div className="jwContFlexCenter">
                                     
                                        <button className="btn btn-success" onClick={this.props.flechafun}>Lo retirare pronto</button>
                                        </div>
                                 
                                       </div>}    
                                      
                                       {compraJson.formadePago === "Transferencia"&&<div className="contenedorPago">
                                      <div>

                                      </div>
                                      <p>Los articulos del carrito <span className="jwBolder">  Nº {compraJson.carritoNumero}</span> han sido separados  y reservados durante  <span className="jwBolder"> 24 horas</span> </p>
                                      <div className="jwPaper">
                                      <p style={{textAlign:"center"}}>Realize el pago con los siguientes datos:</p>

                                                  
                                      <p>Banco:<span style={{fontWeight:"bolder"}}>{compraJson.bancoCliente}</span></p>
                                      <p>Cuenta de Ahorros:<span style={{fontWeight:"bolder"}}>{cuentaRender}</span></p>
                                      <p>Nombre Titular:<span style={{fontWeight:"bolder"}}>{process.env.CLIENT_PRINCIPAL_BANKNAME}</span></p>
                                      <p>Un valor de total de :<span style={{fontWeight:"bolder"}}>${compraJson.valorFinal}</span></p>
                                      <p>En el detalle, escriba el número de carrito y su usuario </p>

                                      </div>
                                      <div className="contEnf">
                                      <p>Sube una captura de pantalla o fotografía de tu depósito o transferencia bancaria </p>
                                      <div className="grupo">
                                                               
                                                                <input type="file"
                                                                id="rimagen" name="rimagen"
                                                                accept="image/png, image/jpeg"></input>
                                                                
                                               </div>
                                               </div>
                                      <div className="jwContFlexCenter jwcolumn">
                                     <Animate show={!this.state.loadingTrans}>
                                        <button className="btn btn-success" onClick={this.uploadTransfer}>subir imagen</button>
                                        </Animate>
                                        <Animate show={this.state.loadingTrans}>
                                          <CircularProgress />
                                        </Animate>
                                        </div>
                                    
                                    
                                    
                                       </div>}    
                                     
                                         
                                         </div>)
                                      }                            
            
            }
    render () {
      console.log(this.state)
             return ( 
            <div >
    

            <div className="maincontacto" >
            <div className="contcontacto"  >
              <div style={{width:"100%", display:"flex", justifyContent:"flex-start"}}>

           
            <img src="/static/flecharetro.png" alt="" className="flecharetro" onClick={this.onFlechaRetro}/>
            </div>
            <div className="jwCard jwW100percent bgwhite">
      {this.modalCont()}
            </div>
  
       </div>
          </div>
          
         


           <style >{`
             .contEnf{
              background-color: #96e696;
    margin: 24px 6px;
    padding: 12px 10px;
    border-radius: 17px;
             }
             
             .grupo{
            display: flex;
    flex-flow: column;
    margin: 15px;}

             .contenedorPago{
              width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
             }
             .contenedorcontaco{
               display:flex;
               flex-flow:row;
             
    justify-content: space-evenly;
               
             }
             .jwBolder{
               font-weight:bolder;
             }
           .contactcont{
   height:100%;
   background-color: white;
   display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-evenly;
    width: 45%;
}
.imgventafull{
  width: 50%;
    margin: 10px;
}
      
.bgwhite{
  background-color: white;
           } 
                 .contLogin{
              display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
    text-align: center;
    background-color: honeydew;
    padding: 20px 0px;
    border-radius: 20px;
    margin: 10px 0px;
            }
         
.minimensaje{
  text-align: center;
    font-size: 11px;
}
             .contenidoForm{
               margin: 20px 0px;
              display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
             }
             .contSoporte{  
            
 margin-top:5vw;
    border: 2px outset #75c1ff;
    display: flex;

    align-items: center;
 
    justify-content: center;
    border-radius: 12px;
    box-shadow: 3px 3px 12px black;
     
    align-items: center;
    align-content: space-around;
    justify-content: space-evenly;
    padding: 0px 10px;
    text-align: center;
             }
             .textoSoporte{
margin-bottom:0px;
             }
             .soportetec{
               width: 20%;
             }
             .contPfinal{
              display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
             }
           .imgventa{
            margin-top: 30px;
    height: 100px;
    width: 100px;
   }
   .PFCbuttons{
     margin-top:20px;

    display: flex;
    width: 100%;
    justify-content: space-around;
   }
           .cDc2{
     margin-left:10px;
     width: 40%;
   }
   .urgente{
    text-align: center;
    border: 1px outset blue;
    margin-top: 10px;
    border-radius: 15px;
    padding: 5px;
   }
   .urgente p{
  margin-top:0px;
  margin-bottom:15px;
   }
   .buttonURG{
     padding:8px;
     border-radius: 20px;
     background-color: #e611113d;
   }
   .icoIMG{
     margin-top:10px;
     font-size:100px;
   }
   .contDatosC{
    padding: 0px;
   
    display: flex;
    width: 100%;


    background-color: #bdbdbd;
    border-radius: 15px;
    margin: 5px 0px;
 
    align-items: center;
  
    padding: 17px 8px 2px 8px;
   }
.cDc1{
  width: 50%;
  text-align: left;
  
}
             .contTituloCont1{
              margin-top:10px;
               display:flex;
               display: flex;
    font-size: 25px;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    text-align: center;

    border-radius: 15px;
    
    padding: 9px;
             }
             .contTituloCont1 p{
               margin-top:5px;
               margin-bottom:5px;
             }

.cdoptions{
  width: 40%;
    word-break: break-all;
    margin-left: 4%;
    margin-right: 4%;
    margin-top: 20px;
    border-bottom: 5px inset #ddba65;
    border-radius: 15px;
}
           .headercontact {

            display:flex;
            justify-content: space-around;
            flex-flow: column;
  
    align-items: center;
           }

.chat{

width:100px;
margin: 5px
}


           .contbotonventa{
             display:flex;
             justify-content:center;
             width:100%;
           }

.asesoriaT{
  font-size: 20px;
    text-align: center;
    margin-top: 10px;
    
    border-radius: 13px;
    margin-bottom: 20px;
    padding: 5px;
    background-color: aliceblue;
    box-shadow: 0px 1px 1px black;
}

             .botonventa{
            
              margin-top: 17px;
    border-radius: 10px;

    background-color: #048b0b;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12);
    color: #fff;
    transition: background-color 15ms linear, box-shadow 280ms cubic-bezier(0.4,0,0.2,1);
    height: 36px;
    line-height: 2.25rem;
    font-family: Roboto,sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    -webkit-letter-spacing: 0.06em;
    -moz-letter-spacing: 0.06em;
    -ms-letter-spacing: 0.06em;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: none;
    width: 40%;
             }
          .contsolicitador{
         
            margin-bottom: 10%;
            display:flex;
            width:100%;
            align-items: center;
            justify-content: space-around;
         text-align: center;
         font-size:20px;
         flex-wrap: wrap;
          }
          .option{
            width: 45%;
    box-shadow: 0px 3px 4px black;
    border-radius: 13px;
    padding-bottom: 5%;
    padding-top: 10px;
    padding-left: 5px;
    padding-right: 5px;
    height: 250px;
    word-break: break-word;
          }
          .option img{
            width:100%;
            max-width:120px;
          }
          .option3{
            margin-bottom: 20px;
    width: 135px;
    box-shadow: 0px 3px 4px black;
    border-radius: 13px;
    padding-bottom: 5%;
    padding-top: 10px;
    padding-left: 5px;
    padding-right: 5px;
    margin: 5px 2vw 5vw 5px;
    height: 230px;
    word-break: break-word;
}
.option3 img{
            width:100%;
            max-width:120px;
          }
      
        
        .maincontacto{
          overflow: scroll;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    left: 0px;
    position: fixed;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
         
       }
       .contcontacto{
        position: absolute;
    top: 5%;
    border-radius: 30px;
    margin-bottom: 5%;
    width: 90%;
    background-color: white;
    padding: 10px;
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
      
       }
       .marginador{
         margin: 0px 15px 15px 15px;
         color: black;
         
         display: flex;
         flex-flow: column;
         align-items: center;
   
       }
   
       .asesort{
        margin-top: 20px;
  
         text-align: center;
         font-size: 20px;
         margin-bottom: 0;
       }
       .engrane{
         height: 75px;
       }
   
       .iconotitulo{
         width: 60px;
         height: 60px;
         margin: 15px;
   
       }
   
       .tituloventa{
         display: flex;
         align-items: center;
         font-size: 30px;
         font-weight: bolder;
         text-align: center;
   
       }
       .tituloventa p{
         margin-top:5px;
         margin-bottom:5px
       }
     
       .flecharetro{
         height: 40px;
         width: 40px;
         padding: 5px;
       }
          
       body {
            height:100%

           }

           .contform{
            padding-bottom: 25px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
           }

          .contcontactoDirecto{
        
         
            text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
          }
        .quejabox{
          width: 80%;
    border: 1px solid darkcyan;
    margin: 15px 0px;
    padding: 2px;
    border-radius: 3px;
        }

          .titulocontactd{
            font-size:20px;
            font-weight:bolder;
            color:black;
            height: 35%;
          }
         
             .imgEnf img{
                max-width:250px;
              }
              .botonventa-Enf{
               background-color:rgb(65, 143, 226);
             }
             .sinmargen{
              margin:0;
            }
            .doblebuttonCont{
              display: flex;
       align-items: center;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content: space-around;
            }
            
            .customfb{
             
              display: flex;
    justify-content: center;
    align-items: center;
            }
            .customfbButton{
              max-width:300px;
              height: 50px;
    font-size: 14px;
            }
            .subContactCont {
               margin:10px 0px
             }
             .contactcont i {
margin-top:10px;
margin-top:10px
}
             @media only screen and (max-width: 320px) { 
               .subtituloArt{
                margin-top:2px;
                margin-bottom:2px;
               }
               .comunicacionart{
                 margin-bottom:2px;
               }
               .marginador{
                margin: 0px 2px 15px 2px;
               }
         .contcontacto{
          width: 95%;
         }
          }
          @media only screen and (min-width: 600px) { 
            
            .soportetec{
               width: 15%;
             }
            

              .contcontacto{
       
         width: 70%;
      
      
       }
          }
          @media only screen and (min-width: 950px) { 
         
            .soportetec{
               width: 15%;
             }
            
              
              
             
              .imgventa{
            margin-top: 40px;
    height: 150px;
    width: 150px;
   }
   .contsolicitador{
    margin-top: 4%;
    

   }
          }
          @media only screen and (min-width: 1200px) { 
            
            .soportetec{
               width: 10%;
             }
           
              
              .imgventa{
            margin-top: 40px;
    height: 150px;
    width: 150px;
   }
          }
          .w60percent{
               width:60%
             }
             .w100percent{
               width:100%
             }
           `}</style>
        
        
           </div>
        )
    }
}

const mapStateToProps = (state, props) =>  {
 

  return(state)

   
};

export default connect(mapStateToProps, null)(Modal);
