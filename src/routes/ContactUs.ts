import express from "express";
import { sendMail } from '../services/mailer';

const router = express.Router();



router.post("/", async (req, res) => {
    const { email, name, message } = req.body
    await sendMail(message, email, 'hezronchelimo.hc@gmail.com', `${name} Sent a message`, (error: any) => {
        if (!error) {
            res.status(200).json({ message: 'email sent!', })
        } else {
            res.status(400).json({ error, message: 'email not sent!', })
        }
    })
})


export default router
