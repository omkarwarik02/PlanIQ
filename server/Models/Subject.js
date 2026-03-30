const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    difficulty:{
        type:String,
        enum:["Easy","Medium","Hard"],
        required:true,
    },
    totalHours:{
        type:Number,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("Subject",subjectSchema);