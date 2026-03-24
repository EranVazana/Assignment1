document.addEventListener("DOMContentLoaded", function () {
    const idFromUrl = parseInt(getIdFromURL(), 10);
    const idFromSession = parseInt(sessionStorage.getItem("selectedDogId"), 10);
    const id = Number.isInteger(idFromUrl)
        ? idFromUrl
        : (Number.isInteger(idFromSession) ? idFromSession : MIN_ID);
    const hasValidId = Number.isInteger(id);

    const form = document.getElementById("adoption-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            window.location.href = hasValidId
                ? "thankyou.html?id=" + id
                : "thankyou.html";
        });
    }

    if (!hasValidId) {
        console.error("Missing or invalid dog id in URL query string.");
        return;
    }

    sessionStorage.setItem("selectedDogId", String(id));

    getDogDataById(id)
        .then(function (dog) {
            const image = document.getElementById("adopt-dog-image");
            const title = document.getElementById("adopt-title");

            if (image) {
                image.src = dog.first_image_url;
                image.alt = dog.name;
            }

            if (title) {
                title.textContent = "Adopt " + dog.name;
            }
        })
        .catch(function (error) {
            console.error("Error loading dog for adoption:", error);
        });
});
