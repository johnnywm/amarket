import {ADD_GROUP_TO_FILTER, REMOVE_GROUP_FROM_FILTER, RESETFILTERS} from "../actions";

export const  groupReducer = (state = '', action) => {
    switch (action.type) {
        case ADD_GROUP_TO_FILTER:
            if(state.includes(action.group)) return state;
            return action.group;
            
        case REMOVE_GROUP_FROM_FILTER:
          
          
            return ""
            case RESETFILTERS:
                return ""
        default:
            return state;
    }
};

