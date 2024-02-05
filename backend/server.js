import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import workoutRoute from "./routes/workoutsRoute.js";
import userRoute from "./routes/userRoute.js";

// express app
const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/workouts", workoutRoute);
app.use("/user", userRoute);

// connect to db

mongoose
  .connect(`${process.env.MONGO_URI}/workouts`)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
