import express from "express";
import data from "./data";
import dotenv from "dotenv";
import path from "path";

import config from "./config";
import mongoose from "mongoose";

import userRouter from "./routes/userRoute";
import productRouter from "./routes/productRoute";
import orderRouter from "./routes/orderRoute";
// import uploadRoute from "./routes/uploadRoute";

import bodyParser from "body-parser";

dotenv.config();

const mongodbUrl = config.MONGODB_URL;

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected database successfull!!!");
  })
  .catch((err) => {
    console.log(err.reason);
  });

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  console.log("Set static production");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log("Listening on port " + port);
});

module.exports.handler = app;
