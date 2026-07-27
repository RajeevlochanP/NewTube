import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "./auth.dao.js";

export const signupService = async (name, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return { success: false, status: 409, message: "Email already exists" };
  }
  const newUser = await createUser(name, email, password);
  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET || "default_secret", {
    expiresIn: "24h",
  });
  return {
    success: true,
    status: 201,
    token,
    user: { _id: newUser._id, name: newUser.name, email: newUser.email },
  };
};

export const loginService = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    return { success: false, status: 401, message: "Invalid email or password" };
  }
  if (user.password !== password) {
    return { success: false, status: 401, message: "Invalid email or password" };
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || "default_secret", {
    expiresIn: "24h",
  });
  return {
    success: true,
    status: 200,
    token,
    user: { _id: user._id, name: user.name, email: user.email },
  };
};
