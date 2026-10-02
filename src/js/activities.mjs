const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

// --------------------
// FORMAT PLACE
// --------------------

function formatPlace(place) {
    return {
        id: place.properties.place_id,
        name: place.properties.name,
        address: place.properties.formatted,
        website: place.properties.website,
        latitude: place.properties.lat,
        longitude: place.properties.lon,
    };
}

// --------------------
// GET NEARBY PLACES
// --------------------

export async function getActivities(destination) {
    const url =
        `https://api.geoapify.com/v2/places` +
        `?categories=national_park,entertainment.zoo,entertainment.aquarium,entertainment.museum,entertainment.theme_park,beach,building.tourism,sport.stadium` +
        `&filter=circle:${destination.longitude},${destination.latitude},32000` +
        `&limit=20` +
        `&apiKey=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to load nearby places.");
    }

    const data = await response.json();

    const places = data.features
        .map(formatPlace)
        .filter((place) => place.name);

    const uniquePlaces = places.filter(
        (place, index, array) =>
            index === array.findIndex(
                (item) => item.name === place.name
            )
    );

    return uniquePlaces;
}