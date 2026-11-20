/*
    Name: Benjii Costa
    Date: November 12, 2026
    Description: Shared JavaScript for TechTrade. Functions handle shared page
    setup, device searches, recommendation decisions, device-age calculations,
    and dynamically generated recommendation lists.

    AI-assisted suggestion: AI helped refactor the existing script into
    reusable functions, including parameterized list generation, recommendation
    selection, and device-age calculation. Existing TechTrade content and
    behavior were retained. See documentation/costa_ai_documentation.md.
*/


// ------------------------------------------------------------
// Shared page functions
// ------------------------------------------------------------

/*
    initializeSharedPage()
    Purpose: Adds tooltips to sample notes, updates the footer copyright year,
    and records the number of footer navigation links on the main element.
    Parameters: None.
    Returns: Nothing.
*/
function initializeSharedPage() {
    var smallNotes = document.querySelectorAll(".small_note");
    var footerElements = document.getElementsByTagName("footer");
    var pageMain = document.querySelector("main");
    var pageLinks = document.querySelectorAll("footer nav a");

    // Add the same helpful tooltip to each sample note.
    for (var noteIndex = 0; noteIndex < smallNotes.length; noteIndex++) {
        smallNotes[noteIndex].setAttribute(
            "title",
            "Additional information about this TechTrade demonstration."
        );
    }

    // Update the final paragraph in the footer with the current year.
    var currentYear = new Date().getFullYear();
    var copyrightText = "© " + currentYear + " TechTrade. All rights reserved.";

    if (footerElements.length > 0) {
        var copyrightParagraphs = footerElements[0].getElementsByTagName("p");

        if (copyrightParagraphs.length > 1) {
            copyrightParagraphs[copyrightParagraphs.length - 1].textContent =
                copyrightText;
        }
    }

    // Store the number of navigation links as a data attribute.
    if (pageMain && pageLinks.length > 0) {
        pageMain.setAttribute("data-navigation-links", pageLinks.length);
    }
}


/*
    calculateDeviceAge(purchaseDate, currentDate)
    Purpose: Calculates the amount of time a device has been owned.
    Parameters:
        purchaseDate - Date string in YYYY-MM-DD format.
        currentDate - Date object representing today's date.
    Returns: A readable device-age string, or a future-date message.
*/
function calculateDeviceAge(purchaseDate, currentDate) {
    var purchaseTime = new Date(purchaseDate + "T00:00:00");
    var yearsOwned = currentDate.getFullYear() - purchaseTime.getFullYear();
    var monthsOwned = currentDate.getMonth() - purchaseTime.getMonth();

    // Adjust the month count when the current day is earlier in the month.
    if (currentDate.getDate() < purchaseTime.getDate()) {
        monthsOwned--;
    }

    // Convert a negative month count into the previous year.
    if (monthsOwned < 0) {
        yearsOwned--;
        monthsOwned += 12;
    }

    if (yearsOwned < 0) {
        return "Purchase date is in the future";
    }

    return yearsOwned + " years, " + monthsOwned +
        " months (calculated " + currentDate.toLocaleDateString() + ")";
}


/*
    renderList(listElementId, items)
    Purpose: Creates list items and adds them to an existing HTML list.
    Parameters:
        listElementId - ID of the ul or ol element to populate.
        items - Array of strings to display as list items.
    Returns: Nothing.
*/
function renderList(listElementId, items) {
    var targetList = document.getElementById(listElementId);

    if (!targetList) {
        return;
    }

    // Clear existing entries so repeated calls do not duplicate the list.
    targetList.textContent = "";

    for (var itemIndex = 0; itemIndex < items.length; itemIndex++) {
        var listItem = document.createElement("li");
        listItem.textContent = items[itemIndex];
        targetList.appendChild(listItem);
    }
}


/*
    getRecommendationAction(device, condition, defaultAction)
    Purpose: Applies TechTrade's existing decision-tree rules to a device.
    Parameters:
        device - Selected device name.
        condition - User-reported physical condition.
        defaultAction - Device-specific recommendation from the sample data.
    Returns: The recommendation action as a string.
*/
function getRecommendationAction(device, condition, defaultAction) {
    var isWarrantyCase =
        device === "Google Pixel 11" && condition === "Defective";

    var isRepairCandidate =
        device === "Samsung Galaxy Book6 Pro" && condition === "Broken";

    var isUpgradeCandidate =
        device === "Samsung Galaxy S9" ||
        (device === "iPhone 15" && condition === "Poor");

    if (isWarrantyCase) {
        return "Trade-in";
    } else if (isRepairCandidate) {
        return "Repair";
    } else if (isUpgradeCandidate) {
        return "Upgrade";
    }

    // Keep the original device-specific action for all other sample cases.
    return defaultAction;
}


