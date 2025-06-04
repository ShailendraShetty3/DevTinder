const adminAuth = (req, res, next)=>{
    const token="xyz"
    const isAuth = token ==="xyz"
    if(!isAuth){
        res.status(401).send("Unauthorized Request!")
    } else{
        console.log("Authorized user .......")
        next()
    }
}

const userAuth = (req, res, next)=>{
    const token = "xyz"
    const isAuth = token==="xyz"
    if(!isAuth){
        res.status(401).send("Unauthorized User!")
    } else{
        console.log("authorized in userAuth......")
        next()
    }
}

module.exports = {
    adminAuth, userAuth
}