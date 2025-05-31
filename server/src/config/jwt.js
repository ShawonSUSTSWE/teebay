import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: Number(process.env.JWT_EXPIRATION) || "1h",
    }
  );

  return token;
};

export const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};
