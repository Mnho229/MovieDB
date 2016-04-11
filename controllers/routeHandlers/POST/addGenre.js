var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var database = require('../../database');

module.exports = function(req, res){
    
    var generate = database.addGenre(req.body.Gname).then(function(value) {

        res.send(value);

    }, function(value) {

        res.send(value);

    });
}