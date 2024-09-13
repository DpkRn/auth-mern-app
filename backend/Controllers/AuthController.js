const UserModel = require("../Models/User");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const signup=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        
        const user=await UserModel.findOne({email:email})
        if(user){
            return res.status(409).json({message:"user exists",success:false})
        }
        const userModel=new UserModel({name,email,password})
        userModel.password=await bcrypt.hash(password,10)
        await userModel.save()
        res.status(201).json({message:"successfully signup",success:true})
    }catch(err){
        res.status(500).json({message:"internal server error",success:false})
    }
}
const login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        console.log(req.body)
        const user=await UserModel.findOne({email:email})
        
        if(!user){
            return res.status(404).json({message:"user not found",success:false})
        }
        const validate=await bcrypt.compare(password,user.password);
        if(!validate)
            return res.status(401).json({message:"password incorrect",success:false})
        const jwToken=jwt.sign({email:user.email,_id:user._id},process.env.SECRET_KEY,{expiresIn:'24h'})
        res.status(200).json({
            message:"successfully Logged In",
            success:true,
            email,
            jwToken,
            name:user.name
        })
    }catch(err){
        res.status(500).json({message:"internal server error",success:false})
    }
}
module.exports={
    signup,
    login
}