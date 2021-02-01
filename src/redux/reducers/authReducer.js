const initialState = {};

const authReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'SET_AUTH_USER': {
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