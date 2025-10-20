

const Imgres = ({titulo, img, onClickF})=>{
return (
<div className="Cont">

<img className="imgserv" src={img}/>


<button className="pulse" onClick={onClickF}>{titulo}</button>
	




</div>

);

}

export default Imgres 