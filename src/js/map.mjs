export function displayMap(destination, places) {
    const mapContainer = document.querySelector("#nearby-map");

    // Clear the previous destination's attractions
    clearMap();

    // Show a message if no attractions were found
    if (places.length === 0) {
        mapContainer.textContent = "No nearby attractions were found.";
        return;
    }

    // Create a list of nearby attractions
    const placesList = document.createElement("ul");
    placesList.classList.add("attractions-list");

    places.forEach((place) => {
        const item = document.createElement("li");
        const link = document.createElement("a");

        const search = `${place.name}, ${destination.name}, ${destination.state}`;

        link.href = place.website ||
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(search)}`;

        link.textContent = place.name;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        item.appendChild(link);
        placesList.appendChild(item);
    });

    mapContainer.appendChild(placesList);
}

export function clearMap() {
    const mapContainer = document.querySelector("#nearby-map");
    mapContainer.replaceChildren();
}