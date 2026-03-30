const { error } = require("better-auth/api");
const Subject = require("../Models/Subject");

const subjectController = async(req,res) =>{


    try{

         const {name,difficulty,totalHours} = req.body;

    if(!name || !difficulty || !totalHours){
        return res.status(400).json({
            message:" All fields are empty"
        });

    }

    const subject = new Subject({
        name,
        difficulty,
        totalHours
    })
    await subject.save();


    res.status(201).json({
      message: "Subject added successfully",
      subject,
    });

    }catch(err){
        res.status(500).json({
      error: err.message,
        })
   
}
}

const getSubjectController = async(req,res) =>{
    try{
        const subjects = await Subject.find()

        res.status(201).json({
            subjects,
        })
    } catch(err) {
        res.status(500).json({
            error:err.message,
        })
    }
}
module.exports = {subjectController,getSubjectController}