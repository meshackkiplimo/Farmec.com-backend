import express from "express";
import multer from "multer";
import MyRentController from "../controllers/MyRentController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRentRequest } from "../middleware/validation";

const router = express.Router();


const storage = multer.memoryStorage()
const upload = multer({ 
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    }

})
//api restaurant


router.post(
    "/",
    upload.single("imageFile"),
    validateMyRentRequest,
    jwtCheck,
    jwtParse,
   
    MyRentController.createMyRent
)
export default router