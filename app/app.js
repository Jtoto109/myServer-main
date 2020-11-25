const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
//const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/client", express.static(path.resolve(__dirname + "/../client")));

//make the server
var server; 
var port = process.env.PORT || process.env.NODE_port || 3500;

//var outputFile = './files/library.txt';
//router listeners
var router = require("./router.js");
router(app);

//services listeners
var services = require("./services.js");
services(app);

//App Listener
server = app.listen(port, function(err) {
    if(err){
        throw err;
    }
    console.log("Listening on port " + port);
});

//app.listen(3500); added code from line 24 so this is no longer needed
//console.log("Server is running...");