import { Request,Response } from "express"
import Rent from "../models/rent"
import cloudinary from "cloudinary"
// import Rent from "../models/rent"
import mongoose from "mongoose"


const getMyRent =  async (req:Request,res:Response) =>{
    try{
        const rent = await Rent.findOne({user:req.userId})
        if(!rent){
            return res.status(404).json({message:"rent not found"})
        }
        res.json(rent)

    } catch(error){
        console.log(error)
        res.status(500).json({message:"error fetching rent"})
    }

}


const createMyRent = async (req:Request,res:Response) =>{
    try{
        const existingRent=await Rent.findOne({user:req.userId})
        if(existingRent){
            return res
            .status(409)
             .json({message:"user platform already exist" })
        }

        
        const imageUrl = await uploadImage(req.file as Express.Multer.File)
        const  rent =  new Rent(req.body)
        rent.imageUrl= imageUrl
        rent.user=new mongoose.Types.ObjectId(req.userId)
        rent.lastUpdated =  new Date()
        await rent.save()
        res.status(201).send(rent)

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }

}
const updateMyRent = async (req: Request, res: Response) => {
    try {
      const rent = await Rent.findOne({
        user: req.userId,
      });
  
      if (!rent) {
        return res.status(404).json({ message: "rent not found" });

      }
      rent.rentName =req.body.rentName
      rent.city =req.body.city
      rent.deliveryPrice= req.body.deliveryPrice
      rent.estimatedDeliveryTime = req.body.estimatedDeliveryTime
      rent.machines =req.body.machines
      rent.categoryItems = req.body.CategoryItems
      rent.lastUpdated = new Date();


      if(req.file){
        const imageUrl = await uploadImage(req.file as Express.Multer.File)
        rent.imageUrl = imageUrl

      }
      await rent.save()
      res.status(200).send(rent)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }
}
const uploadImage =  async (file:Express.Multer.File) =>{
    const image= file
    const base64Image = Buffer.from(image.buffer).toString("base64")
    const dataURI = `data:${image.mimetype};base64,${base64Image}`
    const uploadResponse =  await cloudinary.v2.uploader.upload(dataURI)
    return uploadResponse.url

}
export default {
    getMyRent,

    createMyRent,
    updateMyRent,
}