const jwt=require('jsonwebtoken')

const ensureAuthToken=(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(401).json({message:"require token", success:false})
    }
   try{
    const decoded=jwt.verify(auth,process.env.SECRET_KEY)
    req.user=decoded
    next()
   }catch(error){
    return res.status(401).json({message:"Json token expired or wrong",error})
   }
  
}

module.exports=ensureAuthToken