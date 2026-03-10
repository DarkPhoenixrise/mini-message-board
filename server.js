const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let messages = [];


app.get("/messages", function(req, res){
    res.json(messages);
});

// POST new message
app.post("/messages", function(req, res){
    messages.push(req.body.text+'t');
    res.json({
        success: true
    });
});

app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`);
});