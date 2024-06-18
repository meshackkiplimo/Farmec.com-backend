import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from './routes/MyUserRoute'
import {v2 as cloudinary} from "cloudinary"
import myRentRoute from"./routes/MyRentRoute"
import rentRoute from "./routes/RentRoute"

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string) .
then(()=>console.log("connected to the database"))

cloudinary.config({

  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,

})


const app =express();
app.use(express.json())
app.use(cors());
app.get("/health",async(req:Request,res:Response) =>{
  res.send({message:"Health is ok"})
})
  
app.use("/api/my/user",myUserRoute)
app.use("/api/my/rent",myRentRoute)
app.use("/api/rent",rentRoute)
  app.listen(7000,()=>{
    console.log("server is running on port 7000")
  })