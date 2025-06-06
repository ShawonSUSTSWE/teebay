export const PageRoutes = {
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
  console.log(pagesList);
  console.log(currentPage);
  const nextPage = pagesList[pagesList.indexOf(currentPage) + 1];
  console.log(nextPage);
  return nextPage;
};
