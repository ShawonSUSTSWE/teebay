import { checkPublicOperation } from "../lib/utils/commonUtils.js";
import { clearCookie } from "./jwt.js";

const authPlugin = {
  async requestDidStart() {
    return {
      async didResolveOperation(requestContext) {
        const { request, contextValue } = requestContext;
        const { res, user } = contextValue;
        const query = request.query;

        if (!checkPublicOperation(query) && !user) {
          clearCookie(res);
          throw new Error("Unauthorized");
        }
      },
    };
  },
};

export default authPlugin;
