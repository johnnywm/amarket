import {ADD_BRAND_TO_FILTER, REMOVE_BRAND_FROM_FILTER, RESETFILTERS} from "../actions";

export const  brandFilterReducer = (state = '', action) => {
    switch (action.type) {
        case ADD_BRAND_TO_FILTER:
            if(state.includes(action.brand)) return state;
          let filtros = [...state]
          let nuevo = filtros.concat(action.brand)
      console.log(nuevo)

            return nuevo
        case REMOVE_BRAND_FROM_FILTER:
           let  nuevosfiltros = [...state]
            let sinuevo = nuevosfiltros.filter(x => x !=action.brand )
            return sinuevo;
            case RESETFILTERS:
            return ""

        default:
            return state;
    }
};