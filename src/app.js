const express = require('express')
const connectDB = require("./config/database")

const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json())
app.use(cookieParser())


const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/requests');


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/",requestRouter);


connectDB()
    .then(() => {
        console.log("database connection successful")
        app.listen(3000, () => {
            console.log("the server has neen started on port 3000")
        })
    }).catch((err) => {
        console.error("database connection failed!")
    })


