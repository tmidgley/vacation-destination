
import { selectDestination } from "./js/destination.mjs";
import { saveDestination, getSavedDestinations, removeDestination } from "./js/storage.mjs";
import { getDestinationPhotos } from "./js/photos.mjs";
import { displayPhotos } from "./js/carousel.mjs";
import { getActivities } from "./js/activities.mjs";
import { displayMap, clearMap } from "./js/map.mjs";
import { showView, displayDestination } from "./js/ui.mjs";
import { getWeather, displayWeather } from "./js/weather.mjs";

// --------------------
// PAGE ELEMENTS
// --------------------

const travelTypeButtons =
  document.querySelectorAll("[data-travel-type]");

const chooseAnotherButton =
  document.querySelector("#choose-another");

const startOverButton =
  document.querySelector("#start-over");

const homeLink =
  document.querySelector("#home-link");

const savedNav =
  document.querySelector("#saved-nav");

const saveDestinationButton =
  document.querySelector("#save-destination");

const savedContainer =
  document.querySelector("#saved-destinations");

const emptyMessage =
  document.querySelector("#saved-empty-message");

// --------------------
// CURRENT DESTINATION
// --------------------

let currentTravelType = null;
let currentDestination = null;

// --------------------
// SAVE BUTTON
// --------------------

function updateSaveButton() {
  if (!currentDestination) return;

  const savedDestinations = getSavedDestinations();

  const alreadySaved = savedDestinations.some(
    (destination) => destination.id === currentDestination.id
  );

  if (alreadySaved) {
    saveDestinationButton.textContent = "Saved!";
    saveDestinationButton.disabled = true;
  } else {
    saveDestinationButton.textContent = "Save Destination";
    saveDestinationButton.disabled = false;
  }
}

// --------------------
// LOAD DESTINATION DETAILS
// --------------------

async function loadDestinationDetails(destination, travelType) {
  currentDestination = destination;
  currentTravelType = travelType;

  updateSaveButton();
  displayDestination(destination, travelType);

  // Clear previous destination content
  clearMap();

  document.querySelector("#weather-display").textContent =
    "Loading weather...";

  document.querySelector("#nearby-map").textContent =
    "Loading nearby attractions...";

  displayPhotos([]);

  document.querySelector("#photo-display").textContent =
    "Loading destination photos...";

  // Weather
  try {
    const weather = await getWeather(destination);
    displayWeather(weather);
  } catch (error) {
    console.error("Weather error:", error);

    document.querySelector("#weather-display").textContent =
      "Weather is currently unavailable.";
  }

  // Nearby Attractions
  try {
    const activities = await getActivities(destination);

    document.querySelector("#nearby-map").textContent = "";

    displayMap(destination, activities);
  } catch (error) {
    console.error("Nearby attractions error:", error);

    clearMap();

    document.querySelector("#nearby-map").textContent =
      "Nearby attractions are currently unavailable.";
  }

  // Photos
  try {
    const photos = await getDestinationPhotos(destination);
    displayPhotos(photos);
  } catch (error) {
    console.error("Photo error:", error);
    displayPhotos([]);
  }
}

// --------------------
// SELECT RANDOM DESTINATION
// --------------------

async function loadDestination(travelType) {
  try {
    const destination = await selectDestination(travelType);

    if (destination) {
      await loadDestinationDetails(destination, travelType);
    }
  } catch (error) {
    console.error("Error selecting destination:", error);
  }
}

// --------------------
// SAVED DESTINATIONS
// --------------------

function displaySavedDestinations() {
  const savedDestinations = getSavedDestinations();

  savedContainer.innerHTML = "";

  if (savedDestinations.length === 0) {
    emptyMessage.hidden = false;
    return;
  }

  emptyMessage.hidden = true;

  savedDestinations.forEach((destination) => {
    const listItem = document.createElement("p");
    listItem.classList.add("saved-item");

    // Destination link
    const link = document.createElement("a");
    link.href = "#";
    link.textContent =
      `${destination.name}, ${destination.state}`;

    link.addEventListener("click", (event) => {
      event.preventDefault();
      loadSavedDestination(destination);
    });

    // Remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", () => {
      removeDestination(destination.id);
      displaySavedDestinations();
    });

    listItem.appendChild(link);
    listItem.appendChild(removeButton);

    savedContainer.appendChild(listItem);
  });
}

// --------------------
// LOAD SAVED DESTINATION
// --------------------

async function loadSavedDestination(destination) {
  await loadDestinationDetails(
    destination,
    destination.travelType
  );
}

// --------------------
// TRAVEL TYPE BUTTONS
// --------------------

travelTypeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentTravelType = button.dataset.travelType;
    loadDestination(currentTravelType);
  });
});

// --------------------
// OTHER BUTTONS
// --------------------

chooseAnotherButton.addEventListener("click", () => {
  if (currentTravelType) {
    loadDestination(currentTravelType);
  }
});

startOverButton.addEventListener("click", () => {
  currentTravelType = null;
  currentDestination = null;

  showView("main");
});

homeLink.addEventListener("click", (event) => {
  event.preventDefault();

  currentTravelType = null;
  currentDestination = null;

  showView("main");
});

savedNav.addEventListener("click", () => {
  displaySavedDestinations();
  showView("saved");
});

saveDestinationButton.addEventListener("click", () => {
  if (currentDestination) {
    saveDestination(currentDestination);
    updateSaveButton();
  }
});

// --------------------
// FOOTER
// --------------------

document.querySelector("#current-year").textContent =
  new Date().getFullYear();
