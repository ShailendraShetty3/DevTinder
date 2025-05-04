const express = require('express')

const app = express();

app.use("/test", (req, res)=>{
    res.send("this is the message from the server")
})

app.use("/home", (req, res)=>{
    res.send("this is the home ....")
})

app.listen(3000, ()=>{
    console.log("the server has neen started on port 3000")
})