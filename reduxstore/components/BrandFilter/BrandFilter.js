import React, {Component} from 'react';
import {connect} from 'react-redux';

import {brands} from "../../data/brands";
import {addBrandToFilter, removeBrandFromFilter} from "../../actions";


const BrandFilter = (props) => {
   // ({brandItemsCount[brand.marca]})
    const {dispatch, brandItemsCount} = props;
  
    const handleSelectBox = (e) => {
        const name = e.target.name;
        const value = e.target.checked;

        if(e.target.checked) {
            dispatch(addBrandToFilter(name));
        } else {
            dispatch(removeBrandFromFilter(name));
        }
    };


        return (
            <div className="card mb-3">
                <div className="card-header">
                    <h3>Marcas</h3>
                </div>
                <ul className="list-group flex-row flex-wrap customul">
                    {brands.map((brand, i) => (
                        <li key={i} className="item-marca">
                            <div className="contminimarca">
                            <img src={brand.img} alt={brand.marca} className="imgminimarca"/>
                            </div>
                            <div className="contmarcadata">
                            <label className="custom-checkbox text-capitalize"> {brand.marca} 
                                <input type="checkbox"
                                       name={brand.marca}
                                       className="custom-checkbox__input" onInput={handleSelectBox}/>
                                <span className="custom-checkbox__span"></span>
                            </label>
                            </div>
                        </li>
                    ))}
                </ul>
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