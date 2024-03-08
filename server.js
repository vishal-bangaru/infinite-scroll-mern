const exp=require('express')
const app=exp()
app.use(exp.static('public'))
const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const verifyToken=require("./verifyToken")
require('dotenv').config()
const port=process.env.PORT||4000
app.listen(port,()=>{
    console.log("Server running on 4000")
})
app.use(exp.json())
const path=require("path")

// //connecting to react build (frontend and backend)
// app.use(exp.static(path.join(__dirname,'build')))



const mclient=require("mongodb").MongoClient;
mclient
.connect("mongodb://127.0.0.1:27017")
.then((dbRef)=>
{   
    
      const dbObj=dbRef.db('usersdb')
      const userCollectionObj=dbObj.collection('users')
      const prodCollectionObj=dbObj.collection('products')
      console.log("db connection successful")
     app.set("userCollectionObj",userCollectionObj)
     app.set("prodCollectionObj",prodCollectionObj)
})
.catch((err)=>console.log("db connection error"));
app.get("/posts",verifyToken,expressAsyncHandler(async(req,res)=>
{
    const { limit , page  } = req.query;
    const prodCollectionObj=req.app.get("prodCollectionObj")
    // Convert query parameters to numbers
    const limitValue = parseInt(limit);
    const pageValue = parseInt(page);
    
    // Calculate skip value based on page number and limit
    const skip = (pageValue -1) * limitValue;

 
        // Fetch data from the database with pagination
        const docs = await prodCollectionObj.find().skip(skip).limit(limitValue).toArray();
        res.status(200).send({data:docs});
    
}))

//signup
app.post("/signup",async(req,res)=>
{
    let user=req.body;
    const userCollectionObj=req.app.get("userCollectionObj")
    const check=await userCollectionObj.findOne({username:user.username})
    if(user.password!==user.password_confirmation)
    res.status(200).send("Password doesn't match")
    if(check!=null)
    res.status(200).send("User already existed")
  
    else{
        delete user.password_confirmation
        delete user.terms
        hashedPassword=await bcryptjs.hash(user.password,5);
        user.password=hashedPassword;
    
    await userCollectionObj.insertOne(user)
    res.status(201).send("User created")
    }
})

//login
app.post("/login",expressAsyncHandler(async(req,res)=>{
    const userCollectionObj=req.app.get("userCollectionObj")
    let user=req.body
    let dbUser=await userCollectionObj.findOne({username:user.username})
    if(dbUser===null)
    res.status(200).send({message:"Invalid username"})
   else{
    let isEqual=await bcryptjs.compare(user.password,dbUser.password)
    if(isEqual==false)
     res.status(200).send({message:"Invalid password"})
    else{
        let token=jwt.sign({username:dbUser.username},process.env.SECRET_KEY,{expiresIn:60})
        delete dbUser.password
        res.status(201).send({message:"valid user",jwtToken:token})
    }
   }

}))




// const pageRefresh=(req,res,next)=>{
//     res.sendFile(path.join(__dirname,'./build/index.html'))
// }
// app.use("/*",pageRefresh)

const invalidPathHandlingMiddleware=(req,res,next)=>{
    res.send({message:"Invalid path"})
}
app.use(invalidPathHandlingMiddleware)
const errorHandlingMiddleware=(error,req,res,next)=>{
   res.status(400).send({message:error.message})
}
app.use(errorHandlingMiddleware)
