const express = require('express')

const connectDB = require("./config/database")
const User = require("./models/user")

const app = express();

app.use(express.json())

app.get("/user", async (req, res)=>{
    const userEmail = req.body.emailId

    try{
        const users = await User.find({emailId : userEmail})
        if(users.length === 0){
            res.status(404).send("user not found")
        } else{
            res.send(users)
        }
    } catch(err){
        res.status(400).send("something went wrong!")
    }
    
})

// delete user
app.delete("/user", async(req, res)=>{
    try{
        // const user = await User.findByIdAndDelete({_id: req.body.id})
        const user = await User.findByIdAndDelete(req.body.id)
        if(!user){
            res.status(404).send("user not found")
        } else{
            res.send(user)
        }
    } catch(err){
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

app.patch("/user/:id", async(req, res)=>{
    try{
        const updateData = req.body

        //only these fields are allowed to update
        const ALLOWED_UPDATES = [ "photoUrl", "about", "gender", "age", "skills"]
        const isUpdateAllowed = Object.keys(updateData).every((k)=>
            ALLOWED_UPDATES.includes(k)
        )


        if(!isUpdateAllowed){
            throw new Error("update not allowed");
        }

        if(updateData?.skills.length>10){
            throw new Error("skills cannot be more than 10")
        }

        const user = await User.findOneAndUpdate({_id : req.params?.id}, updateData, {
            runValidators: true
        })
        if(!user){
            res.status(404).send("data not found")
        } else{
            res.send(user)
        }
    } catch(err){
        res.status(400).send("Update failed "+ err.message)
    }  
})

app.get("/feed", async (req, res)=>{
    try{
        const users = await User.find({})
        res.send(users)
    } catch(err){
        res.status(400).send("something went wrong!")
    }
    
})



app.post("/signup", async (req, res)=>{
    const user = new User(req.body)

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


