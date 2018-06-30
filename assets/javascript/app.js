$(document).ready(function(){

  $("#searchEvents").click(function(event){ 

      event.preventDefault();

      var event = $("#event").val(); 
      var address = $("#address").val(); 
      var distance = $("#distance").val();

      var token = "JQ3JH254MIWDMTVGA3ZK";

      var queryURL = "https://www.eventbriteapi.com/v3/events/search/?"
                   + "expand=venue"
                   + "&location.within=" + distance 
                   + "&location.address=" + address
                   + "&sort_by=distance" 
                   + "&categories=103"
                   + "&q=" + event
                   + "&token=" + token;

      // Fire off the request to event brite.
      $.ajax({
        url: queryURL,
        method: "GET",
      }).done(function(response) {
        // Okay, we have the results. We only care
        // about the events. Events is a list within the response
        var events  = response.events;
        

        // Now we want to iterate through each event. We do this with the
        // for loop below. Look at the event object for all of the possible
        // pieces of data to pull out. For now, we're only extracting
        // name, url, start and end times.
        for (var i = 0; i < 3; i++) {
          var tRow = $("<tr>");
          tRow.append(
            $("<td>").text(events[i].name.text),  
            $("<td>").text(events[i].url),
            $("<td>").text(events[i].start.local),
            $("<td>").text(events[i].end.local),
            // If you want more fields, add them here. Don't forget to
            // update the index.html file to add the additional table
            // headers.
          );
          $("#URL").click(function(){
            window.location = $(this).attr('href');
            return false;
          });

          $("#eventTable").append(tRow);
        }

        // Clear the form so the user can search again.
        $("#event").val("");
        $("#address").val("");

      })

    });

});

