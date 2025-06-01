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
    signup: async (_, data, { userService, res }) => {
      const user = await userService.createUser(data);
      return await userService.generateToken(user, res);
    },
    login: async (_, { email, password }, { userService, res }) => {
      const user = await userService.validateUser(email, password);
      if (!user || user.password !== password) {
        throw new Error("Invalid email or password");
      }
      return await userService.generateToken(user, res);
    },
    logout: async (_, __, { userService, res }) => {
      return await userService.logout(res);
    },
  },
};
