import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

//login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new Error("username and password are required");
    }

    const user = await User.findOne({ username });

    if (!user) {
      console.log("no user bhitra");
      throw new Error("Cant find the user");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Incorrect password");
    }

    const token = generateToken(user._id);

    res.status(200).json({ username: username, token: token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//signup
const signupUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new Error("username and password are required");
    }

    const usernameExist = await User.findOne({ username });

    if (usernameExist) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      username,
      password: hashedPassword,
    });
    const token = generateToken(createdUser._id);
    return res.status(200).json({ username: username, token: token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export { signupUser, loginUser };
