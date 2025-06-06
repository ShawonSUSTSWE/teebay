export default function logGraphQLRequests(req, res, next) {
  if (req.path === "/graphql" && req.method === "POST") {
    console.log("GraphQL Operation Name:", req.body?.operationName);
    console.log(
      "GraphQL Request Body:",
      JSON.stringify(req.body?.variables, null, 2)
    );
  }
  next();
}
