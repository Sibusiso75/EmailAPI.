const express= require("express")
const dotenv =require("dotenv")
const User = require("./User")
const cors =require("cors")
const mongoose = require("mongoose")
const nodemailer = require("nodemailer")
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors({
  origin:["https://sibusisomatebese.netlify.app"],
  credentials:true
}))
mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("DB Database connected successfully")
}).catch((err)=>{
  console.log(err)
})

app.post("/contact", async (res, req)=>{
    try {
       const {firstName, lastName, email, message} =req.body;

       await new User({
        firstName,
        lastName,
        email,
        message
       }).save()

    var transporter = nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:process.env.MYEMAIL, pass:process.env.MYPASSWORD}
    })
    var mailOptions = {
      from:email,
      to:process.env.MYEMAIL,
      subject:"Reaching out through the form",
      html:`
      ${message} from ${firstName} ${lastName}
      ${phoneNumber}, ${email}

      `
    }
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error)
      }
      else{
       return res.json({status:true, message:"Email sent"})
      }
    })




     









        
    } catch (error) {
     res.json({error})
    }
})

    

    
    






app.listen(5000, ()=>{
    console.log("Listening to port 5000")
})
