import db from "../firebase";
import http from './http-configuration';


const messageServices = {

  createMessage: async (serverId, channelId, message) =>
    await http.post(`/servers/${serverId}/channels/${channelId}/messages`, {
      message,
    }), 

    registerMessagesListener: (serverId, channelId, callback, cacheCallback) => {
      db.collection(`servers`)
        .doc(serverId)
        .collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
            const messages = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          callback(messages);
          cacheCallback(messages);
        });
    },
};

export default messageServices;
