export const logInUserRedux = (dispatch) => (user) => {
    dispatch({ type: 'LOG_USER_IN', payload: user})
}