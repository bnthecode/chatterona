const initialState = {};

const authReducer = (state = initialState, action) => {

    switch(action.type) {
   
        case 'LOG_USER_IN': {
            // update spinner state
            return {
                ...action.payload
            }  
        }
        default: {
            return initialState;
        }
    }
}

export default authReducer;