const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

let map;

export function displayMap(destination, places) {
    const mapContainer = document.querySelector("#nearby-map");

    // Remove the old map before creating a new one
    if (map) {
        map.remove();
    }

    // Create the map
    map = new maplibregl.Map({
        container: mapContainer,
        style: `https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${apiKey}`,
        center: [destination.longitude, destination.latitude],
        zoom: 10,
    });

    // Add destination marker
    new maplibregl.Marker({ color: "#f4b942" })
        .setLngLat([
            destination.longitude,
            destination.latitude
        ])
        .setPopup(
            new maplibregl.Popup().setHTML(
                `<strong>${destination.name}, ${destination.state}</strong>`
            )
        )
        .addTo(map);

    // Add nearby place markers
    places.forEach((place) => {
        new maplibregl.Marker({ color: "#0b3954" })
            .setLngLat([
                place.longitude,
                place.latitude
            ])
            .setPopup(
                new maplibregl.Popup().setHTML(`
                    <strong>${place.name}</strong>
                    <p>${place.address || "Address unavailable"}</p>
                    ${place.website
                        ? `<a href="${place.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>`
                        : ""
                    }
                `)
            )
            .addTo(map);
    });
}