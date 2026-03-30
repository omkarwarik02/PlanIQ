const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name:{
        type:string,
        required:true,
    },
    difficulty:{
        type:string,
        enum:["Easy","Medium","Hard"],
        required:true,
    },
    totalHours:{
        type:Number,
        required:true
    }
},{timestamps:true});

export default mongoose.model("Subject",subjectSchema);