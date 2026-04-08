require("dotenv").config();
const { error } = require("better-auth/api");
const ai = require("../config/ai");

const generatePlan = async(req,res)=>{
const {subjects} = req.body;

if(!subjects || !subjects.length === 0){
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
try{
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













module.exports ={generatePlan}