export const setServerRedux = (dispatch) => (server) => {
    dispatch({ type: 'SET_SERVER', payload: server})
}

export const setChannelRedux = (dispatch) => (channel) => {
    dispatch({ type: 'SET_CHANNEL', payload: channel})
}