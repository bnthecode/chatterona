import db from "../firebase";

const userService = {
  addUser: async (user) => {
    await db.collection("servers").add({
      name: serverName,
      imgUrl: user.photoURL,
      country: "USA",
      timestamp: new Date(),
    });
  },
};


export default userService;