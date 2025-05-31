export const userResolvers = {
  Query: {
    getUsers: async (_, __, { prisma }) => {
      return await prisma.user.findMany();
    },
    getUserById: async (_, { id }, { prisma }) => {
      return await prisma.user.findUnique({
        where: { id: id },
      });
    },
  },
  Mutation: {
    addUser: async (
      _,
      { email, password, firstName, lastName, address, phoneNumber },
      { prisma }
    ) => {
      console.log("Adding user:", {
        email,
        password,
        firstName,
        lastName,
        address,
        phoneNumber,
      });
      return await prisma.user.create({
        data: {
          email,
          password,
          firstName,
          lastName,
          address,
          phoneNumber,
        },
      });
    },
  },
};
