const defaultZoom = 6; // lower = further
let map;
let markers;
let currentMarker = 0;
const startingLatLng = [21.5513258, -79.6017351];

// get data via API
const sheetID = "1H3_TcEnKoa5stq5hyfPMSIIrHToY6DOKJ-RPZHLBfSs";
const tabIndex = "1";
const endpoint = `https://opensheet.elk.sh/${sheetID}/${tabIndex}`;

async function getData() {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }
  return response.json();
}

// initialize map and set up markers
async function initMap(data) {
  map = L.map("map").setView(startingLatLng, defaultZoom);
  // L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //   maxZoom: 19,
  //   attribution:
  //     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  // }).addTo(map);
  L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    },
  ).addTo(map);

  markers = L.markerClusterGroup({
    spiderfyOnMaxZoom: true,
    spiderfyDistanceMultiplier: 1.5, // distance of the "legs" when spiderfied
  });

  data.forEach((row) => {
    const lat = row.Latitude;
    const lng = row.Longitude;

    const marker = L.marker([lat, lng]);

    let vesselName;

    if (row["Name of vessel"] && row["Name of vessel"] !== 0) {
      vesselName = row["Name of vessel"];
    } else {
      vesselName = "name unknown";
    }

    let duration;

    if (
      row["Duration of captives' crossing (in days)"] &&
      row["Duration of captives' crossing (in days)"] !== 0
    ) {
      duration = row["Duration of captives' crossing (in days)"];
    } else {
      duration = "unknown";
    }

    let popupContents = `
            <h3>Vessel: ${vesselName}</h3>
            <p><strong>Year of Arrival:</strong> ${row["Year arrived with captives"]}</p>
            <p><strong>Duration:</strong> ${duration}</p>
            <p><strong>Nature of the resistance:</strong> ${row["Resistance"]}</p>
            <p><strong>Number aboard at departure:</strong> ${row["Total embarked (IMP)"]}</p>
            <p><strong>Number aboard at arrival:</strong> ${row["Total disembarked (IMP)"]}</p>
            <p><strong>Region of capture:</strong> ${row["Imputed Principal region of captive purchase"]}</p>
            <p><strong>Place of capture:</strong> ${row["Imputed principal place of captive purchase"]}</p>
            <p><strong>Voyage outcome:</strong> ${row["Particular outcome"]}</p>
            <p><strong>Trafficking nation:</strong> ${row["Flag of vessel (IMP)"]}</p>
          `;

    marker.bindPopup(popupContents);
    markers.addLayer(marker);
  });

  map.addLayer(markers);
  return markers;
}

function initListeners(loadedMarkers) {
  const fwdBtn = document.getElementById("fwd-btn");
  const backBtn = document.getElementById("back-btn");
  backBtn.classList.add("inactive");

  const markersArray = loadedMarkers.getLayers();

  fwdBtn.addEventListener("click", () => {
    if (currentMarker < markersArray.length - 1) {
      currentMarker++;

      backBtn.classList.remove("inactive");

      const thisMarker = markersArray[currentMarker];
      loadedMarkers.zoomToShowLayer(thisMarker, function () {
        thisMarker.openPopup();
      });

      if (currentMarker === markersArray.length - 1) {
        fwdBtn.classList.add("inactive");
      }
    }
  });

  backBtn.addEventListener("click", () => {
    if (currentMarker > 0) {
      currentMarker--;
      fwdBtn.classList.remove("inactive");

      const thisMarker = markersArray[currentMarker];
      loadedMarkers.zoomToShowLayer(thisMarker, function () {
        thisMarker.openPopup();
      });

      if (currentMarker === 0) {
        backBtn.classList.add("inactive");
      }
    }
  });
}

// run getData() and initMap() functions
async function initPage() {
  try {
    const data = await getData();
    const loadedMarkers = await initMap(data);
    initListeners(loadedMarkers);
  } catch (error) {
    console.error(`Error initializing map: ${error}`);
  }
}

initPage();
