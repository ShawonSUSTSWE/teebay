import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (user, res) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: Number(process.env.JWT_EXPIRATION) || "1h",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/",
  });

  return token;
};

export const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};
