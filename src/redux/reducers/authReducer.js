const initialState = {};

const authReducer = (state = initialState, action) => {

    switch(action.type) {
   
        case 'LOG_USER_IN': {
            console.log(action.payload)
            // update spinner state
            return {
                user: action.payload,
                ...state,
            }  
        }
        default: {
            return initialState;
        }
    }
}

export default authReducer;