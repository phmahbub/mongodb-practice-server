const express = require("express")
const cors = require("cors")
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()


//middileware
app.use(cors())
app.use(express.json())

//user: phmahbub
//pass: bagerhaT1

//connect database



// const uri = "mongodb+srv://phmahbub:bagerhaT1@cluster0.zvdscch.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// async function run(){
//     try{
//         const userCollection = client.db("nodeMongoCrud").collection("users")
//         const user = {
//             name: 'Ranga Vaia',
//             email: "ranga@mia.com"
//         }
//         const result = await userCollection.insertOne(user)
//         console.log(result)
//     }
//     finally{

//     }
// }
// run().catch(err=>console.log(err))




const uri = "mongodb+srv://phmahbub:bagerhaT1@cluster0.zvdscch.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const userCollection = client.db("StudentInformation").collection("student")
        //Create data to client (get API)-------------------------------------------------
        app.get('/student', async(req, res)=>{
            const query = {}
            const cursor = userCollection.find(query)
            const student = await cursor.toArray()
            res.send(student)
        })

        //update data to client (get API)-------------------------------------------------
        /*update and delete api is same but only difference in findOne/deleteOne.... in both cases we have select a specific data to complete action*/
        app.get('/student/:id', async(req, res)=>{
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const result = await userCollection.findOne(query)
            console.log(result)
            res.send(result)
        })


        //Read data to database (post API)----------------------------------------------
        app.post('/student', async(req, res)=>{
            const student = req.body
            console.log(student)
            const result = await userCollection.insertOne(student)
            res.send(result)
        })

        // Delete data --------------------------------------------------------------
        app.delete('/student/:id', async(req, res)=>{
            const id = req.params.id
            const query = {_id:ObjectId(id)}
            const result = await userCollection.deleteOne(query)
            res.send(result)
            // console.log('delete', id)
        })


    }finally{

    }
}
run().catch(err=>console.log(err))

app.get('/', (req, res)=>{
    res.send("I love you")
})

app.listen(port, ()=>{
    console.log("The server is running on port: ", port)
})