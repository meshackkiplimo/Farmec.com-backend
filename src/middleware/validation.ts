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
   
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be  string"),
    body("city").isString().notEmpty().withMessage("city must be  a string"),

    body("country").isString().notEmpty().withMessage("c must be  a string"),

    handleValidationErrors,
    


]

export const validateMyRentRequest =[

    body("rentName").notEmpty().withMessage("Rent name is required"),
    body("city").notEmpty().withMessage("city is required"),
    body("country").notEmpty().withMessage("country is required"),
    body("deliveryPrice").isFloat({min:0}).withMessage("delivery prize must be a positive number"),
    body("estimatedDeliveryTime").isInt({min:0}).withMessage("estimated delivery time must be a positive integer"),
    body("machines").isArray().withMessage("category must be an array").not().isEmpty().withMessage("machines array cannot be empty"),
    body("categoryItems").isArray().withMessage("category items must be an  array"),
    body("categoryItems.*.name").notEmpty().withMessage("categoryItem name is required"),
    body("categoryItems.*.price").isFloat({min:0}).withMessage("categoryItem price is required"),
    handleValidationErrors,
    
    
    

]