//
//
// ACTORS
//
//

//(See commented function in releases.js to get an idea of what reporting function does)

//Click handler for the year attribute
$("#actorYear").click(function() {
    deconstruct();
    $.post('/genAyear').done(function(rows) {
        if (!rows)
        {
            $(".construct").append("<div class = 'decon'><p>Nobody here but us trees...</p></div>");
        }

        var currActor = "";
        var currYear = "";
        var actorChanged = false;

        for (var i = 0; i < rows.length; i++)
        {
            var loopName = rows[i].lname + ", " + rows[i].fname;
            var loopYear = rows[i].year;
            if (currActor != loopName) {
                currActor = loopName;
                $(".construct").append("<b class = 'decon'>" + currActor + "<br></b>")
                actorChanged = true;
            }
            if (currYear != loopYear || actorChanged == true) {
                currYear = loopYear;
                $(".construct").append("<em class = 'decon'>" + currYear + "</em>")
                actorChanged = false;
            }

            $(".construct").append("<p class = 'decon'>" + rows[i].title + " (" + rows[i].rating + ") [" + rows[i].name + "] |" + rows[i].role + "|</p>");

        }
    });
});

//Click Handler for the genre attribute
$("#actorGenre").click(function() {
    deconstruct();
    $.post('/genAgenre').done(function(rows) {
        if (!rows)
        {
            $(".construct").append("<div class = 'decon'><p>Nobody here but us trees...</p></div>");
        }

        var currActor = "";
        var currGenre = "";
        var actorChanged = false;

        for (var i = 0; i < rows.length; i++)
        {
            var loopName = rows[i].lname + ", " + rows[i].fname;
            var loopGenre = rows[i].name;
            if (currActor != loopName) {
                currActor = loopName;
                $(".construct").append("<b class = 'decon'>" + currActor + "<br></b>")
                actorChanged = true;

            }
            if (currGenre != loopGenre || actorChanged == true) {
                currGenre = loopGenre;
                $(".construct").append("<em class = 'decon'>" + currGenre + "</em>")
                actorChanged = false;
            }

            $(".construct").append("<p class = 'decon'>" + rows[i].title + " (" + rows[i].rating + ") [" + rows[i].name + "] |" + rows[i].role + "|</p>");

        }
    });
});

// CLick handler for the Rating attribute
$("#actorRating").click(function() {
    deconstruct();
    $.post('/genArating').done(function(rows) {
        if (!rows)
        {
            $(".construct").append("<div class = 'decon'><p>Nobody here but us trees...</p></div>");
        }

        var currActor = "";
        var currRating = "";
        var actorChanged = false;

        for (var i = 0; i < rows.length; i++)
        {
            var loopName = rows[i].lname + ", " + rows[i].fname;
            var loopRating = rows[i].rating;
            if (currActor != loopName) {
                currActor = loopName;
                $(".construct").append("<b class = 'decon'>" + currActor + "<br></b>")
                actorChanged = true;
            }
            if (currRating != loopRating || actorChanged == true) {
                currRating = loopRating;
                $(".construct").append("<em class = 'decon'>" + currRating + "</em>")
                actorChanged = false;
            }

            $(".construct").append("<p class = 'decon'>" + rows[i].title + " (" + rows[i].rating + ") [" + rows[i].name + "] |" + rows[i].role + "|</p>");

        }
    });
});

//
//
// MOVIES
//
//
$("#movieYear").click(function() {
    deconstruct();
    $.post('/genMyear').done(function(rows) {
        if (!rows)
        {
            $(".construct").append("<div class = 'decon'><p>Nobody here but us trees...</p></div>");
        }

        var currYear = "";

        for (var i = 0; i < rows.length; i++)
        {
            var loopYear = rows[i].year;
            
            if (currYear != loopYear) {
                currYear = loopYear;
                $(".construct").append("<em class = 'decon'>" + currYear + "<br></em>");
            }

            $(".construct").append("<p class = 'decon movie"+i+"'>" + rows[i].title + " (" + rows[i].rating + ") [" + rows[i].name + "] </p>");
            grabActors(rows[i].mid, i);
        }
    });
});

$("#movieGenre").click(function() {
    deconstruct();
    $.post('/genMgenre').done(function(rows) {
        if (!rows)
        {
            $(".construct").append("<div class = 'decon'><p>Nobody here but us trees...</p></div>");
        }

        var currGenre = "";

        for (var i = 0; i < rows.length; i++)
        {
            var loopGenre = rows[i].name;
            
            if (currGenre != loopGenre) {
                currGenre = loopGenre;
                $(".construct").append("<em class = 'decon'>" + currGenre + "<br></em>");
            }

            $(".construct").append("<p class = 'decon movie"+i+"'>" + rows[i].title + " (" + rows[i].rating + ") [" + rows[i].name + "] </p>");
            grabActors(rows[i].mid, i);
        }
    });
});

$("#movieRating").click(function() {
    deconstruct();
    $.post('/genMrating').done(function(rows) {
        if (!rows)
        {
            $(".construct").append("<div class = 'decon'><p>Nobody here but us trees...</p></div>");
        }

        var currRating = "";

        for (var i = 0; i < rows.length; i++)
        {
            var loopRating = rows[i].rating;
            
            if (currRating != loopRating) {
                currRating = loopRating;
                $(".construct").append("<em class = 'decon'>" + currRating + "<br></em>");
            }

            $(".construct").append("<p class = 'decon movie"+i+"'>" + rows[i].title + " (" + rows[i].rating + ") [" + rows[i].name + "] </p>");
            grabActors(rows[i].mid, i);
        }
    });
});
//
//
// UTILITY
//
//

// Removes all elements with the class 'decon'
var deconstruct = function()
{
    $(".decon").remove();
};

//For movies, grabs all the actors with roles in each movie and displays them
var grabActors = function(mid, currIndex)
{
    $.ajax({
            type: "POST",
            url: "/grabMovieActors",
            data: {content: mid}
    })
    .done(function(rows) {
        if (!rows.length)
        {
            $(".movie"+currIndex).append("[No actors so far]");
        }
        else
        {
            var notFirstActor = false;
            for (var i = 0; i < rows.length; i++) {
                var loopName = rows[i].fname + " " + rows[i].lname;

                if (!notFirstActor) {
                    $(".movie"+currIndex).append("[" + loopName);
                    notFirstActor = true;
                    continue;
                }
                $(".movie"+currIndex).append(", " + loopName);
            }

            $(".movie"+currIndex).append("]");
        }
    });
};

//Makes the current displayed form in amd.jade invisible and the clicked form visible by removing and adding the 'hidden' class
$('.footSelect').click(function() {
    $(".dataInput:not(.hidden)").addClass("hidden");
    switch (this.id) {
        case "footActor":
            $(".actor").removeClass("hidden");
            break;
        case "footRole":
            $(".role").removeClass("hidden");
            break;
        case "footMovie":
            $(".movie").removeClass("hidden");
            break;
        case "footGenre":
            $(".genre").removeClass("hidden");
            break;
        case "footRelease":
            $(".release").removeClass("hidden");
            break;
    }

});





















