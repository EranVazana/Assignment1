/**
 * script.js - Shared utility functions for all pages. 
 * Provides API fetch functions, URL helpers, and display formatters.
 */

/** Base URL for the Postman mock server. */
const BASE_URL = "https://b799e904-0d3e-4d2b-afe2-9292b5ce8721.mock.pstmn.io";

/** Min and max valid dog IDs (array indices 0–5). */
const MIN_ID = 1;
const MAX_ID = 6;

/**
 * Reads and returns the 'id' query parameter from the current URL.
 * Example: dog.html?id=1 → returns "1".
 */
function getDogIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

/**
 * Fetches a single dog by its array index.
 * Used on dog.html, adopt.html, and thankyou.html.
 */
async function fetchDogById(id) {
    try {
        const response = await fetch(BASE_URL + "/dogs/" + id);
        if (!response.ok) {
            throw new Error("Failed to fetch dog data.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching dog data:", error);
        return null; // Return null on error to allow graceful handling
    }
}

/**
 * Fetches the entire list of dogs from the server.
 * Used on the index.html page.
 */
async function fetchAllDogs() {
    try {
        const response = await fetch(BASE_URL + "/dogs");
        if (!response.ok) {
            throw new Error("Failed to fetch dogs list.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching all dogs:", error);
        throw error;
    }
}

/**
 * Converts boolean values for display.
 * true → "Yes", false → "No", null/undefined → "Unknown".
 */
function formatBoolean(value) {
    if (value === null || value === undefined) {
        return "Unknown";
    }
    return value ? "Yes" : "No";
}

/**
 * Sends adoption form data to the server via POST.
 * @param {Object} data - { email, fullname, phone }
 */
async function sendAdoptionRequest(data) {
    try {
        const response = await fetch(BASE_URL + "/dogs/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Error in POST request:", error);
        throw error;
    }
}