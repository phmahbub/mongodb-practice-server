const express = require("express")
const cors = require("cors")
const port = process.env.PORT || 5000

const app = express()


//middileware
app.use(cors())
app.use(express.json())


app.get('/', (req, res)=>{
    res.send("I love you")
})

app.listen(port, ()=>{
    console.log("The server is running on port: ", port)
})