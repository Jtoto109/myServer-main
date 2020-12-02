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
                res.send("SUCCESS");
            }
        })
    });
    
    app.get('/read-records', function(req, res) {
        fs.readFile(outputFile, "utf8", function(err, data){
            if(err) {
                res.send(err);
            } else {
                data = "[" + data + "]";
                var parsedData = JSON.parse(data);
                res.send(data);
                }
        });
    });

    app.delete('/delete-records', function(req, res) {  
        var deleteID = req.body.deleteID;
        
        fs.readFile(outputFile, "utf8", function(err, data){
            if(err) {
                res.send(err);
            } else {
                data = "[" + data + "]";
                var libraryData = JSON.parse(data);

                for(var i=0; i<libraryData.length; i++) {
                    if(libraryData[i].ID == deleteID){
                        libraryData.splice(i,1);
                        break;
                    }
                }
               
                var updatedData = JSON.stringify(libraryData);
                var storeUpdatedData = updatedData.substring(1, updatedData.length-1);
            
                fs.writeFile(outputFile, storeUpdatedData, function(err) {
                    if(err) {
                        res.send(err); 
                    } else {
                        res.send("SUCCESS");
                    }
                })
            }
        });


        });
    
}

module.exports = services;