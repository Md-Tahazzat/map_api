const locations = [
  // parks location data starts
  {
    _id: 101,
    name: "J Qwen Grundy Park",
    lat: 40.716215617085275,
    lng: -74.03186490356093,
    category: "parks",
    category_color: "#008000",
    label: "J Qwen Grundy Park",
  },
  {
    _id: 102,
    name: "Morris Canal Park",
    category: "parks",
    lat: 40.71173290039563,
    lng: -74.03753604842554,
    category_color: "#008000",
    label: "Morris Canal Park",
  },
  {
    _id: 103,
    name: "Van Vorst Park",
    category: "parks",
    lat: 40.7179983579722,
    lng: -74.04708692133474,
    category_color: "#008000",
    label: "Van Vorst Park",
  },
  {
    _id: 104,
    name: "Hamilton Park",
    lat: 40.72767273113687,
    lng: -74.04511745399869,
    category: "parks",
    category_color: "#008000",
    label: "Hamilton Park",
  },
  {
    _id: 105,
    name: "Liberty State Park",
    lat: 40.707429290313904,
    lng: -74.03698600940237,
    category: "parks",
    category_color: "#008000",
    label: "Liberty State Park",
  },

  //   accommodation location data starts
  {
    _id: 106,
    name: "Hyatt House",
    lat: 40.715864541361064,
    lng: -74.0339934559735,
    category: "accommodations",
    category_color: "#ff0000",
    label: "Hyatt House",
  },
  {
    _id: 107,
    name: "Hyatt Regency",
    lat: 40.717117631333906,
    lng: -74.03253490815871,
    category: "accommodations",
    category_color: "#ff0000",
    label: "Hyatt Regency",
  },
  {
    _id: 108,
    name: "Residence Inn by Marriott",
    lat: 40.719066656208206,
    lng: -74.04103776679464,
    category: "accommodations",
    category_color: "#ff0000",
    label: "Residence Inn by Marriott",
  },
  {
    _id: 109,
    name: "Canopy by Hilton",
    lat: 40.71985193388284,
    lng: -74.04085211953928,
    category: "accommodations",
    category_color: "#ff0000",
    label: "Canopy by Hilton",
  },
  {
    _id: 110,
    name: "Sonesta Simply Suites",
    lat: 40.72097520139997,
    lng: -74.03445154099268,
    category: "accommodations",
    category_color: "#ff0000",
    label: "Sonesta Simply Suites",
  },
  {
    _id: 111,
    name: "Double Tree by Hilton",
    lat: 40.72360238946284,
    lng: -74.03677404456624,
    category: "accommodations",
    category_color: "#ff0000",
    label: "Double Tree by Hilton",
  },
  {
    _id: 112,
    name: "The Westin",
    lat: 40.72493796062562,
    lng: -74.03625241510632,
    category: "accommodations",
    category_color: "#ff0000",
    label: "The Westin",
  },
  {
    _id: 113,
    name: "Courtyard by Marriott",
    lat: 40.727700209475685,
    lng: -74.0340819400546,
    category: "accommodations",
    category_color: "#ff0000",
    label: "Courtyard by Marriott",
  },

  // dining & nightlife
  {
    _id: 114,
    name: "Iron Monkey",
    lat: 40.71602603305889,
    lng: -74.03602757445039,
    category: "dining-and-nightlife",
    category_color: "#be2fe5",
    label: "Iron Monkey",
  },

  {
    _id: 115,
    name: "The Golden Cicada",
    lat: 40.715737120625995,
    lng: -74.04257864829006,
    category: "dining-and-nightlife",
    category_color: "#be2fe5",
    label: "The Golden Cicada",
  },
  {
    _id: 116,
    name: "District Lounge",
    lat: 40.7190653229922,
    lng: -74.0333908467319,
    category: "dining-and-nightlife",
    category_color: "#be2fe5",
    label: "District Lounge",
  },
  {
    _id: 117,
    name: "The Junto: Attic Bar",
    lat: 40.718859536621686,
    lng: -74.04537983359707,
    category: "dining-and-nightlife",
    category_color: "#be2fe5",
    label: "The Junto: Attic Bar",
  },
  {
    _id: 118,
    name: "Under The Boot",
    lat: 40.7200328858694,
    lng: -74.04263574491726,
    category: "dining-and-nightlife",
    category_color: "#be2fe5",
    label: "Under The Boot",
  },
  {
    _id: 119,
    name: "Grove Corner Bar",
    lat: 40.72008878957965,
    lng: -74.04268804799588,
    category: "dining-and-nightlife",
    category_color: "#be2fe5",
    label: "Grove Corner Bar",
  },
  {
    _id: 120,
    name: "Six26 - Lounge and Rooftop",
    lat: 40.72019913450404,
    lng: -74.04430835100744,
    category: "dining-and-nightlife",
    category_color: "#be2fe5",
    label: "Six26 - Lounge and Rooftop",
  },
  {
    _id: 121,
    name: "Don't tell liv",
    lat: 40.7204974412184,
    lng: -74.04353210852203,
    category: "dining-and-nightlife",
    category_color: "#be2fe5",
    label: "Don't tell liv",
  },
  {
    _id: 122,
    name: "Lucky 7 Tavern",
    lat: 40.72294806815159,
    lng: -74.04740879569046,
    category: "dining-and-nightlife",
    category_color: "#be2fe5",
    label: "Lucky 7 Tavern",
  },
];
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
