const mongoose = require ("mongoose")

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://shetty:shetty@cluster0.tztv9.mongodb.net/devTinder")
}

module.exports = connectDB