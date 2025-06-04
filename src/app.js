const express = require('express')

const {adminAuth, userAuth} = require('./middlewares/auth')

const app = express();


app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res)=>{
    res.send("data sent")
})

app.get("/admin/deleteUser", (req, res)=>{
    res.send("deleted user")
})

app.use("/user", userAuth, (req, res, next)=>{
    console.log("user request") 
    res.send("User request data")
},

(req, res)=>{
    console.log("second")
    res.send("second")
}
)
app.listen(3000, ()=>{
    console.log("the server has neen started on port 3000")
})
