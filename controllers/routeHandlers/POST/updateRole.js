var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var database = require('../../database');

module.exports = function(req, res){
    if (req.body.roleattr == "actor") {
        //if the attribute being changed is the actor, let any other suffixs be lumped into the last name
        //example: In Robert Downey Jr., Downey Jr. would be the last name.
        var tempNameHolder = req.body.replace.split(" ");

        if (tempNameHolder.length > 2)
        {
            for (var i = 2; i < tempNameHolder.length; i++) {
                tempNameHolder[1] = tempNameHolder[1] + " " + tempNameHolder[i];
            }
        }

        var generate = database.grabRoleTID(req.body.fname, req.body.lname, req.body.title, req.body.year, req.body.role).then(function(tid) {
            
            database.grabActorPID(tempNameHolder[0],tempNameHolder[1]).then(function(pid) {

                database.updateRole("pid", pid, tid).then(function(value) {
                    console.log(value);
                    res.send(value);
                }, function(value) {
                    console.log(value);
                    res.send(value);
                });
            }, function(pid) {
                res.send(pid);
            });

        }, function(tid) {

            res.send(tid);

        });
    }
    else if (req.body.roleattr == "movie") {

        var generate = database.grabRoleTID(req.body.fname, req.body.lname, req.body.title, req.body.year, req.body.role).then(function(tid) {
            
            database.grabMovieMID(req.body.replace, req.body.newyear).then(function(mid) {

                database.updateRole("mid", mid, tid).then(function(value) {
                    res.send(value);
                }, function(value) {
                    res.send(value);
                });
            }, function(mid) {
                res.send(mid);
            });

        }, function(tid) {

            res.send(tid);

        });
    }
    else if (req.body.roleattr == "role") {
        var generate = database.grabRoleTID(req.body.fname, req.body.lname, req.body.title, req.body.year, req.body.role).then(function(tid) {
            
            database.updateRole(req.body.roleattr, req.body.replace, tid).then(function(value) {
                res.send(value)
            }, function(value) {
                res.send(value);
            });

        }, function(tid) {

            res.send(tid);

        });
    }
    else {
        res.send("Failure");
    }
}



















