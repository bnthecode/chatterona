import db from "../firebase";

const serverService = {
  getServers: async () => {
    const snapshot = await db.collection("servers").get();
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  },

  addServer: async (serverName, user) => {
    return db.collection("servers").add({
      name: serverName,
      photoURL: user.photoURL,
      associatedUsers: {
        [user.uid]: {
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
        },
      },
      owner: user.displayName,
      timestamp: new Date(),
    });
  },
};

export default serverService;
