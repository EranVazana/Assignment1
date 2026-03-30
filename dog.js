/**
 * dog.js - Displays full details for a single dog.
 * Reads 'id' from the URL, fetches the dog, populates the detail card,
 * and configures prev/next navigation.
 */

document.addEventListener("DOMContentLoaded", function () {
    const idStr = getDogIdFromURL();
    const id = parseInt(idStr, 10);

    /** Set adopt button link to include the current dog's ID */
    const adoptBtn = document.getElementById("adopt-btn");
    if (adoptBtn && !isNaN(id)) {
        adoptBtn.href = "adopt.html?id=" + id;
    }

    if (!isNaN(id)) {
        fetchDogById(id).then(function(dog) {

            /** Populate image, name, and text fields */
            document.getElementById("dog-image").src = dog.first_image_url;
            document.getElementById("dog-image").alt = dog.name;
            document.getElementById("dog-name").textContent = dog.name + " Details";
            document.getElementById("dog-breed").textContent = dog.breed;
            document.getElementById("dog-age").textContent = dog.age;
            document.getElementById("dog-story").textContent = dog.story;
            document.title = dog.name + " Details";

            /** Apply gender class and display gender with icon */
            const card = document.querySelector(".dog-details-card");
            let genderText = dog.sex;
            if (dog.sex === "Male") {
                genderText = "♂️ Male";
                if (card) card.classList.add("male");
            } else if (dog.sex === "Female") {
                genderText = "♀️ Female";
                if (card) card.classList.add("female");
            }
            document.getElementById("dog-gender").textContent = genderText;

            /** Display boolean fields via formatBoolean() */
            document.getElementById("dog-vaccinated").textContent = formatBoolean(dog.vaccinated);
            document.getElementById("dog-house-trained").textContent = formatBoolean(dog.house_trained);

            /** Prev/Next navigation — hide at boundaries, set click handlers */
            const prevBtn = document.getElementById("prev-btn");
            const nextBtn = document.getElementById("next-btn");

            if (id <= MIN_ID) {
                prevBtn.style.display = "none";
            }
            if (id >= MAX_ID) {
                nextBtn.style.display = "none";
            }

            prevBtn.addEventListener("click", function () {
                window.location.href = "dog.html?id=" + (id - 1);
            });
            nextBtn.addEventListener("click", function () {
                window.location.href = "dog.html?id=" + (id + 1);
            });

        }).catch(function(error) {
            console.error("Error loading dog details:", error);
        });
    }
});