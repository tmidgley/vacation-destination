// --------------------
// PAGE ELEMENTS
// --------------------

const mainView =
    document.querySelector("#main-view");

const selectorView =
    document.querySelector("#selector-view");

const savedView =
    document.querySelector("#saved-view");

const selectedTravelType =
    document.querySelector("#selected-travel-type");

const destinationName =
    document.querySelector("#destination-name");

const destinationDescription =
    document.querySelector("#destination-description");

const costLevel =
    document.querySelector("#cost-level");

// --------------------
// SHOW VIEW
// --------------------

export function showView(viewName) {
    mainView.hidden = viewName !== "main";
    selectorView.hidden = viewName !== "selector";
    savedView.hidden = viewName !== "saved";
}

// --------------------
// TRAVEL TYPE LABEL
// --------------------

function getTravelTypeLabel(travelType) {
    const labels = {
        family: "Family Friendly",
        retired: "Retired Traveler",
        budget: "Low Budget",
        solo: "Solo Traveler",
        couples: "Couples",
        surprise: "Surprise Me!",
    };

    return labels[travelType] || "";
}

// --------------------
// COST RANGE
// --------------------

function getCostRange(level) {
    const costRanges = {
        "$": "Up to $1,000",
        "$$": "Up to $2,500",
        "$$$": "Up to $5,000",
        "$$$$": "$10,000+",
    };

    return costRanges[level] || "Cost unavailable";
}

// --------------------
// DISPLAY DESTINATION
// --------------------

export function displayDestination(destination, travelType) {
    selectedTravelType.textContent =
        getTravelTypeLabel(travelType);

    destinationName.textContent =
        `${destination.name}, ${destination.state}`;

    destinationDescription.textContent =
        destination.description;

    costLevel.innerHTML = `
    <span class="cost-scale">
        ${destination.costLevel}
    </span>

    <span class="cost-range">
        ${getCostRange(destination.costLevel)}
    </span>

    <span class="cost-note">
        *Estimated cost based on a 7-day trip for two.
    </span>
`;

    showView("selector");
}