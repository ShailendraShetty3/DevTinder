const express = require('express')

const connectDB = require("./config/database")
const User = require("./models/user")

const app = express();


app.post("/signup", async (req, res)=>{
    const user = new User({
        firstName : "this",
        lastName : "this",
        emailId : "this@gmail.com",
        password : "this"
    })

    try{
        await user.save()
        res.send("user created")
    } catch (err){
        res.status(400).send("error saving the user "+ err)
    }
})

connectDB()
.then(()=>{
    console.log("database connection successful")
    app.listen(3000, ()=>{
        console.log("the server has neen started on port 3000")
    })
}) .catch((err)=>{
    console.error("database connection failed!")
})


