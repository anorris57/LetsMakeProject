$(document).ready(function () {

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

  $("#searchEvents").click(function (event) {

    event.preventDefault();

    var event = $("#event").val();
    var address = $("#address").val();
    var distance = $("#distance").val();

    //clears table for new search
    $("#eventTable tbody > tr").remove();

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
    }).done(function (response) {
      // Okay, we have the results. We only care
      // about the events. Events is a list within the response
      console.log(response);
      var events = response.events;
      var pagination = response.pagination;

      // Now we want to iterate through each event. We do this with the
      // for loop below. Look at the event object for all of the possible
      // pieces of data to pull out. For now, we're only extracting
      // name, url, start and end times.
      for (var i = 0; i < 3; i++) {
       if (pagination.object_count > 0) {
        $("#no-results").hide();
          var tRow = $("<tr>");
          var startTime = events[i].start.local;
          var endTime = events[i].end.local;
 
          //CONVERT TIME OF EVENT TO PROPER FORMAT
          var StartConverted = moment(startTime).format('YYYY-MM-DD HH:mm');
          var EndConverted = moment(endTime).format('YYYY-MM-DD HH:mm');
         var address = events[i].venue.address.address_1;
         if( address === null) {
           address = '';
         }
         var zip = events[i].venue.address.postal_code;
         if( zip === null) {
          zip = '';
        }
        var city = events[i].venue.address.city;
        if (city === null) {
          zip = "";
        }
        var region = events[i].venue.address.region;
        if (region === null) {
          region = "";
        }

          tRow.append(
            $("<td>").text(events[i].name.text),
            $("<td>").html("<a href=" + events[i].url + ">Link</a>"),
            $("<td>").text(address),           
            $("<td>").text(city),
            $("<td>").text(region),
            $("<td>").text(zip),
            $("<td>").text(StartConverted),
            $("<td>").text(EndConverted),
         )

        }
         else {
          $("#no-results").show().text("*No Results Found");
          }
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
function GetMap() {
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

