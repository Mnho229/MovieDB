var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var database = require('../../database');

module.exports = function(req, res){

    var generate = database.grabGenreGID(req.body.Gname).then(function(value) {

        database.addMovie(req.body.title, req.body.year, value, req.body.rating).then(function(value2) {
            res.send(value2);
        }, function(value2) {
            res.send(value2);
        });

    }, function(value) {

        res.send(value);
    });
    
}