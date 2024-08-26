const express = require("express")
const dotenv = require('dotenv')
const { default: mongoose } = require("mongoose")
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.get('/', (req, res) => {
    res.send('Hello World!')
})

mongoose.connect(`mongodb+srv://Wiinter:${process.env.MONGO_DB}@cluster.2kzn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`)
.then(() => {
    console.log('Connect Db success')
})
.catch((err) => {
    console.log(err)
})

app.listen(port, () => {
    console.log('Server is running in port: ' + port)
})