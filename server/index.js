import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import itemsRoute from "./routes/itemsRoute.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/items", itemsRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
