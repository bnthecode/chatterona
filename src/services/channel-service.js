import db from "../firebase";

const channelService = {
  getChannels: async (serverId) => {
    const snapshot = await db
      .collection("channels")
      .where("serverId", "==", serverId)
      .get();
      const channelList = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    return channelList || [];
  },
  addChannel: async (serverId) => {
    const name = prompt("What do you want you your channel to be named?");
    await db.collection("channels").add({
      serverId: serverId,
      name: name,
      timestamp: new Date(),
      messages: [],
      voice: true,
    });
  },
};

export default channelService;
