import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';

import {Categorias} from "../../data/categorias";
import { addGroupFilter, removeGroupFilter,removeCategoryFilter} from "../../actions";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import postal from 'postal';
import { Animate } from 'react-animate-mount/lib/Animate';


const GroupFilter = (props) => {


    let channel2 = postal.channel();
    let groupData = [
            { value:"COMPUTADOR",label:"Computador",Img:"/tienda/grupo/laptop.png"},
            { value:"CELULAR",label:"Celular",Img:"/tienda/grupo/celu.png"},
            { value:"CONSOLA",label:"Consola",Img:"/tienda/grupo/consola.png"},
            { value:"HERRAMIENTAS",label:"Herramientas",Img:"/tienda/grupo/herra.png"}
    ]
    const {dispatch, brandItemsCount} = props;
    const [selected, setSelected] = useState(false);
    const [FilterShow, setFilterShow] = useState("");
    const [value, setValue] = useState("");
    useEffect(() => {
        channel2 = postal.channel();
        // Actualiza el título del documento usando la API del navegador
        if(props.grupoPreSelect){
            console.log(props)
            setValue(props.grupoPreSelect);
            setSelected(true)
            dispatch(addGroupFilter(props.grupoPreSelect));
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
            dispatch(addGroupFilter(name));
          
        } 
    }
    const removeFilter =()=>{
        setValue("");
        setSelected(false)
        dispatch(removeGroupFilter());
        dispatch(removeCategoryFilter());
    }

        return (
            <div className="card mb-3">
                <div className="card-header customcard">
                    <h3>Grupo</h3>      {selected?<span className='removeFilter' onClick={removeFilter}>Remover filtro</span>:""}
                </div>
          
                <FormControl component="fieldset">
              
      <RadioGroup aria-label="category" name="category1" value={value} >
        <div className='contItemscate'>
            {groupData.map(x=>{
                
                return(
                    <div style={{width:"100%", maxWidth:"230px"}}>
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

export default connect(mapStateToProps)(GroupFilter);