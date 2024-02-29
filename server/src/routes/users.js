import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()



router.post("/register",async (req,res)=>{
    const {username,password} = req.body;

    const user = await userModel.findOne({username});

    if (user) {
        return res.json({message:"user already exisist"})
    }
const hashedPassword = await bcrypt.hash(password,10)

const newUser = new UserModel({username,password:hashedPassword});
await newUser.save();


    res.json({message:"user Registered Successfully"});
})

router.post("/login", async (req,res)=>{
    const {username,password} = req.body;

    const user = await userModel.findOne({username});
    if(!user){
        return res.json({message:"User Dosen't Exist"})
    }
    const isPasswordVaild = await bcrypt.compare(password,user.password)
    if(!isPasswordVaild){
        return res.json({message:"Username or Password is incorrect"})
    }
    const token =  jwt.sign({id:user._id},"secret")
    res.json({token,userID: user._id })

})









export { router as userRouter };