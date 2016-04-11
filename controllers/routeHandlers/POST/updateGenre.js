var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var database = require('../../database');

module.exports = function(req, res){
    
    var generate = database.grabGenreGID(req.body.Gname).then(function(gid) {
        
        database.updateGenre(req.body.replace, gid).then(function(value) {
            res.send(value);
        }, function(value) {
            res.send(value);
        });

    }, function(gid) {

        res.send(gid);

    });
}