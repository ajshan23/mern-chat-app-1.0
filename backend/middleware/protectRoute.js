import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"Unauthorized -non Token Provided"})
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({error:"Unauthorized - Token invalid"})
        }
        const user=await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({error:"User mnot found"})
        }

        req.user=user

        next()

    } catch (error) {
        console.log("Error in protectedRoute in middleware: ",error.message);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
}

export default protectRoute