const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.resolve(__dirname + "/../client")));

//Router listeners
app.get('/write-library', function(req, res){
    res.status(200).sendFile(path.join(__dirname +'/../client/write-library.html'));
});

app.get('/browse-library', function(req, res){
    res.status(200).sendFile(path.join(__dirname +'/../client/browse-library.html'));
});

var outputFile = './files/library.txt';
//service listeners
app.post('/write-record', function(req, res) {
    var data = req.body.data;

    console.log(data);

    if(fs.existsSync(outputFile)){
        data = "," + data;
    };

    fs.appendFile(outputFile, data, function(err) {
        if(err) {
            res.send(err);
        } else {
            res.send("SUCCESS");
        }
    })

});
app.listen(3500);

app.get('/read-records', function(req, res) {
    console.log("In read records");
    fs.readFile(outputFile, "utf8", function(err, data){
        if(err) {
            res.send(err);
        } else {
            data = "[" + data + "]";
            console.log(data);
            res.send(data);
        }
    });
});

console.log("Server is running...");