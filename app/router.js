const path = require("path");


//Router listeners
var router = function(app) {
    app.get('/', function(req, res){
        res.status(200).sendFile(path.join(__dirname +'/../client/home-library.html'));
    });

    app.get('/write-library', function(req, res){
        res.status(200).sendFile(path.join(__dirname +'/../client/write-library.html'));
    });

    app.get('/browse-library', function(req, res){
        res.status(200).sendFile(path.join(__dirname +'/../client/browse-library.html'));
    });
}

module.exports = router;