const fs = require('fs');
var outputFile = './files/library.txt';

//service listeners
var services = function(app){
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
                res.send("Book Submitted Successfully");
            }
        })
    });
    
    app.get('/read-records', function(req, res) {
        fs.readFile(outputFile, "utf8", function(err, data){
            if(err) {
                res.send(err);
            } else {
                data = "[" + data + "]";
                //console.log(data);
                res.send(data);
                }
        });
    });

    app.delete('/delete-records', function(req, res) {  
        var data = req.body.data;
        var id = data.id;
        
        fs.readFile(outputFile, "utf8", function(err, data){
            if(err) {
                res.send(err);
            } else {
                data = "[" + data + "]";
                res.send(data);

                var parsedData = JSON.parse(data);
                console.log(parsedData);
                for(var i=0; i<parsedData.length; i++) {
                    if(id == parsedData[i].ID) {
                    parsedData.splice(i,1);
                    break;
                    }
                }
                var dataString = JSON.stringify(parsedData)
                fs.writeFile(outputFile, "utf8", function(err, data){
                    if(err){
                        res.send(err);
                    } else{
                        data = "[" + data + "]";
                    res.send(data);
                    }
                })
            }
        });


        });
    
}

module.exports = services;