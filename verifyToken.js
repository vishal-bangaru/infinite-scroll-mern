const jwt=require("jsonwebtoken");
const verifyToken=(req,res,next)=>{
    
 const bearerToken=req.headers.authorization
 
 if(bearerToken.split(" ")[1]===null)
 res.status(201).send({"message":"Please Login"})
else{
    const token=bearerToken.split(" ")[1]
    try{
        jwt.verify(token,"user")
        next()
    }
    catch(err){
        res.status(202).send({"message":"Session Expired,Please Relogin"})
    }
}
}
module.exports=verifyToken