const initialState = {
  servers: {},
  channels: {},
  messages: [],
};

const cacheReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CACHED_SERVERS": {
      return {
        ...state,
        servers: action.payload,
      };
    }

    case "SET_CACHED_CHANNELS": {
      return {
        ...state,
        channels: action.payload,
      };
    }

    case "SET_CACHED_MESSAGES": {
      return {
        ...state,
        messages: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default cacheReducer;
