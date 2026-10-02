// --------------------
// CAROUSEL ELEMENTS
// --------------------

const photoDisplay =
    document.querySelector("#photo-display");

const photoIndicators =
    document.querySelector("#photo-indicators");

const previousPhotoButton =
    document.querySelector("#previous-photo");

const nextPhotoButton =
    document.querySelector("#next-photo");

const previousPhotoImage =
    document.querySelector("#previous-photo-image");

const nextPhotoImage =
    document.querySelector("#next-photo-image");

// --------------------
// CAROUSEL STATE
// --------------------

let currentPhotos = [];
let currentPhotoIndex = 0;
let carouselInterval;

// --------------------
// SHOW CURRENT PHOTO
// --------------------

function showCurrentPhoto() {
    const photo = currentPhotos[currentPhotoIndex];

    if (!photo) {
        return;
    }

    photoDisplay.innerHTML = `
        <figure class="photo-card">
            <img
                src="${photo.imageUrl}"
                alt="${photo.alt}"
            >

            <figcaption>
                Photo by
                <a
                    href="${photo.photographerUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ${photo.photographer}
                </a>
                on
                <a
                    href="${photo.photoUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Unsplash
                </a>
            </figcaption>
        </figure>
    `;

    showPhotoPreviews();
    showPhotoIndicator();
}

// --------------------
// SHOW SIDE PHOTOS
// --------------------

function showPhotoPreviews() {
    let previousIndex = currentPhotoIndex - 1;
    let nextIndex = currentPhotoIndex + 1;

    if (previousIndex < 0) {
        previousIndex = currentPhotos.length - 1;
    }

    if (nextIndex >= currentPhotos.length) {
        nextIndex = 0;
    }

    const previousPhoto = currentPhotos[previousIndex];
    const nextPhoto = currentPhotos[nextIndex];

    previousPhotoImage.src = previousPhoto.imageUrl;
    previousPhotoImage.alt = `Previous: ${previousPhoto.alt}`;

    nextPhotoImage.src = nextPhoto.imageUrl;
    nextPhotoImage.alt = `Next: ${nextPhoto.alt}`;
}

// --------------------
// SHOW PHOTO NUMBER
// --------------------

function showPhotoIndicator() {
    photoIndicators.textContent =
        `${currentPhotoIndex + 1} / ${currentPhotos.length}`;
}

// --------------------
// NEXT PHOTO
// --------------------

function showNextPhoto() {
    currentPhotoIndex++;

    if (currentPhotoIndex >= currentPhotos.length) {
        currentPhotoIndex = 0;
    }

    showCurrentPhoto();
}

// --------------------
// PREVIOUS PHOTO
// --------------------

function showPreviousPhoto() {
    currentPhotoIndex--;

    if (currentPhotoIndex < 0) {
        currentPhotoIndex = currentPhotos.length - 1;
    }

    showCurrentPhoto();
}

// --------------------
// AUTO PLAY
// --------------------

function startCarousel() {
    clearInterval(carouselInterval);

    carouselInterval = setInterval(() => {
        showNextPhoto();
    }, 5000);
}

// --------------------
// LOAD PHOTOS
// --------------------

export function displayPhotos(photos) {
    currentPhotos = photos;
    currentPhotoIndex = 0;

    if (currentPhotos.length === 0) {
        photoDisplay.innerHTML =
            "<p>No destination photos are available.</p>";

        previousPhotoButton.hidden = true;
        nextPhotoButton.hidden = true;
        photoIndicators.textContent = "";

        return;
    }

    previousPhotoButton.hidden = false;
    nextPhotoButton.hidden = false;

    showCurrentPhoto();
    startCarousel();
}

// --------------------
// BUTTON EVENTS
// --------------------

nextPhotoButton.addEventListener("click", () => {
    showNextPhoto();
    startCarousel();
});

previousPhotoButton.addEventListener("click", () => {
    showPreviousPhoto();
    startCarousel();
});