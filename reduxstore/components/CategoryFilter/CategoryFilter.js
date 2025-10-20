import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';

import {Categorias} from "../../data/categorias";
import { addCategoryFilter, removeCategoryFilter} from "../../actions";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Animate } from 'react-animate-mount/lib/Animate';
import postal from 'postal';

const BrandFilter = (props) => {

    let channel2 = postal.channel();

    let groupData = [
        { value:"PANTALLA",label:"Pantalla / Display",Img:"/static/categorias/displaycell.png"},
        { value:"BATERIA",label:"Bateria",Img:"/static/categorias/bateriacell.png"},
        { value:"TAPA",label:"Tapa",Img:"/static/categorias/tapa.png"},
        { value:"FLEX",label:"Flex",Img:"/static/categorias/flexcell.png"},
        { value:"PIN DE CARGA",label:"Pin de carga",Img:"/static/categorias/pincargacell.png"},
        { value:"CABLE",label:"Cable",Img:"/static/categorias/cable.png"},
        { value:"ESTUCHE",label:"Estuche",Img:"/static/categorias/estuche.png"},
        { value:"CARGADOR",label:"Cargador",Img:"/static/categorias/cargador.png"},
        { value:"AUDIFONOS",label:"Audifonos",Img:"/static/categorias/audifonos.png"},

]

    const {dispatch, brandItemsCount} = props;
    const [selected, setSelected] = useState(false);
    const [value, setValue] = useState("");
    useEffect(() => {
        console.log(props)
        channel2 = postal.channel();
        // Actualiza el título del documento usando la API del navegador
        if(props.categoryPreSelect){
            let  catUpper = props.categoryPreSelect.toUpperCase()
            setValue(catUpper);
            setSelected(true)
            dispatch(addCategoryFilter(catUpper));
           }
      }, []);
    const handleRadio = (e) =>{
        channel2.publish('resetFilter', {
            message: 'enviado desde handleRadio'
         });
        setSelected(true);
  
        const name = e.target.value;
    
        if(e.target.checked) {
            setValue(name);
            dispatch(addCategoryFilter(name));
          
        } 
    }
    const removeFilter =()=>{
        setValue("");
        setSelected(false)
        dispatch(removeCategoryFilter());
    }

        return (
            <div className="card mb-3">
                <div className="card-header" style={{display:"flex",justifyContent:"space-around"}}>
                    <h3>Categoria</h3>      {selected?<span className='removeFilter' onClick={removeFilter}>Remover filtro</span>:""}
                </div>
          
                <FormControl component="fieldset">
              
      <RadioGroup aria-label="category" name="category1" value={value} >
      <div className='contItemscate'>
      {groupData.map(x=>{
                return(
                    <div style={{width:"100%"}}>
                  <Animate show={x.value == value  ||value=="" }>
                    <div  className="item-cate-group"> 
                    <div className='contValueCate'>
                    <FormControlLabel value={x.value} control={<Radio  />} label={x.label} onClick={handleRadio}/>
                    </div>
                    <div className="contminicateGroup">
                                          <img src={x.Img} alt={x.label} className="imgminicate"/>
                                          </div>
                    </div>
                    </Animate>
                    </div>
                )
            })}
          
      </div>
      

</RadioGroup>
    </FormControl>
            </div>
        );

};

const mapStateToProps = (state) => {

    const brandItemsCount = {};

    state.productReducer.items.forEach(p => {
        brandItemsCount[p.Marca] = brandItemsCount[p.Marca] + 1 || 1;
    });



    return {
        brandItemsCount
    }

};

export default connect(mapStateToProps)(BrandFilter);