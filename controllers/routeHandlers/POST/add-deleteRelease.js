var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var database = require('../../database'); //file that has all the queries stored in it

//Allows any file to read if required
module.exports = function(req, res){
    //calls a function queries the database
    var generate = database.grabMediumXID(req.body.medium).then(function(xid) {
        //if previous query was successful, get the mid
        database.grabMovieMID(req.body.title, req.body.yearFR).then(function(mid) {

            //checks if release is being added or deleted
            if (req.body.mode == "Add") {
                //sends query to add a release if mid and xid were grabbed successfully
                database.addRelease(mid, xid, req.body.date).then(function(value) {
                    //if adding was successful, send back whatever the promise sends back to the client
                    res.send(value);
                }, function(value) {
                    // if adding was not successful
                    res.send(value);
                });
            }
            else {
                database.deleteRelease(mid, xid, req.body.date).then(function(value) {
                    res.send(value);
                }, function(value) {
                    res.send(value);
                });
            }

        }, function(mid) {
            //if grabbing mid is not successful
            res.send(mid);
        });

    }, function(xid) {
        //if grabbing xid was not successful
        res.send(xid);

    });
}