import db, { firestore } from "../firebase";

const serverService = {
  getServers: async () => {
    const snapshot = await db.collection("servers").orderBy('timestamp', 'asc').get();
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  },

  addServer: async (serverName, user) => {
    return db.collection("servers").add({
      name: serverName,
      photoURL: user.photoURL,
      timestamp: firestore.FieldValue.serverTimestamp(),
      associatedUsers: {
        [user.uid]: {
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
        },
      },
      owner: user.displayName,
    });
  },
};

export default serverService;
