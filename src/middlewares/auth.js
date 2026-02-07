const { TokenExpiredError } = require("jsonwebtoken")
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next)=>{
    try{
        // read the token from req cookies
    const cookies = req.cookies
    const  { token } = cookies

    if(!token){
        throw new Error("Token is not valid");
    }

    const decodedObj = await jwt.verify(token, "DEV@Tinder$790SecretKey")

    // validate the TokenExpiredError
    const { _id } = decodedObj;
    const user = await User.findById(_id)
    if(!user){
        throw new Error("User not found");
    }
    // attach the validated user data
    req.user=user;
    next()
    } catch (err){
        res.status(400).send("Error "+ err.message);
    }


}

module.exports = {
    userAuth
}