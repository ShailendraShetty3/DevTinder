const express = require("express");
const { validateSignUpData } = require("../utils/validation")
const bcrypt = require("bcrypt")
const validator = require('validator')

const User = require("../models/user")

const { userAuth } = require("../middlewares/auth");


const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {

    try {
        //validate
        validateSignUpData(req)

        //encrypt
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10)

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

authRouter.post("/login", async (req, res)=>{
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

        // const isPasswordValid = await bcrypt.compare(password, user.password)
        const isPasswordValid = await user.ValidatePassword(password)

        if(isPasswordValid){

            // create jwt token

            ///offloaded to the user.js(just as a good practice)
            // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790SecretKey", { expiresIn : "7d"});
            const token = await user.getJWT();
            ///////

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


authRouter.post("/logout", async (req, res)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout successful");

})



module.exports = authRouter;