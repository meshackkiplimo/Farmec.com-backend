import { Request,Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors =  async(req:Request,res:Response,next:NextFunction)=>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next()

}

export const validateMyUserRequest = [
   
    body("firstName").isString().notEmpty().withMessage("Name must be a string"),
    body("lastName").isString().notEmpty().withMessage("Name must be a string"),
    body("address").isString().notEmpty().withMessage("address must be a string"),
    body("town").isString().notEmpty().withMessage("town must be  a string"),

    body("county").isString().notEmpty().withMessage("county must be  a string"),
    body("phoneNumber").isString().notEmpty().withMessage("phoneNumber must be a string"),
    
    handleValidationErrors,
    


]

export const validateMyRentRequest =[

    body("rentName").notEmpty().withMessage("Rent name is required"),
    body("town").notEmpty().withMessage("town is required"),
    body("county").notEmpty().withMessage("county is required"),
    body("deliveryPrice").isFloat({min:0}).withMessage("delivery prize must be a positive number"),
    body("estimatedDeliveryTime").isInt({min:0}).withMessage("estimated delivery time must be a positive integer"),
    body("machines").isArray().withMessage("category must be an array").not().isEmpty().withMessage("machines array cannot be empty"),
    body("categoryItems").isArray().withMessage("category items must be an  array"),
    body("categoryItems.*.name").notEmpty().withMessage("categoryItem name is required"),
    body("categoryItems.*.price").isFloat({min:0}).withMessage("categoryItem price is required"),
    handleValidationErrors,
    
    
    

]