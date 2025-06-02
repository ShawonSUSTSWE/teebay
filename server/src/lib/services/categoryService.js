import CategoryRepository from "../repositories/categoryRepository.js";

class CategoryService {
  constructor(prisma) {
    this.categoryRepository = new CategoryRepository(prisma);
  }

  async getAllCategories() {
    return this.categoryRepository.findAll();
  }
}

export default CategoryService;
