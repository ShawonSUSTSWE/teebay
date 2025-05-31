import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import prisma from "./src/config/DB.js";
import { schema } from "./src/lib/schema/schema.js";
import { createServices } from "./src/lib/services/index.js";
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
    context: async ({ req, res }) => {
      const services = createServices(prisma);
      return {
        req,
        res,
        prisma,
        ...services,
      };
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/graphql`);
});
