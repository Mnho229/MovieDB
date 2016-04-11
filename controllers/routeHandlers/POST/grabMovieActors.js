var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var database = require('../../database');

module.exports = function(req, res){
    
    var generate = database.genMovieActors(req.body.content).then(function(value) {

        res.send(value);

    }, function(value) {

        res.send(value);

    });
}