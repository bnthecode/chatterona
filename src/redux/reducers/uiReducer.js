const initialState = {
  spinner: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_SPINNER": {
      // update spinner state
      return {
        spinner: action.payload,
        ...state,
      };
    }
    default: {
      return initialState;
    }
  }
};

export default uiReducer;
