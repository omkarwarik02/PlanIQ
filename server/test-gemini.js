require("dotenv").config();
const ai = require("./config/ai");

async function test() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say hello from PlanIQ"
    });
    console.log("✅ SUCCESS:", response.text);
  } catch (err) {
    console.log("❌ Error:", err.message);
  }
}

test();