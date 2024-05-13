//import mongoose
const mongoose = require('mongoose')


//create schema using schema class in mongoose
const projectSchema = new mongoose.Schema({
    id:{
        type:Number,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true
    },
    projectImage:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    }
})

//create model
const projects = mongoose.model("projects",projectSchema)

//export model
module.exports = projects