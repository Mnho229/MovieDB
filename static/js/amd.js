//
//
// ACTOR
//
//
// Click Handler for Actors submit button
$("#auActor").click(function() {
    //Gets the 'mode' from whichever radio button is checked
    var mode = $(".actor input[type='radio'][name='actorSelect']:checked").val();

    //Grabs values from textboxes
    var fname = $("input[name='fname']").val();
    var lname = $("input[name='lname']").val();
    var yob = $("input[name='yob']").val();
    var gender = $("input[name='gender']").val();

    //if the checkbox is on Add
    if (mode == "Add")
    {
        //Send a POST request to the server with data from the form (Uses Promise syntax)
        $.ajax({
            type: "POST",
            url: "/addActor",
            data: {fname: fname, lname: lname, yob: yob, gender: gender}
        })
        .done(function(value) {
            //Server returns a value and the client-side code displays it
            $("#serverResponseActor").text(value);
            $("#serverResponseActor").append("!");
        });
    }
    else
    {
        //If checkbox is on update, then use the extra textboxes
        var actorattr = $("input[name='actor-attribute']").val();
        var replace = $("input[name='actor-update']").val();

        $.ajax({
            type: "POST",
            url: "/updateActor",
            data: {fname: fname, lname: lname, actorattr: actorattr, replace: replace}
        })
        .done(function(value) {
            $("#serverResponseActor").text(value);
            $("#serverResponseActor").append("!");
        });
    }
});

//
//
// MOVIE
//
//

//Click handler for movies submit button
$("#auMovie").click(function() {

    var mode = $(".movie input[type='radio'][name='movieSelect']:checked").val();

    var title = $("input[name='title']").val();
    var year = $("input[name='yearM']").val();
    var Gname = $("input[name='nameM']").val();
    var rating = $("input[name='rating']").val();

    if (mode == "Add")
    {
        $.ajax({
            type: "POST",
            url: "/addMovie",
            data: {title: title, year: year, Gname: Gname, rating: rating}
        })
        .done(function(value) {
            $("#serverResponseMovie").text(value);
            $("#serverResponseMovie").append("!");
        });
    }
    else
    {
        var movieattr = $("input[name='movie-attribute']").val();
        var replace = $("input[name='movie-update']").val();

        $.ajax({
            type: "POST",
            url: "/updateMovie",
            data: {title: title, year: year, movieattr: movieattr, replace: replace}
        })
        .done(function(value) {
            $("#serverResponseMovie").text(value);
            $("#serverResponseMovie").append("!");
        });
    }
});

//
//
// ROLE
//
//

//Click handler for Roles submit button
$("#auRole").click(function() {

    var mode = $(".role input[type='radio'][name='roleSelect']:checked").val();

    var fname = $("input[name='fnameR']").val();
    var lname = $("input[name='lnameR']").val();
    var title = $("input[name='titleR']").val();
    var year = $("input[name='yearR']").val();
    var role = $("input[name='role']").val();

    if (mode == "Add")
    {
        $.ajax({
            type: "POST",
            url: "/addRole",
            data: {fname: fname, lname: lname, title: title, year: year, role: role}
        })
        .done(function(value) {
            $("#serverResponseRole").text(value);
            $("#serverResponseRole").append("!");
        });
    }
    else
    {
        var roleattr = $("input[name='role-attribute']").val();
        var newyear = $("input[name='role-new-year']").val();
        var replace = $("input[name='role-update']").val();

        $.ajax({
            type: "POST",
            url: "/updateRole",
            data: {fname: fname, lname: lname, title: title, year: year, role: role, roleattr: roleattr, replace: replace, newyear: newyear}
        })
        .done(function(value) {
            $("#serverResponseRole").text(value);
            $("#serverResponseRole").append("!");
        });
    }
});

//
//
// GENRE
//
//

//Click handler for Genres submit button
$("#auGenre").click(function() {

    var mode = $(".genre input[type='radio'][name='genreSelect']:checked").val();

    var Gname = $("input[name='genre']").val();
    

    if (mode == "Add")
    {
        $.ajax({
            type: "POST",
            url: "/addGenre",
            data: {Gname: Gname}
        })
        .done(function(value) {
            $("#serverResponseGenre").text(value);
            $("#serverResponseGenre").append("!");
        });
    }
    else
    {
        var replace = $("input[name='genre-update']").val();

        $.ajax({
            type: "POST",
            url: "/updateGenre",
            data: {Gname: Gname, replace: replace}
        })
        .done(function(value) {
            $("#serverResponseGenre").text(value);
            $("#serverResponseGenre").append("!");
        });
    }
});

//
//
// RELEASES
//
//

//Click handler for Releases submit button
$("#auRelease").click(function() {

    var mode = $(".release input[type='radio'][name='releaseSelect']:checked").val();

    var title = $("input[name='titleRe']").val();
    var yearFR = $("input[name='yearRe']").val();
    var medium = $("input[name='mediumRe']").val();
    var date = $("input[name='dateRe']").val();

    if (mode == "Add" || mode == "Delete")
    {
        $.ajax({
            type: "POST",
            url: "/add-deleteRelease",
            data: {title: title, yearFR: yearFR, medium: medium, date: date, mode: mode}
        })
        .done(function(value) {
            $("#serverResponseRelease").text(value);
            $("#serverResponseRelease").append("!");
        });
    }
    else
    {
        var releaseattr = $("input[name='release-attribute']").val();
        var newyearFR = $("input[name='new-release-year']").val();
        var replace = $("input[name='release-update']").val();

        $.ajax({
            type: "POST",
            url: "/updateRelease",
            data: {title: title, yearFR: yearFR, medium: medium, date: date, releaseattr: releaseattr, replace: replace, newyearFR: newyearFR}
        })
        .done(function(value) {
            $("#serverResponseRelease").text(value);
            $("#serverResponseRelease").append("!");
        });
    }
});