/*
    getRecommendationSteps(action)
    Purpose: Selects next-step guidance based on the recommendation action.
    Parameters:
        action - Recommendation action (Trade-in, Repair, Upgrade, or Sell).
    Returns: An array of suggested next-step strings.
*/
function getRecommendationSteps(action) {
    if (action === "Trade-in") {
        return [
            "Confirm whether the defect is covered by the manufacturer's warranty.",
            "Back up personal data before sending the device for service.",
            "Contact the seller or manufacturer to request warranty assistance."
        ];
    } else if (action === "Repair") {
        return [
            "Request a diagnosis to confirm the cause of the problem.",
            "Compare the repair estimate with the device's replacement cost.",
            "Back up important data before handing over the device."
        ];
    } else if (action === "Upgrade") {
        return [
            "Compare current devices that meet your needs and budget.",
            "Check available trade-in offers for your current device.",
            "Back up and transfer your data before upgrading."
        ];
    }

    return [
        "Review the device's current resale value.",
        "Compare selling privately with available trade-in offers.",
        "Remove personal data before transferring ownership."
    ];
}


// ------------------------------------------------------------
// Guided Search page
// ------------------------------------------------------------

/*
    initializeGuidedSearch()
    Purpose: Preselects a device passed from the text-search page and handles
    submission of the guided-search form.
    Parameters: None.
    Returns: Nothing.
*/
function initializeGuidedSearch() {
    var guidedForm = document.getElementById("guided-search-form");

    if (!guidedForm) {
        return;
    }

    var searchParameters = new URLSearchParams(window.location.search);
    var selectedDevice = searchParameters.get("device");

    if (selectedDevice) {
        var deviceOptions = document.getElementById("device_model").options;

        for (var optionIndex = 0; optionIndex < deviceOptions.length; optionIndex++) {
            if (deviceOptions[optionIndex].value.toLowerCase() ===
                selectedDevice.toLowerCase()) {
                document.getElementById("device_model").selectedIndex = optionIndex;
                break;
            }
        }
    }

    guidedForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var device = document.getElementById("device_model").value;
        var purchaseDate = document.getElementById("date_purchased").value;
        var condition = document.getElementById("physical_condition").value;

        if (device === "Google Pixel 11" && condition !== "Defective") {
            document.getElementById("guided-error").textContent =
                "For this sample case, select Defective to see the warranty replacement recommendation.";
            return;
        }

        window.location.href = "techtrade_recommendation.html?device=" +
            encodeURIComponent(device) +
            "&purchase_date=" + encodeURIComponent(purchaseDate) +
            "&condition=" + encodeURIComponent(condition);
    });
}


// ------------------------------------------------------------
// Recommendation page
// ------------------------------------------------------------

