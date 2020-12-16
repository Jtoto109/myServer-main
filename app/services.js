//const fs = require('fs');
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const dbURL = process.env.DB_URI || "mongodb://localhost"; 

//var outputFile = './files/library.txt';
//service listeners
var services = function(app){
    app.post('/write-record', function(req, res) {
        //var data = req.body.data;

        var data = {
            bookTitle: req.body.bookTitle,
            author: req.body.author,
            publisher: req.body.publisher,
            yearPublished: req.body.yearPublished,
            Isbn: req.body.isbn            
        };

        MongoClient.connect(dbURL, {useUnifiedTopology:true}, function(err, client) {
			if(err){
				return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
			} else {
				var dbo = client.db("libraryDatabase");

				dbo.collection("titles").insertOne(data), function(err, data){
					if(err) {
						client.close();
						return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
					} else {
						client.close();
						return res.status(200).send(JSON.stringify({msg:"SUCCESS"}));

					}
				};
			}
		});

    })
    
    app.get('/read-records', function(req, res) {
        MongoClient.connect(dbURL, {useUnifiedTopology:true}, function(err, client) {
			if(err){
				return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
			} else {
                var dbo = client.db("libraryDatabase");
                
                dbo.collection("titles").find().toArray(function(err, data){
					if(err) {
						client.close();
						return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
					} else {
						client.close();
						return res.status(200).send(JSON.stringify({msg:"SUCCESS", titles: data}));

					}
				});
			}
        });
    })

        
  app.delete('/delete-record', function(req, res) {  
        var deleteID = req.body.deleteID;
        
        var t_id = new ObjectID(deleteID);
        var search = {_id: s_id};

        MongoClient.connect(dbURL, {useUnifiedTopology:true}, function(err, client) {
            if(err){
                return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
            } else {
                var dbo = client.db("libraryDatabase");
                
                dbo.collection("titles").deleteOne(search, function(err, data) {
                    if(err){
                        return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
                    } else {
                        client.close();
                        return res.status(200).send(JSON.stringify({msg:"SUCCESS"}));
                    }
                });
            }
        });
     })
}
        

module.exports = services;