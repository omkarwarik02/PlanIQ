require("dotenv").config();

const ai = require("../config/ai");
const Subject = require("../Models/Subject");


const generatePlan = async(req,res)=>{

try{
const subjects = await Subject.find({user:req.user.id}); 
if(!subjects || subjects.length === 0){
   return res.status(500).json({message:"No subjects found"});
}

const prompt =`You are an academic study planner AI for an app called PlanIQ.
Generate a structured 7-day weekly study plan based on the subjects below.
Rules:
- Allocate more time to Hard subjects, less to Easy ones
- Each day should have 2-4 study sessions max
- Keep focus topics specific and actionable
- Do not repeat the same focus topic twice

Return ONLY a valid JSON object, no extra text, no markdown:
{
  "plan": [
    {
      "day": "Monday",
      "sessions": [
        { "subject": "Mathematics", "duration": "2 hours", "focus": "Algebra revision" }
      ]
    }
  ]
}

Subjects:
${subjects.map(s => `- ${s.name} | Difficulty: ${s.difficulty} | Available: ${s.hours} hrs/day`).join("\n")}
`;

    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:prompt
    });
    const text = response .text;
    const clean = text.replace(/```json|```/g,"").trim();
    res.json(JSON.parse(clean));
}catch(err){
    console.error("generatePlane error:",err.message);
    res.status(500).json({error:"Failed to generate plan"});

}
};

const generateTasks = async(req,res)=>{
try {
    const subjects = await Subject.find({ user: req.user.id });

    if (!subjects || subjects.length === 0) {
      return res.status(400).json({ error: "No subjects found. Please add subjects first." });
    }

    const prompt = `
You are a study task planner for PlanIQ.
Generate specific, actionable study tasks for each subject below.
Each subject should have 3-5 tasks based on its difficulty and available hours.

Rules:
- Hard subjects get more tasks and longer durations
- Easy subjects get fewer, lighter tasks
- Task types can be: reading, practice, revision, watch, exercise

Return ONLY valid JSON, no extra text, no markdown:
{
  "tasksBySubject": [
    {
      "subject": "Physics",
      "tasks": [
        { "title": "Read Chapter 4", "duration": "30 mins", "type": "reading" }
      ]
    }
  ]
}

Subjects:
${subjects.map(s => `- ${s.name} | Difficulty: ${s.difficulty} | Available: ${s.hours} hrs/day`).join("\n")}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    const text = response.text;
    const clean = text.replace(/```json|```/g, "").trim();
    res.json(JSON.parse(clean));

  } catch (err) {
    console.error("generateTasks error:", err.message);
    res.status(500).json({ error: "Failed to generate tasks" });
  }
}



const chat = async(req,res)=>{
  const {message} = req.body;

  if(!message){
    return res.status(400).json({message:"message is required"});
  }

  //fetch subject using users id
try{
  const subjects =await Subject.find({user:req.user.id});
  const subjectContext = subjects.length?`The Student is currently studying:${subjects.map(s=>s.name).join(",")}.`:"";

      const prompt = `
You are PlanIQ's academic assistant. Help students understand concepts, solve problems, and guide their studies.
${subjectContext}
Be concise, clear, and encouraging. Use simple language.

Student asks: ${message}
`;

const response = await ai.models.generateContent({
  model:"gemini-2.5-flash",
  contents:prompt
})
  
res.json({reply:response.text})
}catch(err){
     console.error("chat error:", err.message);
    res.status(500).json({ error: "AI chat failed" })
}
}













module.exports ={generatePlan,generateTasks,chat}