/*
    displayRecommendation()
    Purpose: Reads the selected device details, applies the recommendation
    decision tree, and fills the recommendation page and its guidance lists.
    Parameters: None.
    Returns: Nothing.
*/
function displayRecommendation() {
    if (!document.getElementById("recommendation-results")) {
        return;
    }

    var searchParameters = new URLSearchParams(window.location.search);
    var device = searchParameters.get("device") || "iPhone 15";
    var purchaseDate = searchParameters.get("purchase_date") || "2024-10-11";
    var condition = searchParameters.get("condition") || "Poor";

    // Existing sample device information and recommendation descriptions.
    var deviceData = {
        "iPhone 15": {
            action: "Upgrade",
            msrp: "$799 starting MSRP",
            release: "September 2023",
            support: "Estimated September 2028 using the requested 5-year Apple assumption; verify current support status",
            repair: "About $200-$400 for a major out-of-warranty repair (illustrative estimate)",
            reason: "The device is in poor condition and is approaching the assumed support-life threshold. TechTrade recommends trading it in toward a newer phone rather than spending heavily on repairs."
        },
        "Samsung Galaxy Watch 7": {
            action: "Upgrade",
            msrp: "$299.99 starting MSRP",
            release: "July 2024",
            support: "Estimated July 2031 using the requested 7-year Samsung assumption",
            repair: "About $100-$180 for a common screen or component repair (illustrative estimate)",
            reason: "The watch is used and has been owned for over a year. A trade-in toward a newer wearable may be more worthwhile than investing in repairs as the device ages."
        },
        "MacBook Pro 2021": {
            action: "Sell",
            msrp: "$1,999 starting MSRP for 14-inch; $2,499 for 16-inch",
            release: "October 2021",
            support: "Estimated October 2026 using the requested 5-year Apple assumption; actual support varies by model",
            repair: "About $250-$700 for a major out-of-warranty repair (illustrative estimate)",
            reason: "The MacBook is in excellent condition and remains useful. Selling it while it is still in good shape could help fund a newer MacBook instead of waiting until its resale value declines."
        },
        "Samsung Galaxy S9": {
            action: "Upgrade",
            msrp: "$719.99 starting MSRP",
            release: "March 2018",
            support: "Software support ended in 2022; Samsung's stated support duration varied by product generation",
            repair: "About $150-$300 for a screen or battery-related repair (illustrative estimate)",
            reason: "The Galaxy S9 is beyond its software-support period and is several generations old. Upgrading to a current phone is the safer long-term choice than spending more on this device."
        },
        "Google Pixel 11": {
            action: "Trade-in",
            msrp: "$899 starting MSRP",
            release: "August 2026",
            support: "Google advertises 7 years of updates for the Pixel 11 family; warranty coverage depends on purchase and defect details",
            repair: "Warranty replacement assumed at $0 if the defect is covered; otherwise a repair estimate is required",
            reason: "This sample device is marked defective and was purchased recently. The recommendation is to contact the seller or Google for warranty service or replacement, assuming the defect is covered and the warranty terms apply."
        },
        "Samsung Galaxy Book6 Pro": {
            action: "Repair",
            msrp: "$1,599.99 starting MSRP",
            release: "March 2026 US availability",
            support: "Estimated March 2033 using the requested 7-year Samsung assumption; PC support lifecycle can vary",
            repair: "About $50-$150 for a trackpad repair if it is a simple part/cable issue (illustrative estimate)",
            reason: "The laptop is relatively new and the reported trackpad issue may be a limited repair. Repairing it is likely more economical than replacing the whole computer, especially if the fault is isolated."
        }
    };

    // Use the iPhone 15 sample if an unsupported device is passed in the URL.
    var selectedData = deviceData[device];

    if (!selectedData) {
        device = "iPhone 15";
        selectedData = deviceData[device];
    }

    // Apply the reusable decision-tree function.
    var recommendationAction = getRecommendationAction(
        device,
        condition,
        selectedData.action
    );

    // Display the selected device and recommendation details.
    document.getElementById("recommendation-device").textContent = device;
    document.getElementById("recommendation-action").textContent =
        recommendationAction;
    document.getElementById("result-condition").textContent = condition;
    document.getElementById("result-purchase-date").textContent = purchaseDate;
    document.getElementById("result-age").textContent =
        calculateDeviceAge(purchaseDate, new Date());

    document.getElementById("result-msrp").textContent = selectedData.msrp;
    document.getElementById("result-release").textContent = selectedData.release;
    document.getElementById("result-support").textContent = selectedData.support;
    document.getElementById("result-repair").textContent = selectedData.repair;
    document.getElementById("recommendation-reason").textContent =
        selectedData.reason;

    // Reuse one function to generate both recommendation lists.
    var recommendationConsiderations = [
        "Compare the estimated repair cost with the cost of replacing the device.",
        "Check the device's remaining software-support period.",
        "Review warranty coverage and trade-in eligibility before spending money."
    ];

    renderList("recommendation-considerations", recommendationConsiderations);
    renderList("recommendation-next-steps",
        getRecommendationSteps(recommendationAction));

    // Keep the original introductory message and emphasized site name.
    var recommendationIntro = document.getElementById("recommendation-intro");

    if (recommendationIntro) {
        recommendationIntro.innerHTML =
            "Based on the details provided, <strong>TechTrade</strong> recommends:";
    }
}


// ------------------------------------------------------------
// Home / Text Search page
// ------------------------------------------------------------

/*
    initializeTextSearch()
    Purpose: Validates the text-search input against the six sample devices
    and sends supported devices to the guided-search page.
    Parameters: None.
    Returns: Nothing.
*/
function initializeTextSearch() {
    var quoteForm = document.getElementById("quote-search");

    if (!quoteForm) {
        return;
    }

    quoteForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var device = document.getElementById("device").value.trim().toLowerCase();
        var sampleDevices = [
            "iphone 15",
            "samsung galaxy watch 7",
            "macbook pro 2021",
            "samsung galaxy s9",
            "google pixel 11",
            "samsung galaxy book6 pro"
        ];

        if (sampleDevices.indexOf(device) === -1) {
            document.getElementById("search-error").textContent =
                "Sorry, this demo only supports the six sample devices listed below.";
        } else {
            window.location.href =
                "techtrade_guided_search.html?device=" + encodeURIComponent(device);
        }
    });
}


// ------------------------------------------------------------
// Initialize the functions used by the current page.
// ------------------------------------------------------------

// Basic function call: shared elements are initialized on every TechTrade page.
initializeSharedPage();

// Each page-specific function checks whether its required form or section exists.
initializeTextSearch();
initializeGuidedSearch();
displayRecommendation();
