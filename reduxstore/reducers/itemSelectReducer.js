import {
  ITEM_SELECTED
  } from '../actions/myact';
  
  const initialState = {
    itemSelect: {},

  };
  
  export default function productReducer(state = initialState, action) {
    switch(action.type) {
      case ITEM_SELECTED:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          itemSelect: action.payload.item
        };
  
    
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }