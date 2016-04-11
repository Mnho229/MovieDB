var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var database = require('../../database');

module.exports = function(req, res){
    
    var generate = database.grabMovieMID(req.body.title, req.body.year).then(function(value) {
        
        if (req.body.movieattr == "genre") {
            database.grabGenreGID(req.body.replace).then(function(valueG) {
                console.log(valueG);
                database.updateMovie(req.body.movieattr, valueG, value).then(function(value3) {
                    res.send(value3);
                }, function(value3) {
                    res.send(value3);
                });

            }, function(valueG) {

                res.send(valueG);
            });
        }
        else {
            database.updateMovie(req.body.movieattr, req.body.replace, value).then(function(value2) {
                res.send(value2);
            }, function(value2) {
                res.send(value2);
            });
        }

    }, function(value) {

        res.send(value);

    });
}