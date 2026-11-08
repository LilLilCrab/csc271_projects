/*
    Name: Benjii Costa
    Date: November 8, 2026
    Description: Shared JavaScript for TechTrade pages, including the
    recommendation decision tree, dynamic lists, and NodeList manipulation.
    AI-assisted suggestion: AI helped organize the decision-tree conditions,
    dynamic list generation, and NodeList loop. See documentation/costa_ai_documentation.md.
*/

// Required DOM selection methods; these target existing page elements.
var pageTitle = document.getElementById("recommendation-device");
var smallNotes = document.querySelectorAll(".small_note");
var footerElements = document.getElementsByTagName("footer");
var pageMain = document.querySelector("main");
var pageLinks = document.querySelectorAll("footer nav a");

// Assignment 9: Loop through the NodeList of sample-note paragraphs.
// The length check prevents the loop from running when a page has no matching notes.
// The title provides a brief tooltip when a visitor hovers over each note.
if (smallNotes.length > 0) {
    for (var noteIndex = 0; noteIndex < smallNotes.length; noteIndex++) {
        smallNotes[noteIndex].setAttribute(
            "title",
            "Additional information about this TechTrade demonstration."
        );
    }
}


// Use string and numeric data, arithmetic, and textContent to update the footer.
var siteName = "TechTrade";
var currentYear = new Date().getFullYear();
var copyrightText = "© " + currentYear + " " + siteName + ". All rights reserved.";
if (footerElements.length > 0) {
    var copyrightParagraphs = footerElements[0].getElementsByTagName("p");
    if (copyrightParagraphs.length > 1) {
        copyrightParagraphs[copyrightParagraphs.length - 1].textContent = copyrightText;
    }
}
if (pageMain && pageLinks.length > 0) {
    pageMain.setAttribute("data-navigation-links", pageLinks.length);
}

// Guided Search page
if (document.getElementById("guided-search-form")) {
var search_parameters = new URLSearchParams(window.location.search);
        var selected_device = search_parameters.get("device");

        if (selected_device) {
            var device_options = document.getElementById("device_model").options;

            for (var i = 0; i < device_options.length; i++) {
                if (device_options[i].value.toLowerCase() === selected_device.toLowerCase()) {
                    document.getElementById("device_model").selectedIndex = i;
                }
            }
        }

        document.getElementById("guided-search-form").addEventListener("submit", function(event) {
            event.preventDefault();

            var device = document.getElementById("device_model").value;
            var purchase_date = document.getElementById("date_purchased").value;
            var condition = document.getElementById("physical_condition").value;

            if (device === "Google Pixel 11" && condition !== "Defective") {
                document.getElementById("guided-error").textContent =
                    "For this sample case, select Defective to see the warranty replacement recommendation.";
                return;
            }

            window.location.href = "techtrade_recommendation.html?device=" +
                encodeURIComponent(device) +
                "&purchase_date=" + encodeURIComponent(purchase_date) +
                "&condition=" + encodeURIComponent(condition);
        });
}

