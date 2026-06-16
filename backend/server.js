const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

// 🔑 PUT YOUR GEMINI API KEY HERE
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ CHAT ROUTE (REAL AI)
app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-lite"
        });

        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();

        console.log("User:", userMessage);
        console.log("AI:", text);

        res.json({ reply: text });

    } catch (error) {
        console.log("ERROR:", error.message);

        res.json({
            reply: "AI Error: " + error.message
        });
    }
});

// 🚀 SERVER START
app.listen(3000, () => {
    console.log("Gemini AI Server running on http://localhost:3000");
});