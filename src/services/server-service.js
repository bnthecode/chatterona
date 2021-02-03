import db from "../firebase";

const serverService = {

  getServers: async () => {
    const snapshot = await db.collection("servers").get();
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  },

  addServer: async (serverName, user) => {
    await db.collection("servers").add({
      name: serverName,
      imgUrl: user.photoURL,
      country: "USA",
      timestamp: new Date(),
    });
  },
};


export default serverService;