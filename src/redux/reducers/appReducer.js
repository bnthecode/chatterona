const initialState = {
  selectedServer: {
    name: '',
    id: '',
  },
  channelId: ''
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {

    // servers
    case "SET_SERVER_ID": {
      return {
        ...state,
        selectedServer: action.payload,
      };
    }
    // channels
    case "SET_CHANNEL_ID": {
      return {
        channelId: action.payload,
        ...state,
      };
    }

    default: {
      return initialState;
    }
  }
};

export default appReducer;
