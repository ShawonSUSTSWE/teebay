export const userResolvers = {
  Query: {
    getUsers: async (_, __, { userService }) => {
      return await userService.getUsers();
    },
    getUserById: async (_, { id }, { userService }) => {
      return await userService.getUserById(id);
    },
  },
  Mutation: {
    addUser: async (_, data, { userService }) => {
      return await userService.createUser(data);
    },
    login: async (_, { email, password }, { userService }) => {
      const user = await userService.validateUser(email, password);
      if (!user || user.password !== password) {
        throw new Error("Invalid email or password");
      }
      return await userService.generateToken(user);
    },
  },
};
