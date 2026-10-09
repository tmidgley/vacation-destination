const savedKey = "savedDestinations";

export function getSavedDestinations() {
    const saved = localStorage.getItem(savedKey);

    if (saved) {
        return JSON.parse(saved);
    }

    return [];
}

export function saveDestination(destination) {
    const savedDestinations = getSavedDestinations();

    const alreadySaved = savedDestinations.some(
        (saved) => saved.id === destination.id
    );

    if (!alreadySaved) {
        savedDestinations.push(destination);

        localStorage.setItem(
            savedKey,
            JSON.stringify(savedDestinations)
        );
    }
}

export function removeDestination(destinationId) {
    const savedDestinations = getSavedDestinations();

    const updatedDestinations = savedDestinations.filter(
        (destination) => destination.id !== destinationId
    );

    localStorage.setItem(
        savedKey,
        JSON.stringify(updatedDestinations)
    );
}