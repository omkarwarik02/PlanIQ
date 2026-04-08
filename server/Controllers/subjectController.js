const { error } = require("better-auth/api");
const Subject = require("../Models/Subject");

const subjectController = async(req,res) =>{


    try{

         const {name,difficulty,hours} = req.body;

    if(!name || !difficulty || !hours){
        return res.status(400).json({
            message:" All fields are empty"
        });

    }

    const subject = new Subject({
        name,
        difficulty,
        hours
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

const deleteSubjectController = async(req,res) => {
    try{
        const {id} = req.params;
        const subject = await Subject.findByIdAndDelete(id);

        if(!subject){
            return res.status(404).json({message:'subject not found'});
        }

        res.status(201).json({message:"Subject deleted successfully"});



    } catch(error){
        res.status(500).json({error:err.message});
    }
}
module.exports = {subjectController,getSubjectController,deleteSubjectController}