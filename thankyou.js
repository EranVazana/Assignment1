document.addEventListener("DOMContentLoaded", function () {
    const id = parseInt(getDogIdFromURL(), 10);
    const image = document.getElementById("thank-you-dog-image");
    const name = document.getElementById("thank-you-dog-name");
    const card = document.querySelector(".thankyou-card");

    if (!Number.isInteger(id)) {
        if (name) {
            name.textContent = "Your adoption request was sent.";
        }
        return;
    }

    fetchDogById(id)
        .then(function (dog) {
            if (image) {
                image.src = dog.first_image_url;
                image.alt = dog.name;
            }
            if (name) {
                name.textContent = dog.name;
            }

            // Gender-based styling
            if (dog.sex === "Male" && card) {
                card.classList.add("male");
            } else if (dog.sex === "Female" && card) {
                card.classList.add("female");
            }
        })
        .catch(function (error) {
            console.error("Error loading thank you page data:", error);
            if (name) {
                name.textContent = "Your adoption request was sent.";
            }
        });
});