

const Dobleimg = ({titulo, img, onClickF})=>{
    return (
    <div className="Cont2">
    
    <img className="imgserv2" src={img}/>
    
    
    <button className="botondoble" onClick={onClickF}>{titulo}</button>
        
    <style jsx>{`
     
    
.Cont2{
    width: 145px;
    display:flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    font-size: 30px ;
    margin-top: 30px;
    height: 300px;
    overflow: hidden;
    margin-right:5px;
    margin-left:5px;
    border-radius: 15px;
  }
  
  .imgserv2{
   
    height: 75%;    border-radius: 15px;
    
  }
  .botondoble{
  
    height: 25%;
    width: 90%;
    margin-top:15px;
  
    padding: 0 16px;
    border-radius: 5px;
    background-color: #00000011;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 1px 5px 0 rgba(0, 0, 0, 0.12);
    color: rgb(0, 0, 0);
    transition: background-color 15ms linear,
      box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  
    line-height: 15px;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: none;
    border-bottom: 2px outset black;
  
  }
  
  .botondoble:hover, .botondoble:focus {
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
      0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12);
    background-color: #0358b9;
  }
  
  .botondoble:active {
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12);
    background-color: #0278ff;
  }
    `}</style>
    
    
    </div>
    
    );
    
    }
    
    export default Dobleimg