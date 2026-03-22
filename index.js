function fetchAllDogs() {
    return fetch(BASE_URL + "/dogs")
        .then(function(response) {
            return response.json();
        });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchAllDogs().then(function(dogs) {
        const cards = document.querySelectorAll(".dog-card");

        cards.forEach(function(card, index) {
            const dog = dogs[index];

            const img = card.querySelector("img");
            const title = card.querySelector("h2");
            const link = card.querySelector("a");

            img.src = dog.first_image_url;
            img.alt = dog.name;

            title.textContent = dog.name;

            if (dog.sex === "Male") {
                card.classList.add("male");
            } else if (dog.sex === "Female") {
                card.classList.add("female");
            }

            link.href = "dog.html?id=" + (index + 1);
            link.textContent = "More Info";

            
        });
    }).catch(function(error) {
        console.error("Error fetching dogs:", error);
    });
});