// Recommendation page
if (document.getElementById("recommendation-results")) {
var search_parameters = new URLSearchParams(window.location.search);
        var device = search_parameters.get("device") || "iPhone 15";
        var purchase_date = search_parameters.get("purchase_date") || "2024-10-11";
        var condition = search_parameters.get("condition") || "Poor";

        var device_data = {
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

        var selected_data = device_data[device];

        if (!selected_data) {
            device = "iPhone 15";
            selected_data = device_data[device];
        }


        // Assignment 9: TechTrade recommendation decision tree.
        // Each named variable evaluates to a Boolean (true or false).
        var isWarrantyCase =
            device === "Google Pixel 11" && condition === "Defective";

        var isRepairCandidate =
            device === "Samsung Galaxy Book6 Pro" && condition === "Broken";

        var isUpgradeCandidate =
            device === "Samsung Galaxy S9" ||
            (device === "iPhone 15" && condition === "Poor");

        // Follow the decision tree in order. The final else preserves the
        // existing device-specific recommendation for all other sample cases.
        var recommendationAction;

        if (isWarrantyCase) {
            recommendationAction = "Trade-in";
        } else if (isRepairCandidate) {
            recommendationAction = "Repair";
        } else if (isUpgradeCandidate) {
            recommendationAction = "Upgrade";
        } else {
            recommendationAction = selected_data.action;
        }

        // Use the decision-tree result throughout the recommendation page.
        selected_data.action = recommendationAction;

        document.getElementById("recommendation-device").textContent = device;
        document.getElementById("recommendation-action").textContent = selected_data.action;
        document.getElementById("result-condition").textContent = condition;
        document.getElementById("result-purchase-date").textContent = purchase_date;

        var purchase_time = new Date(purchase_date + "T00:00:00");
        var current_time = new Date();
        var years_owned = current_time.getFullYear() - purchase_time.getFullYear();
        var months_owned = current_time.getMonth() - purchase_time.getMonth();

        if (current_time.getDate() < purchase_time.getDate()) {
            months_owned = months_owned - 1;
        }

        if (months_owned < 0) {
            years_owned = years_owned - 1;
            months_owned = months_owned + 12;
        }

        if (years_owned < 0) {
            document.getElementById("result-age").textContent = "Purchase date is in the future";
        } else {
            document.getElementById("result-age").textContent =
                years_owned + " years, " + months_owned + " months (calculated " +
                current_time.toLocaleDateString() + ")";
        }

        document.getElementById("result-msrp").textContent = selected_data.msrp;
        document.getElementById("result-release").textContent = selected_data.release;
        document.getElementById("result-support").textContent = selected_data.support;
        document.getElementById("result-repair").textContent = selected_data.repair;
        document.getElementById("recommendation-reason").textContent = selected_data.reason;

    // Assignment 9: Use a for loop to create recommendation considerations.
    // A for loop is useful here because the array has a known number of items.
    var recommendationConsiderations = [
        "Compare the estimated repair cost with the cost of replacing the device.",
        "Check the device's remaining software-support period.",
        "Review warranty coverage and trade-in eligibility before spending money."
    ];

    var considerationsList = document.getElementById("recommendation-considerations");

    if (considerationsList) {
        for (var considerationIndex = 0;
             considerationIndex < recommendationConsiderations.length;
             considerationIndex++) {
            var considerationItem = document.createElement("li");
            considerationItem.textContent =
                recommendationConsiderations[considerationIndex];
            considerationsList.appendChild(considerationItem);
        }
    }

    // Choose next steps based on the decision-tree outcome.
    var recommendationSteps;

    if (recommendationAction === "Trade-in") {
        recommendationSteps = [
            "Confirm whether the defect is covered by the manufacturer's warranty.",
            "Back up personal data before sending the device for service.",
            "Contact the seller or manufacturer to request warranty assistance."
        ];
    } else if (recommendationAction === "Repair") {
        recommendationSteps = [
            "Request a diagnosis to confirm the cause of the problem.",
            "Compare the repair estimate with the device's replacement cost.",
            "Back up important data before handing over the device."
        ];
    } else if (recommendationAction === "Upgrade") {
        recommendationSteps = [
            "Compare current devices that meet your needs and budget.",
            "Check available trade-in offers for your current device.",
            "Back up and transfer your data before upgrading."
        ];
    } else {
        recommendationSteps = [
            "Review the device's current resale value.",
            "Compare selling privately with available trade-in offers.",
            "Remove personal data before transferring ownership."
        ];
    }

    // Assignment 9: Use a while loop to add each suggested next step.
    // A while loop works well because the list is processed until its index
    // reaches the number of steps in the selected recommendation array.
    var stepIndex = 0;
    var nextStepsList = document.getElementById("recommendation-next-steps");

    if (nextStepsList) {
        while (stepIndex < recommendationSteps.length) {
            var stepItem = document.createElement("li");
            stepItem.textContent = recommendationSteps[stepIndex];
            nextStepsList.appendChild(stepItem);
            stepIndex++;
        }
    }

    // Update visible text and HTML markup using a stored string variable.
    var recommendationIntro = document.getElementById("recommendation-intro");
    var introLabel = "TechTrade recommends:";
    if (recommendationIntro) {
        recommendationIntro.innerHTML = "Based on the details provided, <strong>" + siteName + "</strong> recommends:";
    }
}

// Home / Text Search page
if (document.getElementById("quote-search")) {
document.getElementById("quote-search").addEventListener("submit", function(event) {
            event.preventDefault();

            var device = document.getElementById("device").value.trim().toLowerCase();
            var sample_devices = [
                "iphone 15",
                "samsung galaxy watch 7",
                "macbook pro 2021",
                "samsung galaxy s9",
                "google pixel 11",
                "samsung galaxy book6 pro"
            ];

            if (sample_devices.indexOf(device) === -1) {
                document.getElementById("search-error").textContent =
                    "Sorry, this demo only supports the six sample devices listed below.";
            } else {
                window.location.href = "techtrade_guided_search.html?device=" + encodeURIComponent(device);
            }
        });
}
