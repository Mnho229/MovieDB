var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var database = require('../../database');

module.exports = function(req, res){
    
    var generate = database.grabActorPID(req.body.fname, req.body.lname).then(function(value) {
        
        database.updateActor(req.body.actorattr, req.body.replace, value).then(function(value2) {
            res.send(value2);
        }, function(value2) {
            res.send(value2);
        });

    }, function(value) {

        res.send(value);

    });
}