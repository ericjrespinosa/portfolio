const express = require("express");
const parser = require("body-parser");
const request = require("request");
const app = express();

app.use(express.static("public"));
app.use(parser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  console.log(req.body.firstName);
  console.log(req.body.lastName);
  console.log(req.body.email);
});

app.listen('3000', function() {
  console.log("server is running on port 3000");
});

