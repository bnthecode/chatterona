import { auth } from "../firebase";

const userService = {
  updateUser: async (modifiedFields, uid) => {
    auth
      .updateUser(uid, {
        ...modifiedFields,
      })
  }
};

export default userService;