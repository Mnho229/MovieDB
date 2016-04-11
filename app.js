// Module Dependencies

var express = require("express");
var router = require("./controllers/router.js");

// Setup Middleware

var app = express();
app.use('/static', express.static(__dirname + '/static'));

// Routes (Allows GET and POST requests)

app.use('/', router);

// Default Template Engine to 'Jade' and Set Default Views Folder

app.set('views', './views');
app.set('view engine', 'jade');

// Start Server
var server = app.listen(9029, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Web App listening at http://penstemon.cs.engr.uky.edu:%s', port);
});
