$(document).ready(function(){

   // Initialize Firebase
    var config = {
    apiKey: "AIzaSyCtWTcMSn00qvfirVZnbxMMJODSwdHIvVU",
    authDomain: "eventsnearyou-de966.firebaseapp.com",
    databaseURL: "https://eventsnearyou-de966.firebaseio.com",
    projectId: "eventsnearyou-de966",
    storageBucket: "eventsnearyou-de966.appspot.com",
    messagingSenderId: "995102584028"
    };
    firebase.initializeApp(config);
	
    var database = firebase.database();
    var eventDB = database.ref();

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
          var url = ("<a href>" + events[i].url + "</a>");
          tRow.append(
            $("<td>").text(events[i].name.text),  
            $("<td>").html(url),
            $("<td>").text(events[i].start.local),
            $("<td>").text(events[i].end.local),
            // If you want more fields, add them here. Don't forget to
            // update the index.html file to add the additional table
            // headers.
          );

          $("#eventTable").append(tRow);
        }

        eventDB.push({
          event,
          address,
          distance,
        })
        
        // Clear the form so the user can search again.
        $("#event").val("");
        $("#address").val("");
        $("#distance").val("");

      })

    });

});

var map;
    var directionsManager;
    function GetMap()
    {
        map = new Microsoft.Maps.Map('#myMap', {});
        //Load the directions module.
        Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
            //Create an instance of the directions manager.
            directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
            //Specify where to display the route instructions.
            directionsManager.setRenderOptions({ itineraryContainer: '#directionsItinerary' });
            //Specify the where to display the input panel
            directionsManager.showInputPanel('directionsPanel');
        });
    }

