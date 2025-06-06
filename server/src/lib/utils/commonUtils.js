import PublicOperations from "../constants/PublicOperations.js";

export const checkPublicOperation = (query) => {
  return PublicOperations.some((publicOperation) =>
    query.includes(publicOperation)
  );
};
