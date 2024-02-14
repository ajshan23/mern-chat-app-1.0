import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";














export const signupUser=async(req,res)=>{
    try {
        const {fullName,username,password,confirmPassword,gender}=req.body;
        // console.table(fullName,username,password,confirmPassword,gender);
        if (password!==confirmPassword) {
            return res.status(400).json({error:"Password Does not Match"})
        }
        const user=await User.findOne({username})

        if (user) {
            return res.status(400).json({error:"Username already exists"})
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)

        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}&size=200`
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}&size=200`


        const newUser=await User.create({
            fullName:fullName,
            password:hashedPassword,
            gender:gender,
            username:username,
            profilePic:gender==="male"? boyProfilePic:girlProfilePic
        }).catch((error)=>console.log(error))
        
        await generateTokenAndSetCookie(newUser._id,res)
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            profilePic:newUser.profilePic,
        })
    } catch (error) {
        console.log("Error in signup controller:",error);
        res.status(500).json({error:"Internal server error"})
    }
}


export const loginUser=async(req,res)=>{
    try {
        const {username,password}=req.body
        const user=await User.findOne({username})
        const isPasswordcorrect=await bcrypt.compare(password,user?.password || "");

        if (!user || !isPasswordcorrect) {
            return res.status(400).json({
                error:"Invalid username or password"
            })
        }
        await generateTokenAndSetCookie(user._id,res)
        res.status(201).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic,
        })
    } catch (error) {
        console.log("Error in login controller:",error);
        res.status(500).json({error:"Internal server error"})
    }
}



export const logoutUser=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
        
    } catch (error) {
        console.log("Error in logout controller");
        res.status(500).json({error:"Internal server error"})
    }
}