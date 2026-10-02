const destinationsUrl =
    new URL("../data/destinations.json", import.meta.url);

// Keep track of destinations already shown.
const usedDestinations = {
    family: new Set(),
    retired: new Set(),
    budget: new Set(),
    solo: new Set(),
    couples: new Set(),
    surprise: new Set(),
};

// Remember the last destination shown.
const lastDestinations = {
    family: null,
    retired: null,
    budget: null,
    solo: null,
    couples: null,
    surprise: null,
};

// --------------------
// GET DESTINATIONS
// --------------------

export async function getDestinations() {
    const response = await fetch(destinationsUrl);

    if (!response.ok) {
        throw new Error("Unable to load destination data.");
    }

    return response.json();
}

// --------------------
// FILTER DESTINATIONS
// --------------------

export function filterDestinationsByType(
    destinations,
    travelType
) {
    if (travelType === "surprise") {
        return destinations;
    }

    return destinations.filter(
        (destination) =>
            destination.travelType === travelType
    );
}

// --------------------
// GET RANDOM DESTINATION
// --------------------

export function getRandomDestination(
    destinations,
    travelType
) {
    if (destinations.length === 0) {
        return null;
    }

    const used = usedDestinations[travelType];
    const lastDestination = lastDestinations[travelType];

    // Only use destinations that have not been shown.
    let availableDestinations = destinations.filter(
        (destination) => !used.has(destination.id)
    );

    // Start over after every destination has been shown.
    if (availableDestinations.length === 0) {
        used.clear();

        availableDestinations = destinations.filter(
            (destination) =>
                destination.id !== lastDestination
        );
    }

    const randomIndex = Math.floor(
        Math.random() * availableDestinations.length
    );

    const selectedDestination =
        availableDestinations[randomIndex];

    used.add(selectedDestination.id);

    lastDestinations[travelType] =
        selectedDestination.id;

    return selectedDestination;
}

// --------------------
// SELECT DESTINATION
// --------------------

export async function selectDestination(travelType) {
    const destinations = await getDestinations();

    const matchingDestinations =
        filterDestinationsByType(
            destinations,
            travelType
        );

    return getRandomDestination(
        matchingDestinations,
        travelType
    );
}