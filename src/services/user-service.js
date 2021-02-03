import { auth } from "../firebase";

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
};

export default userService;
