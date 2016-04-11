var database = require('../../database');

module.exports = function(req, res){
    
    var generate = database.genMovies("year").then(function(value) {

        res.send(value);

    }, function(value) {

        console.log(value);

    });
}