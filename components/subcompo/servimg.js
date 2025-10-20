import Grid from '@mui/material/Grid';
import Link from 'next/link';
const Servimg = ({titulo, img,estilo, onClickF, descrip, Url})=>{
return (
    <Grid item xs={12} sm={6} md={4} > 
<div className="Cont">
<div className="containerimgserv"> 
<img className="imgserv hide lazy" data-src={img} alt={titulo}/>
</div>
<div className="containerboton">
 <Link href={Url}>
     <a className="enlaceLlano" href={Url}>
     <h3><button  className={estilo} onClick={onClickF}>{titulo}</button></h3>
</a>
</Link>
</div>	
<p className="descrip">{descrip}</p>
<style jsx>{`

.hide{
    opacity:0;
    transition: 1s;
}
.unhide{
    opacity:1
  
}
    
    .enlaceLlano{
        text-decoration:none
    }
    #btnserv{
font-size: 45px;
    }
    .descrip{
        margin-top:25px;
        padding-left: 25px; 
        padding-right: 25px; 
        text-align: center;
       
        height: 10%;
    }
     .Cont{
        width: 100%;
        height: 100%;
        display:flex;
        flex-flow: column;
        justify-content: center;

        align-items: center;
        font-size: 22px ;
        margin-top: 30px;
 
    }
    .containerboton{
        margin-top:10px;
        height: 15%;
    }
.containerimgserv{
    display:flex;
    height:70%;
    justify-content: center;
    align-items: center;

overflow:hidden;
}
    .imgserv{
        width: 75%;
        height: auto;
        
    }

    `}</style>



</div>
</Grid>
);

}

export default Servimg