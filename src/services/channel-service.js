import db from "../firebase";
import moment from 'moment';

const channelService = {
  getChannels: async (serverId) => {
    const snapshot = await db
      .collection("channels")
      .where("serverId", "==", serverId)
      .get();
    const channelList = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return channelList || [];
  },
  addChannel: async (serverId, channel) => {
    await db.collection("channels").add({
      serverId: serverId,
      name: channel.name,
      timestamp: new Date(),
      usersTyping: {},
      type: channel.type,
    });
  },
  addUserTyping: async (channelId, user, typing) => {
    const { uid, displayName } = user;

    const dbRef = db.collection("channels").doc(channelId);
    const query = { usersTyping: { [uid]: { name: displayName, typing, started: moment().format() } } };

    await dbRef.set(
      {
        ...query,
      },
      { merge: true }
    );
  },
};

export default channelService;
