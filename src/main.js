import { selectDestination } from "./js/destination.mjs";
import { getDestinationPhotos } from "./js/photos.mjs";
import { displayPhotos } from "./js/carousel.mjs";
import { getActivities } from "./js/activities.mjs";
import { displayMap } from "./js/map.mjs";
import { showView, displayDestination } from "./js/ui.mjs";
import {
  getWeather,
  displayWeather
} from "./js/weather.mjs";

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

// --------------------
// CURRENT DESTINATION
// --------------------

let currentTravelType = null;
let currentDestination = null;

// --------------------
// LOAD DESTINATION
// --------------------

async function loadDestination(travelType) {
  try {
    const destination =
      await selectDestination(travelType);

    currentDestination = destination;

    displayDestination(destination, travelType);

    const weather =
      await getWeather(destination);

    displayWeather(weather);

    const activities =
      await getActivities(destination);

    displayMap(destination, activities);

    const photos =
      await getDestinationPhotos(destination);

    displayPhotos(photos);

  } catch (error) {
    console.error("Error loading destination:", error);
  }
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
  loadDestination(currentTravelType);
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
  showView("saved");
});

// --------------------
// FOOTER
// --------------------

document.querySelector("#current-year").textContent =
  new Date().getFullYear();