export const setServerRedux = (dispatch) => (server) => {
    dispatch({ type: 'SET_SERVER_ID', payload: server})
}