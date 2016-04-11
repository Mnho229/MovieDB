var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var database = require('../../database');

module.exports = function(req, res){
    
    var generate = database.addActor(req.body.fname, req.body.lname, req.body.yob, req.body.gender).then(function(value) {

        res.send(value);

    }, function(value) {

        res.send(value);

    });
}