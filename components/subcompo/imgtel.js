import Grid from '@mui/material/Grid';

const Servimg = ({titulo, img,estilo, onClickF})=>{
return (
    <Grid item xs={6} sm={4} md={3}> 
<div className="Cont">
<div className="containerimgserv" onClick={onClickF}> 
<img className="imgserv" src={img}/>
</div>
<div className="containerboton">
<button className="botonsub" onClick={onClickF}>{titulo}</button>
</div>	

<style jsx>{`

.botonsub{
    margin-top: 0px;
    width: 100%;
    padding: 0 16px;
    border-radius: 2px;
    background-color:  rgba(189, 189, 194, 0.836);
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 1px 5px 0 rgba(0, 0, 0, 0.12);
    color: black;
    transition: background-color 15ms linear,
      box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  
    height: 80%;
    line-height: 18px;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: none;
  }
  .botonsub:hover, .botonsub:focus {
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
      0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12);
    background-color: #039c0a;
  }
  
  .botonsub:active {
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12);
    background-color: #06d110;
  }
    
     .Cont{
       padding-top:10px;
        width: 100%;
        display:flex;
        flex-flow: column;
        justify-content: center;
        height: 250px;
        align-items: center;
        font-size: 30px ;
        margin-top: 10px;
        border: 4px outset gray;
        border-radius: 12px;
    }
    .containerboton{
        display:flex;
        height: 20%;
        align-items: center;
    }
.containerimgserv{
    display:flex;
    height:80%;
    justify-content: center;
    align-items: center;

overflow:hidden;
}
    .imgserv{
        width: 95%;
        height: auto;
        
    }



    @media only screen and (min-width: 600px) {
        .Cont{
          height: 350px;
        }
         }
         @media only screen and (min-width: 1200px) {
            .Cont{
              height: 400px;
            }
             }

    `}</style>



</div>
</Grid>
);

}

export default Servimg