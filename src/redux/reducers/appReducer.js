const initialState = {
  mobileView: false,
  selectedServer: {
    name: "",
    id: "",
  },
  selectedChannel: {
    name: "",
    id: "",
  },
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    // servers
    case "SET_SERVER": {
      return {
        ...state,
        selectedServer: action.payload,
      };
    }
    // channels
    case "SET_CHANNEL": {
      return {
        ...state,
        selectedChannel: action.payload,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default appReducer;
