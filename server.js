const express = require("express");
const path = require("path"); // 1. Added the missing path module

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

let messages = [];

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/messages", function(req, res){
    res.json(messages);
});

// POST new message
app.post("/messages", function(req, res){
    const text = req.body && req.body.text;

    if (typeof text !== "string" || !text.trim()) {
        return res.status(400).json({
            success: false,
            error: "Message text is required"
        });
    }

    messages.push(text.trim());
    res.json({
        success: true
    });
});

if (require.main === module) {
    app.listen(PORT, function() {
        console.log(`Server is running successfully on http://localhost:${PORT}`);
    });
}

module.exports = app;
