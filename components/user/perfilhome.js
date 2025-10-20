import React, { Component } from 'react'
import postal from 'postal';
import {connect} from 'react-redux';
import {deleteUser, updateUser} from "../../reduxstore/actions/myact"
import Link from "next/link"

import { Animate } from "react-animate-mount";





/**
* @author
* @class PersonalInf
**/



class PersonalInf extends Component {
  
 state = { 
  imgrender:"/static/telefono2.png",
  buttons:false,
  linkreparacion:""
 }
 channel1 = null;
 channeladd = null;
statefun(e){
  if(this.props.usuario){
    const user =eval("this.props.usuario.update.usuario." + e)
    return (user)
  }
  
}


 
 componentDidMount(){
  this.channel1 = postal.channel();
  this.channeadd = postal.channel();


  
  this.channeadd.subscribe('addphone', (data) => {

    let modelo = data.message.titulo

    let modeloedit = modelo.replaceAll(" ", "-");

    let rutareparacion = "/reparacion/celular/" + modeloedit
   
    this.setState({imgrender:data.message.rutaimg, buttons:true, linkreparacion: rutareparacion})
   
 let botonpintado= "butonmapper-" + data.lugar

 for(let i=0; i<data.lugar;i++){
  let buttonto = "butonmapper-" + i
  
  document.getElementById(buttonto).classList.remove("mystyle")
  }


 setTimeout(function(){  document.getElementById(botonpintado).classList.add("mystyle")
 ; }, 100);

   });
  
  
   const modeloss = this.props.usuario.update.usuario.ModeloTel

  if( modeloss){
    let ruta =  modeloss[0].rutaimg


    let modeloedit = modeloss[0].titulo.replaceAll(" ", "-");

    let rutareparacion = "/reparacion/celular/" + modeloedit


 this.setState({imgrender:ruta, buttons:true, linkreparacion: rutareparacion})
 let button0 = document.getElementById("butonmapper-0")

button0.classList.add("mystyle")
  
  } else{
    this.setState({imgrender:"/static/telefono2.png", buttons:false})
  }
  

  

 }
 handleChangeform=(e)=>{
  this.setState({
      [e.target.name] : e.target.value
  })
   }



updateUser=()=>{
 
  this.setState({readOnly:true})
  var url = 'https://iglass.herokuapp.com/users/update';  
  var data = {Id: this.state.id,
            
              }

 var lol = JSON.stringify(data)

  fetch(url, {
    method: 'PUT', // or 'PUT'
    body: lol, // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
   
  
      let usuario = response.user


    this.props.dispatch(updateUser({usuario}))

  });

  
}

deleteitem=(mod, i)=>{
  const userupdate =  this.props.usuario.update.usuario
  userupdate.ModeloTel.splice(i, 1)
  userupdate.Id = userupdate._id
console.log(userupdate)



var url = 'https://iglass.herokuapp.com/users/update';  
var lol = JSON.stringify(userupdate)

fetch(url, {
  method: 'PUT', // or 'PUT'
  body: lol, // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => {
 
  console.log('Success:', response);
    let usuario = response.user

    this.props.dispatch(updateUser({usuario}))

    if(usuario.ModeloTel.length == 0){
      this.setState({imgrender:"/static/telefono2.png", buttons:false})
    } else if(usuario.ModeloTel.length >= 1){

      let button0 = document.getElementById("butonmapper-0")

      button0.classList.add("mystyle")
      this.setState({imgrender:usuario.ModeloTel[0].rutaimg})
    }

});


}

clickPhone=(mod, getid)=>{


const modeloss = this.props.usuario.update.usuario.ModeloTel

let modeloedit = mod.titulo.replaceAll(" ", "-");

let rutareparacion = "/reparacion/celular/" + modeloedit

this.setState({imgrender:mod.rutaimg, linkreparacion: rutareparacion})

for(let i=0; i<modeloss.length;i++){
let buttonto = "butonmapper-" + i

document.getElementById(buttonto).classList.remove("mystyle")
}

document.getElementById(getid).classList.add("mystyle")

}



titlePhoneMapper=()=>{
  const modeloss = this.props.usuario.update.usuario.ModeloTel



if(modeloss){

return ( modeloss.map((mod, i)=>{

  let getid = "butonmapper-"+i
    return(
      <div className='contPhonetitle' key={i} >
        <button id={getid} className="btnphone" onClick={()=>{this.clickPhone(mod, getid)}}>
          {mod.titulo}
        </button>
      <button className="btn btn-danger botoneliminar" onClick={()=>{this.deleteitem(mod, i)}}> x </button>
      </div>
    )
  }))
}

}
   
 render() {



  
  console.log(this.state)
 
  const { value, suggestions } = this.state;
  const inputProps = {
    placeholder: "Escribe el modelo del celular",
    value,
    onChange: this.onChange
  };
  return(
   <div>
    

<div className="jwseccionCard jwDist">
  
<div className="PhoneCont">
<img src={this.state.imgrender} className="celularPrin"></img>

</div>
<div className="listPhoneCont">
<div className="telAddbutton">
<span className="tituloadd">Agrega un celular</span>
<button className=" btn btn-success btncuston"  onClick={()=>{
   this.channel1.publish('modaltel', {
    message: 'enviado desde botonera'
 });
}}>

<span className="material-icons">
add
</span>
</button>
</div>

<div className="listPhone">
{this.titlePhoneMapper()}

</div>

</div>



</div>
<Animate show={this.state.buttons} >
<div className="bannerbotones">

<Link href={this.state.linkreparacion}>  
<a href={this.state.linkreparacion} >
    <button  className="botoncontact">Repuestos</button>
    </a>
    </Link> 
    
   

       <button   className="botoncontact enfasis">Accesorios </button>
 
     
    </div>
    </Animate>
<style>
  {`
  .bannerbotones{
    display: flex;
    justify-content: space-around;
  }
  .btnphone{
    width: 70%;
    border-radius: 10px;
  }
  .botoneliminar{
    display: flex;
    height: 22px;
    width: 20px;
    align-items: center;
    justify-content: center;
  }
  .contPhonetitle{

    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }
  .tituloadd{
    margin-left:10px
  }
  .jwDist{
    display: flex;
    justify-content: space-around;
    flex-flow: row;
    align-items: flex-start;
  }
  .celularPrin{
    width: 100%;
    max-width: 300px;
}
  
  .telAddbutton{
    display: flex;
    flex-flow: row-reverse;
    align-items: center;
    padding: 5px;

    border-radius: 14px;
    box-shadow: -9px 0px 8px #28a745;
}
.listPhone{
  display: flex;
  align-items: center;
  padding: 3px;

  border-radius: 14px;
  flex-flow: column;
}

.listPhoneCont{
  display: flex;
  
  flex-flow: column;

}

.mystyle{
  background: #28a745;
    color: white;
    transition: 0.5s;
}
  
 
 ` }
</style>

   </div>
    )
   }
 }
 const mapStateToProps = state => {
  const usuario = state.userReducerEmarket

  return {usuario}
};


export default connect(mapStateToProps)(PersonalInf)