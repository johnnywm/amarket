import React from 'react';
import postal from 'postal';
import Carousel from '../components/Carrousel';
import Banner from '../components/banner';
import {Animate} from "react-animate-mount";
import Contacto from "../components/landingcontact";
import dynamic from 'next/dynamic'
import Image from 'next/image'



class Mainpage extends React.Component {
  state = {
    contacto:false,
    iobserver:false,    
  }
channelLand= null 
componentDidMount(){
  this.channelLand = postal.channel();
  this.channelLand.subscribe('landActivator', (data) => {
    console.log("on contacont")
     this.setState({contacto:!this.state.contacto})
     });
     if ("IntersectionObserver" in window) {
  
   
    
      
      var lazyloadImages = document.querySelectorAll(".lazy");
    
          
var imageObserver = new IntersectionObserver((entries, observer) => {
 
  entries.forEach(entry => {
   
if(entry.isIntersecting && entry.target.id === 'servinter')
{
console.log("cerdad")
this.setState({iobserver:true})
}
    else if (entry.isIntersecting) {
      var image = entry.target;
      image.src = image.dataset.src;
      image.classList.remove("lazy");
      image.classList.add("unhide");
      imageObserver.unobserve(image);
    }
  });
});
lazyloadImages.forEach((image) => {
  imageObserver.observe(image);
});
      }
}
render(){
  const Encu = dynamic(() => import("../components/encuentranos"))
  const Why = dynamic(() => import('../components/why'))
 
  const Banner2 = dynamic(() => import('../components/banner2'), {
    loading: () => 'Loading...',
  })
  const Banner3 = dynamic(() => import('../components/banner3'), {
    loading: () => 'Loading...',
  })
  const Products = dynamic(() => import('../components/products'), {
    loading: () => 'Loading...',
  })
  const Imageimpact = dynamic(() => import('../components/imagenImpact'), {
    loading: () => 'Loading...',
  })
  const Articulos = dynamic(() => import('../components/Articulos'), {
    loading: () => 'Loading...',
  })
  const Footer = dynamic(() => import('../components/footer'), {
    loading: () => 'Loading...',
  })
  return (
  <div className="main" >
<Animate show={this.state.contacto}>
<Contacto flechafun={()=>{this.setState({contacto:false})}}/>
       </Animate>
       <Carousel/>
       <Banner2/>
       <Products/>
  <Banner3/>
  <Imageimpact/>
  <Articulos/>
  <Footer/>
   
  </div>
 )
}
}
export default Mainpage