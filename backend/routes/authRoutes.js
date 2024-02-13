import express from "express"
import { loginUser, logoutUser, signupUser } from "../controllers/auth.controller.js"

const router=express.Router()



router.use("/signup",signupUser)
router.use("/login",loginUser)

router.use("/logout",logoutUser)


export default router;