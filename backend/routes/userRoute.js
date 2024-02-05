import express from "express";
import { loginUser, signupUser } from "../controllers/userController.js";

const Router = express.Router();

Router.post("/signup", signupUser);
Router.post("/login", loginUser);

export default Router;
