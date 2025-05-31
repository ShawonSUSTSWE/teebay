import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import prisma from "./src/config/DB.js";
import { schema } from "./src/schema/schema.js";
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  ...schema,
});

await server.start();
app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ prisma }),
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/graphql`);
});
