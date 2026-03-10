const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

let messages = [];

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"public","index.html"));
})
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

module.exports=app;
