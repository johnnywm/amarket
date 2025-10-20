import {UPLOAD_FILTER_SEARCHER, REMOVE_FILTER_SEARCHER} from "../actions/myact";

 const  searcherReducer = (state = '', action) => {
    switch (action.type) {
        case UPLOAD_FILTER_SEARCHER:
            if(state.includes(action.payload)) return state;
            return state = action.payload;
        case REMOVE_FILTER_SEARCHER:
            console.log('remove input', action);
          
            return state = ""
        default:
            return state;
    }
};

export default searcherReducer