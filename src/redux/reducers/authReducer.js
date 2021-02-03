const initialState = {
    user: null
};

const authReducer = (state = initialState, action) => {

    switch(action.type) {
   
        case 'LOG_USER_IN': {
            return {
                ...action.payload
            }  
        }
        default: {
            return {
                ...state
            };
        }
    }
}

export default authReducer;