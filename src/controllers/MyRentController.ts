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

        const image=  req.file as  Express.Multer.File;
        const base64Image = Buffer.from(image.buffer).toString("base64")
        const dataURI = `data:${image.mimetype};base64,${base64Image}`
        const uploadResponse =  await cloudinary.v2.uploader.upload(dataURI)
        const  rent =  new Rent(req.body)
        rent.imageUrl= uploadResponse.url
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

export default {
    getMyRent,

    createMyRent,
}