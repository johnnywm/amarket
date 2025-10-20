import Grid from '@material-ui/core/Grid';

const Servimg = ({titulo, img,estilo, onClickF})=>{
return (
    <Grid item xs={12} sm={6} md={4}> 
<div className="Cont">
<div className="containerimgserv"> 
<img className="imgserv" src={img}/>
</div>
<div className="containerboton">
<button className={estilo} onClick={onClickF}>{titulo}</button>
</div>	

<style jsx>{`

.botonClickCat{
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 12px;
    background-color: rgba(255, 255, 255, 1);
    margin-right: 20px;
    border-left: 4px outset rgb(65, 143, 226);
    border-bottom: 2px outset rgb(6, 67, 125);
    box-shadow: -8px 10px 14px grey;
    border-radius: 10px;
    cursor:pointer;
    transition: 0.5s;
  
}

.botonClickCat:hover{
   color:rgb(65, 143, 226);
   margin-top: 10px;
   
}
    
     .Cont{
        width: 100%;
        display:flex;
        flex-flow: column;
        justify-content: center;
        height: 350px;
        align-items: center;
        font-size: 30px ;
        margin-top: 30px;
     
    
    }
    .containerboton{
       
        height: 20%;
        align-items: center;
    }
.containerimgserv{
    display:flex;
    height:70%;
    justify-content: center;
    align-items: center;
    overflow:hidden;

}
    .imgserv{
        width: 90%;
        height: auto;
        
    }

    @media only screen and (min-width: 600px) {
        .imgserv{
            width: 80%;
            height: auto;
            
        }


        }

        @media only screen and (min-width: 950px) {
            .imgserv{
                width: 70%;
                height: auto;
                
            }
    
    
            }
    



    `}</style>



</div>
</Grid>
);

}

export default Servimg