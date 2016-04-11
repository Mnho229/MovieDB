var express = require("express"); //Node.js framework
var router = express.Router(); //allows the use of the router function
var bodyParser = require("body-parser"); //allows reading what POST request sends to server
var urlencodedParser = bodyParser.urlencoded({ extended: false }); //supports url encoded data
//
// GET REQUESTS
//
router.get('/', require('./routeHandlers/index.js'));
router.get('/actors', require('./routeHandlers/actors.js'));
router.get('/releases', require('./routeHandlers/releases.js'));
router.get('/movies', require('./routeHandlers/movies.js'));
router.get('/amd', require('./routeHandlers/amd.js'));
//
// POST REQUESTS
//
//Runs whichever file is requested from the url sent out from the client.
router.post('/genAyear', require('./routeHandlers/POST/genAyear'));
router.post('/genAgenre', require('./routeHandlers/POST/genAgenre'));
router.post('/genArating', require('./routeHandlers/POST/genArating'));
router.post('/genMyear', require('./routeHandlers/POST/genMyear'));
router.post('/genMgenre', require('./routeHandlers/POST/genMgenre'));
router.post('/genMrating', require('./routeHandlers/POST/genMrating'));
router.post('/grabMovieActors', urlencodedParser, require('./routeHandlers/POST/grabMovieActors'));
router.post('/genReleases', require('./routeHandlers/POST/genReleases'));

router.post('/addActor', urlencodedParser, require('./routeHandlers/POST/addActor'));
router.post('/updateActor', urlencodedParser, require('./routeHandlers/POST/updateActor'));
router.post('/addMovie', urlencodedParser, require('./routeHandlers/POST/addMovie'));
router.post('/updateMovie', urlencodedParser, require('./routeHandlers/POST/updateMovie'));
router.post('/addRole', urlencodedParser, require('./routeHandlers/POST/addRole'));
router.post('/updateRole', urlencodedParser, require('./routeHandlers/POST/updateRole'));
router.post('/addGenre', urlencodedParser, require('./routeHandlers/POST/addGenre'));
router.post('/updateGenre', urlencodedParser, require('./routeHandlers/POST/updateGenre'));
router.post('/add-deleteRelease', urlencodedParser, require('./routeHandlers/POST/add-deleteRelease'));
router.post('/updateRelease', urlencodedParser, require('./routeHandlers/POST/updateRelease'));

// Allow app.js to see this file
module.exports = router;