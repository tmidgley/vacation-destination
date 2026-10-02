const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// --------------------
// SEARCH PHOTOS
// --------------------

async function searchPhotos(query) {
    const url =
        `https://api.unsplash.com/search/photos` +
        `?query=${encodeURIComponent(query)}` +
        `&per_page=20` +
        `&orientation=landscape`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Client-ID ${accessKey}`,
        },
    });

    if (!response.ok) {
        throw new Error("Unable to load destination photos.");
    }

    const data = await response.json();

    return data.results;
}

// --------------------
// FORMAT PHOTO
// --------------------

function formatPhoto(photo, destination) {
    return {
        id: photo.id,
        imageUrl: photo.urls.regular,
        alt: photo.alt_description ||
            `${destination.name}, ${destination.state}`,
        photographer: photo.user.name,
        photographerUrl: photo.user.links.html,
        photoUrl: photo.links.html,
    };
}

// --------------------
// GET DESTINATION PHOTOS
// --------------------

export async function getDestinationPhotos(destination) {
    if (!accessKey) {
        throw new Error("Unsplash API key is missing.");
    }

    const query =
        `${destination.name} ${destination.state}`;

    const results =
        await searchPhotos(query);

    return results.map((photo) =>
        formatPhoto(photo, destination)
    );
}