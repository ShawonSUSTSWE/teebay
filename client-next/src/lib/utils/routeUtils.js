export const PageRoutes = {
  login: `/login`,
  signup: `/signup`,
  productEditPage: (id) => `/products/${id}/edit`,
  productDetailsPage: (id) => `/products/${id}`,
  home: `/home`,
  productsList: `/products`,
  transactions: `/transactions`,
  productCreate: {
    addTitle: `/add-product/title`,
    addCategory: `/add-product/categories`,
    addDescription: `/add-product/description`,
    addPrice: `/add-product/price`,
    summary: `/add-product/summary`,
  },
};

export const routeToNextProductCreatePage = (currentPage) => {
  const pagesList = Object.values(PageRoutes.productCreate);
  const nextPage = pagesList[pagesList.indexOf(currentPage) + 1];
  return nextPage;
};
