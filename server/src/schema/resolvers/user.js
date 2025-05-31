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
  },
};
