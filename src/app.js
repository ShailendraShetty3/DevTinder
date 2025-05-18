const express = require('express')

const app = express();


app.get("/user", (req, res)=>{
    res.send({firstname:'Shailendra', lastname: 'Shetty'})
})

app.listen(3000, ()=>{
    console.log("the server has neen started on port 3000")
})
