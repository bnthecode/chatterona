const initialState = {
    user: null
};

const authReducer = (state = initialState, action) => {

    switch(action.type) {
   
        case 'LOG_USER_IN': {
            const { user } = action.payload;
            return {
                ...state,
                user: { 
                    displayName: user.displayName,
                    uid: user.uid,
                    email: user.email,
                    photoURL: user.photoURL
                }
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