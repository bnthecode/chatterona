import db from "../firebase";
import http from "./http-configuration";

const channelService = {
  // endpoints to node
  getChannels: async (serverId) =>
    await http.get(`/servers/${serverId}/channels`),
  createChannel: async (serverId, channel) =>
    await http.post(`/servers/${serverId}/channels`, { channel }),

  // events from firebase
  registerChannelsListener: (serverId, callback, cacheCallback) => {
    db.collection(`servers`)
      .doc(serverId)
      .collection("channels")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        const channels = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        callback(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        cacheCallback(channels);
      });
  },
  registerChannelListener: (serverId, channelId, callback) => {
    db.collection(`servers`)
      .doc(serverId)
      .collection("channels")
      .doc(channelId)
      .onSnapshot((doc) => {
        callback({ id: doc.id, ...doc.data() });
      });
  },
};

export default channelService;
