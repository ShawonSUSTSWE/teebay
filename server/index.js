import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "./src/schema/typeDefs.js";
import { resolvers } from "./src/schema/resolvers.js";
import { expressMiddleware } from "@apollo/server/express4";
dotenv.config();

const prisma = new PrismaClient();
const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ prisma }),
});

await server.start();
app.use("/graphql", expressMiddleware(server));

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/graphql`);
});
