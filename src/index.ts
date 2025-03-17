import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

import myUserRoute from "./routes/MyUserRoute";
import { v2 as cloudinary } from "cloudinary";
import myRentRoute from "./routes/MyRentRoute";
import rentRoute from "./routes/RentRoute";
import orderRoute from "./routes/OrderRoute";
import connectDB from "./config/db";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(cors());

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());



app.use("/api/my/user", myUserRoute);
app.use("/api/my/rent", myRentRoute);
app.use("/api/rent", rentRoute);
app.use("/api/order", orderRoute);
connectDB();
app.listen(7000, () => {
  console.log("server started on localhost:7000");
});
