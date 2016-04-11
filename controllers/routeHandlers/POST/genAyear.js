var database = require('../../database');

module.exports = function(req, res){
    
    var generate = database.genActors("year").then(function(value) {

        res.send(value);

    }, function(value) {

        res.send(value);

    });
}