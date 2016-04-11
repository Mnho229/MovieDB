var mysql = require('mysql2'); //Another node mysql module that has support for prepared statements
var RSVP = require('rsvp'); //Allows use of Promise syntax

//Makes connection with the mysql database
var connection = mysql.createConnection({
    host : '*',
    user : '*',
    password : '*',
    database : '*'
});

//Every function within this object is readable by other files that has the database.js file required
module.exports = {
    //connection.escape kills any attempt at SQL injection.  connection.escapeID does the same thing but for column names

    //Generates actors used in the actor report, including those that are not 'starring' in a movie
    genActors: function(attribute) {
        //Allows asynchronous code to be utilized in callbacks and therefore having the right data used
        return new RSVP.Promise(function(resolve, reject) {

            //Prepared Statement
            
            connection.execute('SELECT * FROM people LEFT JOIN roles ON people.pid = roles.pid LEFT JOIN movies ON roles.mid = movies.mid LEFT JOIN genre ON movies.genre = genre.gid ORDER BY lname ASC, ' + connection.escapeId(attribute) + ' DESC', function(err, rows) {

                if (err) {throw err;}
                //if there are no rows
                if (!rows.length)
                {
                    //send what the query 'returned'
                    reject(rows);
                }
                else
                {
                    //send the rows that were returned via a callback
                    resolve(rows);
                }
            });
        });
    },

    //Grabs movies used in the movie report
    genMovies: function(attribute) {

        return new RSVP.Promise(function(resolve, reject) {
            //if the attribute is the genre name 
            if (attribute == "name") {
                //Prepared Statement
                connection.execute('SELECT * FROM movies JOIN genre WHERE movies.genre = genre.gid ORDER BY ' + connection.escapeId(attribute) + ' ASC, movies.mid DESC', function(err, rows) {

                    if (err) {throw err;}
                    if (!rows.length)
                    {
                        reject(rows);
                    }
                    else
                    {
                        resolve(rows);
                    }
                });
            }
            else {
                connection.execute('SELECT * FROM movies JOIN genre WHERE movies.genre = genre.gid ORDER BY ' + connection.escapeId(attribute) + ' DESC, movies.mid DESC', function(err, rows) {

                    if (err) {throw err;}
                    if (!rows.length)
                    {
                        reject(rows);
                    }
                    else
                    {
                        resolve(rows);
                    }
                });
            }
        });
    },

    //Grabs actors that have roles in a particular movie in the Movie Reports page
    genMovieActors: function(attribute) {
        return new RSVP.Promise(function(resolve, reject) {
            connection.execute('SELECT fname, lname FROM people JOIN roles WHERE people.pid = roles.pid AND mid = ' + connection.escape(attribute), function(err, rows) {

                if (err) {throw err;}
                if (!rows.length)
                {
                    reject(rows);
                }
                else
                {
                    resolve(rows);
                }
            });
        });
    },

    //Grabs releases for the releases report
    genReleases: function() {
        return new RSVP.Promise(function(resolve, reject) {
            connection.execute('SELECT * FROM movies JOIN released JOIN medium WHERE movies.mid = released.mid AND released.xid = medium.xid ORDER BY mname, dateStamp DESC', function(err, rows) {
                if (err) {throw err;}
                if (!rows.length)
                {
                    reject(rows);
                }
                else
                {
                    resolve(rows);
                }
            });
        });
    },

    //Adds the actor to the database
    addActor: function(fname, lname, yob, gender) {
        return new RSVP.Promise(function(resolve, reject) {
            connection.execute('INSERT INTO people(fname, lname, yob, gender) VALUES (' + connection.escape(fname) + ", " + connection.escape(lname) + ", " + connection.escape(yob) + ", " + connection.escape(gender) + ");", function(err) {
                if (err)
                {
                    reject("Failure");
                }
                else
                {
                    resolve("Success");
                }
            });
        });
    },

    //Gets the pid from the actor queried
    grabActorPID: function(fname, lname) {
        return new RSVP.Promise(function(resolve, reject) {
            connection.execute("SELECT pid FROM people WHERE fname = " + connection.escape(fname) + " AND lname = " + connection.escape(lname), function(err, rows) {
                if (err || !rows.length)
                {
                    reject("Failure");
                    console.log(err);
                }
                else
                {
                    resolve(rows[0].pid);
                }
            });
        });
    },

    //Updates the actor one attribute at a time
    updateActor: function(actorattr, replace, pid) {

        return new RSVP.Promise(function(resolve, reject) {
            connection.execute('UPDATE people SET ' + connection.escapeId(actorattr) + " = " + connection.escape(replace) + " WHERE pid = " + connection.escape(pid), function(err) {
                if (err)
                {
                    reject("Failure");
                    
                }
                else
                {
                    resolve("Success");
                }
            });
        });
    },

    //Adds a movie to the database
    addMovie: function(title, year, gid, rating) {
        return new RSVP.Promise(function(resolve, reject) {
            connection.execute('INSERT INTO movies(title, year, genre, rating) VALUES (' + connection.escape(title) + ", " + connection.escape(year) + ", " + connection.escape(gid) + ", " + connection.escape(rating) + ");", function(err) {
                if (err)
                {
                    reject("Failure");
                }
                else
                {
                    resolve("Success");
                }
            });
        });
    },

    grabGenreGID: function(gname) {
        return new RSVP.Promise(function(resolve, reject) {
            connection.execute("SELECT gid FROM genre WHERE name = " + connection.escape(gname), function(err, rows) {
                if (err || !rows.length)
                {
                    reject("Failure");
                    
                }
                else
                {
                    resolve(rows[0].gid);
                }
            });
        });
    },

    grabMovieMID: function(title, year) {
        return new RSVP.Promise(function(resolve, reject) {
            connection.execute("SELECT mid FROM movies WHERE title = " + connection.escape(title) + " AND year = " + connection.escape(year), function(err, rows) {
                if (err || !rows.length)
                {
                    reject("Failure");
                    console.log(err);
                }
                else
                {
                    resolve(rows[0].mid);
                }
            });
        });
    },

    updateMovie: function(movieattr, replace, mid) {

        return new RSVP.Promise(function(resolve, reject) {
            connection.execute('UPDATE movies SET ' + connection.escapeId(movieattr) + " = " + connection.escape(replace) + " WHERE mid = " + connection.escape(mid), function(err) {
                if (err)
                {
                    reject("Failure");
                    console.log(err);
                }
                else
                {
                    resolve("Success");
                }
            });
        });
    },

    addRole: function(mid, pid, role) {
        return new RSVP.Promise(function(resolve, reject) {
            connection.execute('INSERT INTO roles(mid, pid, role) VALUES (' + connection.escape(mid) + ", " + connection.escape(pid) + ", " + connection.escape(role) + ");", function(err) {
                if (err)
                {
                    reject("Failure");
                    console.log(error);
                }
                else
                {
                    resolve("Success");
                }
            });
        });
    },

    updateRole: function(roleattr, replace, tid) {

        return new RSVP.Promise(function(resolve, reject) {
            connection.execute('UPDATE roles SET ' + connection.escapeId(roleattr) + " = " + connection.escape(replace) + " WHERE tid = " + connection.escape(tid), function(err) {
                if (err)
                {
                    reject("Failure");
                    console.log(err);
                }
                else
                {
                    resolve("Success");
                }
            });
        });
    },

    grabRoleTID: function(fname, lname, title, year, role) {
        return new RSVP.Promise(function(resolve, reject) {
            connection.execute("SELECT tid FROM people JOIN roles JOIN movies WHERE people.pid = roles.pid AND roles.mid = movies.mid AND fname = " + connection.escape(fname) + " AND lname = " + connection.escape(lname) + " AND title = " + connection.escape(title) + " AND year = " + connection.escape(year) + " AND role = " + connection.escape(role), function(err, rows) {
                if (err || !rows.length)
                {
                    reject("Failure");
                    console.log(err);
                }
                else
                {
                    resolve(rows[0].tid);
                }
            });
        });
    },

    addGenre: function(gname) {
        return new RSVP.Promise(function(resolve, reject) {
            connection.execute("INSERT INTO genre(name) VALUES (" + connection.escape(gname) + ")", function(err) {
                if (err)
                {
                    reject("Failure");
                    console.log(err);
                }
                else
                {
                    resolve("Success!");
                }
            });
        });
    },

    updateGenre: function(gname, gid) {
        return new RSVP.Promise(function(resolve, reject) {
            connection.execute("UPDATE genre SET name = " + connection.escape(gname) + " WHERE gid = " + connection.escape(gid), function(err) {
                if (err)
                {
                    reject("Failure");
                }
                else
                {
                    resolve("Success!");
                }
            });
        });
    },

    grabMediumXID: function(mname) {
        return new RSVP.Promise(function(resolve, reject) {
            connection.execute("SELECT xid FROM medium WHERE mname = " + connection.escape(mname), function(err, rows) {
                if (err || !rows.length)
                {
                    reject("Failure");
                    console.log(err);
                }
                else
                {
                    resolve(rows[0].xid);
                }
            });
        });
    },

    addRelease: function(mid,xid,date) {

        return new RSVP.Promise(function(resolve, reject) {
            connection.execute("INSERT INTO released(mid, xid, dateStamp) VALUES (" + connection.escape(mid) + ", " + connection.escape(xid) + ", " + connection.escape(date) + ");", function(err) {
                if (err)
                {
                    reject("Failure");
                    console.log(err);
                }
                else
                {
                    resolve("Success!");
                }
            });
        });
    },

    deleteRelease: function(mid,xid,date) {
        return new RSVP.Promise(function(resolve, reject) {
            connection.execute("DELETE FROM released WHERE mid = " + connection.escape(mid) + " AND xid = " + connection.escape(xid) + " AND dateStamp = " + connection.escape(date), function(err) {
                if (err)
                {
                    reject("Failure");
                    console.log(err);
                }
                else
                {
                    resolve("Success!");
                }
            });
        });
    },

    grabReleaseRID: function(title, yearFR, mname, dateStamp) {

        return new RSVP.Promise(function(resolve, reject) {

            connection.execute("SELECT rid FROM movies JOIN released JOIN medium WHERE movies.mid = released.mid AND released.xid = medium.xid AND title = " + connection.escape(title) + " AND year = " + connection.escape(yearFR) + " AND mname = " + connection.escape(mname) + " AND dateStamp = " + connection.escape(dateStamp), function(err, rows) {
                if (err || !rows.length)
                {
                    reject("Failure");
                    console.log(err);
                }
                else
                {
                    resolve(rows[0].rid);
                }
            });
        });
    },

    updateRelease: function(releaseattr, replace, rid) {

        return new RSVP.Promise(function(resolve, reject) {
            connection.execute('UPDATE released SET ' + connection.escapeId(releaseattr) + " = " + connection.escape(replace) + " WHERE rid = " + connection.escape(rid), function(err) {
                if (err)
                {
                    reject("Failure");
                    console.log(err);
                }
                else
                {
                    resolve("Success");
                }
            });
        });
    }
}




