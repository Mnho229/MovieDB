var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var database = require('../../database');

module.exports = function(req, res){
    if (req.body.releaseattr == "title") {
        
        var generate = database.grabReleaseRID(req.body.title, req.body.yearFR, req.body.medium, req.body.date).then(function(rid) {
            
            database.grabMovieMID(req.body.replace,req.body.newyearFR).then(function(mid) {

                database.updateRelease("mid", mid, rid).then(function(value) {
                    console.log(value);
                    res.send(value);
                }, function(value) {
                    console.log(value);
                    res.send(value);
                });
            }, function(mid) {
                res.send(mid);
            });

        }, function(rid) {

            res.send(rid);

        });
    }
    else if (req.body.releaseattr == "medium") {

        var generate = database.grabReleaseRID(req.body.title, req.body.yearFR, req.body.medium, req.body.date).then(function(rid) {
            
            database.grabMediumXID(req.body.replace).then(function(xid) {

                database.updateRelease("xid", xid, rid).then(function(value) {
                    res.send(value);
                }, function(value) {
                    res.send(value);
                });
            }, function(xid) {
                res.send(xid);
            });

        }, function(rid) {

            res.send(rid);

        });
    }
    else if (req.body.releaseattr == "date") {
        var generate = database.grabReleaseRID(req.body.title, req.body.yearFR, req.body.medium, req.body.date).then(function(rid) {
            
            database.updateRelease("dateStamp", req.body.replace, rid).then(function(value) {
                res.send(value)
            }, function(value) {
                res.send(value);
            });

        }, function(rid) {

            res.send(rid);

        });
    }
    else {
        res.send("Failure");
    }
}



















