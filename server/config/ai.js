const Groq = require("groq-sdk");

const ai = new Groq({ apiKey: process.env.GROQ_API_KEY });

module.exports = ai;
