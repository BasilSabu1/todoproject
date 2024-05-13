//1) import dotenv
//Loads .env file contents into process.env by default
require('dotenv').config()


//2) import express - to create server
const express = require('express')

//3) import cors
const cors = require('cors')

//import router
const router = require('./Routes/router')

//import connection.js file/ mongoose
require('./DB/connections')

//4) Create server - Creates an Express application. The express() function is a top-level function exported by the express module.
const pfServer = express()

//5) use of cors by server
pfServer.use(cors())

//6) Returns middleware that only parses json and convert it into javascript object
pfServer.use(express.json())

//server use router
pfServer.use(router)

//pfSever should use uploads folder
//first arg--> how the other applications should use this file
//second arg--> export the uploads folder
pfServer.use('/uploads',express.static('./uploads'))


//7) custom the port - bcz by default it runs in port 3000
const PORT = 4000 || process.env.PORT

//8) run server
pfServer.listen(PORT,()=>{
    console.log(`Server running successfully at port number ${PORT}`);
})

//9) Get http request to baseURL : http://localhost:4000/
pfServer.get('/',(req,res)=>{
    res.send(`<h1 style="color:red">project fair server running successfully and waiting for client requests</h1>`)
})
/* 
//post request
pfServer.post('/',(req,res)=>{
    res.send('post request')
})



//put request
pfServer.put('/',(req,res)=>{
    res.send('PUT request')
}) */