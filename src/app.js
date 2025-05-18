const express = require('express')

const app = express();


app.get("/user/:id/:name", (req, res)=>{
    console.log(req.params)
    res.send({firstname:'Shailendra', lastname: 'Shetty'})
})

app.listen(3000, ()=>{
    console.log("the server has neen started on port 3000")
})
