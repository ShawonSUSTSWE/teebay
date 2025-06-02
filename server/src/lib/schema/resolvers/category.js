export const categoryResolvers = {
  Query: {
    getAllCategories: async (_, __, { categoryService }) => {
      return await categoryService.getAllCategories();
    },
  },
};
