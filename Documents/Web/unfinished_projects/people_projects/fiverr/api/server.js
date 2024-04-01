import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "../api/routes/authRoute.js";
import userRoute from "../api/routes/userRoute.js";
import gigRoute from "../api/routes/gigRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

dotenv.config();

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Database is connected");
  } catch (error) {
    console.log(error.message);
  }
};

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/gigs", gigRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8080, () => {
  connect();
  console.log("Backend server is connected!");
});
