const BASE_URL = "https://6d98304b-c2bf-4ebc-93b8-22707b1a8141.mock.pstmn.io";

const MIN_ID = 1;
const MAX_ID = 6;

function getIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function getDogDataById(id) {
   return fetch(BASE_URL + "/dogs/" + id)
        .then(function(response) {
            return response.json();
        });
}

function formatBoolean(value) {
    if (value === null || value === undefined) {
        return "Unknown";
    }
    return value ? "Yes" : "No";
}