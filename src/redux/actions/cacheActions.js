export const setCachedServers = (dispatch) => (servers) => {
  const serverMap = servers.reduce((acc, server) => ({
    ...acc,
    [server.id]: server,
  }), {});

  dispatch({ type: "SET_CACHED_SERVERS", payload: serverMap });
};

export const setCachedChannels = (dispatch) => (channels) => {
    const channelMap = channels.reduce((acc, channel) => ({
        ...acc,
        [channel.id]: channel,
      }), {});

  dispatch({ type: "SET_CACHED_CHANNELS", payload: channelMap });
};

export const setCachedMessages = (dispatch) => (messages) => {
  dispatch({ type: "SET_CACHED_MESSAGES", payload: messages });
};
