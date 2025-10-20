import {ADD_CATEGORY_TO_FILTER, REMOVE_CATEGORY_FROM_FILTER, RESETFILTERS} from "../actions";

export const  categoryReducer = (state = '', action) => {
    switch (action.type) {
        case ADD_CATEGORY_TO_FILTER:
            if(state.includes(action.category)) return state;
            return action.category;
            
        case REMOVE_CATEGORY_FROM_FILTER:
          
          
            return ""
            case RESETFILTERS:
                return ""
        default:
            return state;
    }
};

