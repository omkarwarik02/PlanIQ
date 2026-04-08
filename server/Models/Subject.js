const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    difficulty:{
        type:String,
        enum:["easy","medium","hard"],
        required:true,
    },
    hours:{
        type:Number,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("Subject",subjectSchema);