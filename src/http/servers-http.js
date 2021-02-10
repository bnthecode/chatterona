import db from "../firebase";
import http from "./http-configuration";
import firebase from "firebase";

const serverService = {
  // endpoints to node
  createServer: async (server) => await http.post("/servers", { server }),

  // events from firebase
  registerServersListener: (callback, cacheCallback) => {
    const user = firebase.auth().currentUser;
    db.collection(`servers`)
      .where(`users.${user.uid}.uid`, "==", user.uid)
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        const servers = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        callback(servers);
        cacheCallback(servers);
      });
  },
  registerServerListener: (serverId, channelId, callback) => {
    const user = firebase.auth().currentUser;
    db.collection(`servers/users/${user.uid}`)
      .doc(serverId)
      .collection("channels")
      .doc(channelId)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        callback(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
  },
};

export default serverService;
