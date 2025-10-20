import React, {useState} from 'react';
import {connect} from 'react-redux';

import {clearOrderBy, ORDER_BY_ASC, ORDER_BY_DESC, orderByAsc, orderByDesc} from "../../actions";

const OrderFilter = ({dispatch}) => {

    let removeSelected;
    const [selected, setSelected] = useState('');

    const handleRadioChange = (e) => {
        const value = e.target.value;
        setSelected(value);
        if(value === ORDER_BY_ASC) {
            dispatch(orderByAsc());
        } else {
            dispatch(orderByDesc());
        }
    };

    const removeFilter = (e) => {

        const buttons = document.getElementsByName('orderByPrice');

        buttons.forEach(el => {
            el.checked = false;
        });

        dispatch(clearOrderBy());
        setSelected('');
    };

  



    return (
            <div className="card">
               <div className="card-header"  style={{display:"flex",justifyContent:"space-between"}}>
                    <h3>Precio</h3>      {selected?<span className='removeFilter' onClick={removeFilter}>Remover filtro</span>:""}
                </div>
                <ul className="list-group flex-row  flex-wrap" >
                    <li className="list-group-item flex-fill">
                        <label className="custom-radio-btn"> Desde el mas bajo
                            <input
                                    value={ORDER_BY_ASC}
                                    type="radio"
                                    onChange={handleRadioChange}
                                   name="orderByPrice" className="custom-radio-btn__input"/>
                            <span className="custom-radio-btn__span"></span>
                        </label>
                    </li>
                    <li className="list-group-item flex-fill">
                        <label className="custom-radio-btn">Desde el mas Alto
                            <input
                                value={ORDER_BY_DESC}
                                onChange={handleRadioChange}
                                type="radio" name="orderByPrice" className="custom-radio-btn__input"/>
                            <span className="custom-radio-btn__span"></span>
                        </label>
                    </li>
                </ul>
            </div>
    );
};

export default connect()(OrderFilter);