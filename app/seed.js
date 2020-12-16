const MongoClient = require("mongodb").MongoClient;
const libraryDatabase = require('harry-potter-spells');

var dbURL = process.env.DB_URI || "mongodb://localhost";

var initializeDatabase = function() {
    MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) {
        if(err){
            console.log("Error: " + err);
        } else {
            var dbo = client.db("libraryDatabase");

            dbo.collection("titles").find().toArray(function(err, data) {
                if(err) {
                    client.close();
                    console.log("Error: " + err);
                } else {
                    if(data.length === 0) {
                        var titles = libraryDatabase.all;

                        dbo.collection("titles").insertMany(titles, function(err, response){
                          if(err) {
                              console.log("Error: " + err);
                          }  else {
                              console.log("Added seed records");
                              client.close();
                          }
                        });
                    } else {
                        client.close();
                        console.log("Seed record already exists")
                    }
                }
            }
        }
    });
}

exports.initializeDatabase = initializeDatabase;