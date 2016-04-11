//POST Request for the server as soon as the server loads for all releases
$.post('/genReleases').done(function(rows) {
    //If no releases, append something else instead.
    if (!rows)
        {
            $(".construct").append("<div class = 'decon'><p>Nobody here but us trees...</p></div>");
        }

        //gets current medium name
        var currMName = "";

        //Cycles through all rows given from server
        for (var i = 0; i < rows.length; i++)
        {
            //Gets current medium and date stamp in row i
            var loopMName = rows[i].mname;
            var loopDate = rows[i].dateStamp.substring(0, rows[i].dateStamp.indexOf("T", 0));
            
            //If both are different, change currMName to new medium and display the new Medium
            if (currMName != loopMName) {
                currMName = loopMName;
                $(".construct").append("<em class = 'decon'>" + currMName + "<br></em>");
            }

            //Display the releases
            $(".construct").append("<p class = 'decon movie'>" + rows[i].title + " (" + rows[i].rating + ") ["+ loopDate +"] </p>");
            
        }

});