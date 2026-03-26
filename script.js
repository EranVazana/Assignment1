const BASE_URL = "https://b799e904-0d3e-4d2b-afe2-9292b5ce8721.mock.pstmn.io";

const MIN_ID = 0;
const MAX_ID = 5;

/**
 * Extracts the 'id' parameter from the current URL.
 * Example: if URL is dog.html?id=2, it returns "2".
 */
function getDogIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
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
 * Fetches data for a single dog by its ID.
 * Used on dog.html, adopt.html, and thankyou.html.
 */
async function fetchDogById(id) {
    try {
        const dogs = await fetchAllDogs();
        if (!Array.isArray(dogs)) {
            throw new Error("Invalid dogs response.");
        }

        const index = Number.parseInt(id, 10);
        if (!Number.isInteger(index) || index < 0 || index >= dogs.length) {
            throw new Error("Dog id is out of range.");
        }

        return dogs[index];
    } catch (error) {
        console.error("Error fetching dog data:", error);
        throw error;
    }
}

/**
 * Formats boolean values into human-readable strings.
 * Converts true -> "Yes", false -> "No", and null/undefined -> "Unknown".
 */
function formatBoolean(value) {
    if (value === null || value === undefined) {
        return "Unknown";
    }
    return value ? "Yes" : "No";
}

/**
 * Sends adoption form data to the server via POST request.
 * @param {Object} data - Contains email, fullname, and phone.
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
        throw error; // Pass the error to the caller
    }
}