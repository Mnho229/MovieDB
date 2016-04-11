var database = require('../../database');

module.exports = function(req, res){
    
    var generate = database.genActors("name").then(function(value) {

        res.send(value);

    }, function(value) {

        console.log(value);

    });
}