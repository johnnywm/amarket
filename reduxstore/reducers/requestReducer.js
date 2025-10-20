import {
    FETCH_REP_BEGIN,
    FETCH_REP_SUCCESS,
    FETCH_REP_FAILURE,
    UPDATE_REP
  } from '../actions/myact';
  
  const initialState = {
    items: [],
    loading: false,
    error: null
  };
  
  export default function productReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_REP_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_REP_SUCCESS:
         console.log(action)
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
          ...state,
          loading: false,
          items: action.payload.solicitudes
        };
  
      case FETCH_REP_FAILURE:
        // The request failed. It's done. So set loading to "false".
        // Save the error, so we can display it somewhere.
        // Since it failed, we don't have items to display anymore, so set `items` empty.
        //
        // This is all up to you and your app though:
        // maybe you want to keep the items around!
        // Do whatever seems right for your use case.
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          items: []
        };
        case UPDATE_REP:
          console.log(action.payload)
          // Mark the state as "loading" so we can show a spinner or something
          // Also, reset any errors. We're starting fresh.
          return { ...state,
            loading: false,
            error: null,
                   items: action.payload.solicitudes
          }
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }