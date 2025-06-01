import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import prisma from "./src/config/DB.js";
import { schema } from "./src/lib/schema/schema.js";
import { createServices } from "./src/lib/services/index.js";
import cookieParser from "cookie-parser";
import { verifyToken } from "./src/config/jwt.js";
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());

const server = new ApolloServer({
  ...schema,
});

await server.start();

app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const services = createServices(prisma);
      const token = req.cookies?.token || req.headers?.authorization;

      let user = null;

      if (token) {
        try {
          user = verifyToken(token);
        } catch (error) {
          console.error("Token verification failed:", error);
        }
      }

      return {
        req,
        res,
        prisma,
        user,
        ...services,
      };
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/graphql`);
});
