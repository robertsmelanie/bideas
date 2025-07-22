require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
    const userInput = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a golf expert helping users find budget-friendly clubs." },
                { role: "user", content: userInput }
            ],
            max_tokens: 300
        })
    });

    const data = await response.json();
    res.json(data.choices?.[0]?.message?.content || "No response");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});