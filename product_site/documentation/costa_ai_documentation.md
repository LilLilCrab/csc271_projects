# TechTrade – Assignment 9 AI Documentation

**Student:** Benjii Costa  
**Course assignment:** Assignment 9 – Decisions & Loops  
**Date:** November 8, 2026

## AI assistance used

ChatGPT was used as an AI-assisted coding and documentation aid for Assignment 9.

### JavaScript decision tree
AI assistance helped organize three Boolean conditions for the TechTrade recommendation process:
- A defective Google Pixel 11 warranty scenario.
- A broken Samsung Galaxy Book6 Pro repair scenario.
- An older Samsung Galaxy S9 or poorly conditioned iPhone 15 upgrade scenario.

The final `if / else if / else` structure preserves the existing sample recommendations for devices that do not match those three special cases.

### Loops and DOM manipulation
AI assistance helped add:
- A `for` loop that creates a list of recommendation considerations from an array.
- A `while` loop that creates suggested next steps based on the recommendation outcome.
- A `for` loop through the `.small_note` NodeList, checking its `length` before applying a hover tooltip to each matching element.

The loops create and append list items using DOM methods and `textContent`.

### HTML changes
AI assistance helped identify the two list containers needed on the recommendation page:
- `recommendation-considerations`
- `recommendation-next-steps`

These are targets for the JavaScript-generated content.

### Documentation
AI assistance helped draft the decision-tree explanation and flowchart structure. The student should review the final code, documentation, and behavior and make any necessary corrections before submission.

## Files affected
- `js/techtrade.js`
- `techtrade_recommendation.html`
- `documentation/costa_decision_tree.docx`
- `documentation/costa_ai_documentation.md`

## Student review
The student is responsible for testing the site locally, confirming that all six sample cases behave as expected, reviewing the generated content, and ensuring the final submitted files match the repository.
