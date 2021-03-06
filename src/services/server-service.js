import db, { firestore, storage } from "../firebase";
// import { storage} from "../firebase";

const serverService = {
  getServers: async () => {
    const snapshot = await db
      .collection("servers")
      .orderBy("timestamp", "asc")
      .get();
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  },

  addServer: async (server, user) => {
    if (server.file.name) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(server.file.name);
      await fileRef.put(server.file).then((idk) => console.log(idk));
    }
    const imgUrl = server.file.name
      ? await storage.ref(server.file.name).getDownloadURL()
      : user.photoURL;

    return db.collection("servers").add({
      name: server.name,
      photoURL: imgUrl,
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
