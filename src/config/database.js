const mongoose = require ("mongoose")

const connectDB = async()=>{
    // await mongoose.connect("mongodb+srv://shetty:shetty@cluster0.tztv9.mongodb.net/devTinder")
    // await mongoose.connect("mongodb+srv://admin:shetty@namastenode.fzqnwnt.mongodb.net/devTinder")
    await mongoose.connect(
  // "mongodb://admin:shetty@ac-2rv25uw-shard-00-00.fzqnwnt.mongodb.net:27017,ac-2rv25uw-shard-00-01.fzqnwnt.mongodb.net:27017,ac-2rv25uw-shard-00-02.fzqnwnt.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-nfo09a-shard-0&authSource=admin&retryWrites=true&w=majority"
  // "mongodb+srv://admin:shetty@namastenode.fzqnwnt.mongodb.net/?appName=NamasteNode"
  "mongodb+srv://admin:shetty@namastenode.fzqnwnt.mongodb.net/devTinder"
);

}

module.exports = connectDB

