import { auth, provider } from "../firebase";

const userService = {
  updateUser: async (modifiedFields, uid) => {
    try {
      await auth.updateUser(uid, {
        ...modifiedFields,
      });
    } catch (err) {
      console.log(err);
    }
  },
  signInGoogle: async () => {
    try {
      const user = await auth.signInWithPopup(provider);
      return user;
    } catch (err) {
      console.log("error loggin in user", err.message);
    }
    return {};
  },
};

export default userService;
