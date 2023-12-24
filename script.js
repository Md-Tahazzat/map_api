import locations from "./locationData";

// all global variables
let markers;
let filteredLocations;
let selectedLocationCategories = [];

//  set initial location to view in center
const map = L.map("map").setView([40.71613741556797, -74.03440786775582], 17);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// default two locations icons
const COMPANY_LOGO = L.icon({
  iconUrl: "./images/101_hudson.png",
  iconSize: [50, 40],
  iconAnchor: [25, 20],
});
const FOOD_TRACK = L.icon({
  iconUrl: "./images/food_track.png",
  iconSize: [70, 50],
  iconAnchor: [15, 25 / 2],
});

// Default markers with custom icons
const COMPANY_MARKER = L.marker([40.71613741556797, -74.03440786775582], {
  icon: COMPANY_LOGO,
})
  .addTo(map)
  .bindPopup("101 Hudson");
const FOOD_TRUCK_MARKER = L.marker([40.71848908452659, -74.03286984798459], {
  icon: FOOD_TRACK,
})
  .addTo(map)
  .bindPopup("Food Trucks");

// show food truck popup;
const showFoodTruck = () => {
  FOOD_TRUCK_MARKER.openPopup();
  map.setView([40.71848908452659, -74.03286984798459], 17);
};

//  filter location based on filter key
const getFilteredLocation = () => {
  if (selectedLocationCategories.length < 1) {
    return locations;
  } else {
    let tempFilteredLocations = [];
    selectedLocationCategories.forEach((category) => {
      const matchedLocations = locations.filter(
        (location) => location.category === category
      );
      tempFilteredLocations = [...tempFilteredLocations, ...matchedLocations];
    });
    return tempFilteredLocations;
  }
};

const loadMap = async () => {
  // Clear previous markers
  if (markers) {
    markers.forEach((marker) => {
      map.removeLayer(marker);
    });
  }

  filteredLocations = await getFilteredLocation();
  markers = await generateMarkers(filteredLocations);
  // await calculateAveragePosition(markers);
};

// generate markers for the location
const generateMarkers = (filteredLocations) => {
  const tempMarkers = [];
  filteredLocations.forEach((location, index) => {
    // Create circle marker and set different colors.
    const marker = L.circleMarker([location.lat, location.lng], {
      radius: 10,
      fillColor: location.category_color,
      color: "white",
      weight: 3,
      opacity: 1,
      fillOpacity: 0.8,
    }).addTo(map);
    marker.bindPopup("<strong>" + location.name + "</strong>");
    marker.locationId = location._id;

    tempMarkers.push(marker);
  });
  return tempMarkers;
};

// calculate average points of all markers to center the location
const calculateAveragePosition = (markers = []) => {
  var latSum = 0;
  var lngSum = 0;

  markers.forEach((marker) => {
    latSum += marker.getLatLng().lat;
    lngSum += marker.getLatLng().lng;
  });

  var avgLat = latSum / markers.length;
  var avgLng = lngSum / markers.length;

  // Set the map center to the average position
  map.setView([avgLat, avgLng], 17);
};

const activateMarker = (_id) => {
  markers.forEach((marker) => {
    if (marker.locationId === _id) {
      const activeLocation = filteredLocations.find(
        (location) => location._id === _id
      );
      marker.openPopup();
      map.setView([activeLocation.lat, activeLocation.lng], 17);
    } else {
      marker.closePopup();
    }
  });
};

const toggleMenu = async (menuId, plusIconId, minusIconId) => {
  const menu = document.getElementById(menuId);
  const plusIcon = document.getElementById(plusIconId);
  const minusIcon = document.getElementById(minusIconId);

  // hide/show the plus/minus icon
  if (plusIcon.classList.contains("hidden")) {
    plusIcon.classList.remove("hidden");
    minusIcon.classList.add("hidden");
  } else {
    plusIcon.classList.add("hidden");
    minusIcon.classList.remove("hidden");
  }

  // hide/show menu and update the map according to the menuId
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    selectedLocationCategories.push(menuId);
    await loadMap();
  } else {
    menu.classList.add("hidden");
    selectedLocationCategories = selectedLocationCategories.filter(
      (category) => category !== menuId
    );
    await loadMap();
  }
};

// all ul which will contain location name;
const accommodationsUl = document.getElementById("accommodations");
const diningAndNightlifeUl = document.getElementById("dining-and-nightlife");
const parksUl = document.getElementById("parks");

const insertLocationNames = (locations) => {
  locations.forEach((location, index) => {
    const li = document.createElement("li");
    li.innerText = location.name;
    li.addEventListener("mouseover", () => activateMarker(location._id));

    if (location.category === "accommodations") {
      accommodationsUl.appendChild(li);
    } else if (location.category === "dining-and-nightlife") {
      diningAndNightlifeUl.appendChild(li);
    } else if (location.category === "parks") {
      parksUl.appendChild(li);
    }
  });
};

const loadInitialData = async () => {
  await insertLocationNames(locations);
  loadMap();
};

//  load all map on document load
document.addEventListener("DOMContentLoaded", loadInitialData);
