const joi =require('joi')
const signUpValidate=(req,res,next)=>{
    const schema=joi.object({
        name:joi.string().min(3).max(100).required(),
        email:joi.string().required().email(),
        password:joi.string().min(5).max(20).required()
    })
    const {error}=schema.validate(req.body)
    if(error){
        return res.status(400).json({message:"Bad requests",error})
    }
    next();
}
const logInValidate=(req,res,next)=>{
    const schema=joi.object({
        email:joi.string().required().email(),
        password:joi.string().min(5).max(20).required()
    })
    const {error}=schema.validate(req.body)
    if(error){
        return res.status(400).json({message:"Bad requests",error})
    }


    next();
}

module.exports={
    signUpValidate,
    logInValidate
}