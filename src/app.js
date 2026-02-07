const express = require('express')

const connectDB = require("./config/database")
const User = require("./models/user")
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt")
const validator = require('validator')
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const { userAuth } = require("./middlewares/auth");

const app = express();

app.use(express.json())
app.use(cookieParser())

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId

    try {
        const users = await User.find({ emailId: userEmail })
        if (users.length === 0) {
            res.status(404).send("user not found")
        } else {
            res.send(users)
        }
    } catch (err) {
        res.status(400).send("something went wrong!")
    }

})

// delete user
app.delete("/user", async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete({_id: req.body.id})
        const user = await User.findByIdAndDelete(req.body.id)
        if (!user) {
            res.status(404).send("user not found")
        } else {
            res.send(user)
        }
    } catch (err) {
        res.status(400).send("something went wrong!")
    }

})

// // update user
// app.patch("/user", async(req, res)=>{
//     try{
//         const updateData = req.body
//         const user = await User.findOneAndUpdate({_id : req.body.id}, updateData)
//         res.send(user)
//     } catch (err){
//         res.status(400).send("something went wrong!")
//     }

// })

app.patch("/user/:id", async (req, res) => {

    try {
        const updateData = req.body


        //only these fields are allowed to update
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"]
        const isUpdateAllowed = Object.keys(updateData).every((k) =>
            ALLOWED_UPDATES.includes(k)
        )



        if (!isUpdateAllowed) {
            throw new Error("update not allowed");
        }


        if (updateData?.skills?.length > 10) {
            throw new Error("skills cannot be more than 10")
        }


        const user = await User.findOneAndUpdate({ _id: req.params?.id }, updateData, {
            runValidators: true
        })
        if (!user) {
            res.status(404).send("data not found")
        } else {
            res.send(user)
        }
    } catch (err) {
        res.status(400).send("Update failed " + err.message)
    }
})

app.get("/feed", userAuth, async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(400).send("something went wrong!")
    }

})



app.post("/signup", async (req, res) => {

    try {
        //validate
        validateSignUpData(req)

        //encrypt
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10)
        console.log("password hash is .... ", passwordHash)


        const user = new User({
            firstName, 
            lastName, 
            emailId, 
            password: passwordHash
        })


        await user.save()
        res.send("user created")
    } catch (err) {
        res.status(400).send("error saving the user " + err)
    }
})

app.post("/login", async (req, res)=>{
    try{
        const {emailId, password} = req.body;

        //find the user exist or not
        const user = await User.findOne({emailId: emailId})

        if(!user){
            throw new Error("user not found in the database")
        }

        const validateEmailId = validator.isEmail(emailId)
        if(!validateEmailId){
            throw new Error("Invalid credentials")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(isPasswordValid){

            // create jwt token
            const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790SecretKey", { expiresIn : "7d"});

            //add the token to cookie and send the response back to the user

            res.cookie("token", token, {
                // expiring the complete cookie(optional)
                expires: new Date(Date.now() + 8 * 3600000)
            })

            res.status(201).send("user login succesful")
        }
        else{
            throw new Error("Invalid credentials")
        }

    } catch(err){
         res.status(400).send("error in the loggin " + err)
    }

})

app.get("/profile", userAuth,  async(req, res)=>{
    try{
    const user = req.user
    res.send(user)
    } catch (err){
        res.status(400).send("Error "+ err.message);
    }
})

app.post("/sendConnectionRequest", userAuth, async(req, res)=>{
    // sending a connection request
    const user = req.user
    console.log(user.firstName + " is sending a connection request");

    res.send(user.firstName + " is sending a connection request");

})

connectDB()
    .then(() => {
        console.log("database connection successful")
        app.listen(3000, () => {
            console.log("the server has neen started on port 3000")
        })
    }).catch((err) => {
        console.error("database connection failed!")
    })


