var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var database = require('../../database');

module.exports = function(req, res){
    
    var generate = database.grabActorPID(req.body.fname, req.body.lname).then(function(pid) {

        database.grabMovieMID(req.body.title, req.body.year).then(function(mid) {

            database.addRole(mid, pid, req.body.role).then(function(value) {
                res.send(value);
            }, function(value) {
                res.send(value);
            });

        }, function(mid) {
            res.send(mid);
        });

    }, function(pid) {

        res.send(pid);

    });
}