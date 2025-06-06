import { GraphQLScalarType, Kind } from "graphql";

export const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Custom Date scalar type",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});
