import {UPLOAD_USER, DELETE_USER, LOG_OUT } from "../actions/myact";

 const  userReducerEmarket = (state = '', action) => {
    switch (action.type) {
        case UPLOAD_USER:
          console.log(action.payload)
            return state = action.payload;
        
            case DELETE_USER:
          console.log("dentro de delete user")
            return state ="";

            case LOG_OUT:
              return state ="";

        default:
            return state ;
    }
};

export default userReducerEmarket