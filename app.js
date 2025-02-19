
// get express package and invoke it
const express = require("express");
const app = express();


const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()


// middleware
app.use(express.static('./public'))
app.use(express.json())


// routes 
app.get('/hello', (req, res) => {
    res.send('Task Manager App')
})


app.use('/api/v1/tasks', tasks)

const port = 3000


// function for server to listen on a port
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()