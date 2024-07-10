import express from "express"
import {param} from "express-validator"
import RentController from "../controllers/RentController"

const router = express.Router()
router.get(
  "/:rentId",
  param("rentId")
.isString()
.trim()
.notEmpty()
.withMessage("RentId  parameter must be a valid string"),
RentController.getRent

);




router.get(
    "/search/:city",
    param("city")
     .isString()
     .trim()
     .notEmpty()
     .withMessage("City parameter must be a valid string"),
   RentController.searchRent  

    )

export default router