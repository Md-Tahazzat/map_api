document.addEventListener("DOMContentLoaded", function () {
  var map = L.map("map").setView([23.820633, 90.437219], 18);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  var locations = [
    {
      lat: 23.820633,
      lng: 90.437219,
      label: "Probal Valley",
      name: "Probal Valley",
    },
    { lat: 23.82097, lng: 90.436927, label: "Road No 4", name: "Road NO 4" },
    {
      lat: 23.820422,
      lng: 90.436182,
      label: "The Food Hall Bashundhara",
      name: "The Food Hall Bashundhara",
    },
    {
      lat: 23.821274,
      lng: 90.437832,
      label: "Arabika Coffee",
      name: "Arabika Coffee",
    },
    // Add more locations as needed
  ];

  var markers = [];
  var locationsList = document.getElementById("locations-list");

  locations.forEach(function (location, index) {
    // Create a CircleMarker
    var marker = L.circleMarker([location.lat, location.lng], {
      radius: 8, // Adjust the radius as needed
      fillColor: "red", // Adjust the fill color
      color: "white", // Adjust the border color
      weight: 2, // Adjust the border weight
      opacity: 1,
      fillOpacity: 0.8,
    }).addTo(map);

    markers.push(marker);

    var listItem = document.createElement("li");
    listItem.textContent = location.name;
    listItem.addEventListener("mouseover", function () {
      activateMarker(index);
    });

    locationsList.appendChild(listItem);
  });

  // Calculate the average position of all markers
  var latSum = 0;
  var lngSum = 0;

  markers.forEach(function (marker) {
    latSum += marker.getLatLng().lat;
    lngSum += marker.getLatLng().lng;
  });

  var avgLat = latSum / markers.length;
  var avgLng = lngSum / markers.length;

  // Set the map center to the average position
  map.setView([avgLat, avgLng], 18);

  function activateMarker(index) {
    markers.forEach(function (marker, i) {
      if (i === index) {
        marker
          .bindPopup("<strong>" + locations[i].label + "</strong>")
          .openPopup();
      } else {
        marker.closePopup();
      }
    });

    // Highlight the corresponding list item
    var listItems = document
      .getElementById("locations-list")
      .getElementsByTagName("li");
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].classList.remove("active");
    }
    listItems[index].classList.add("active");
  }
});
