document.addEventListener("DOMContentLoaded", function () {
    const idStr = getDogIdFromURL();
    const id = parseInt(idStr, 10);
    const form = document.getElementById("adoption-form");
    
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); 
            window.location.href = "thankyou.html?id=" + id;
        });
    }

    // Load dog details for the UI (same as before)
    if (!isNaN(id)) {
        fetchDogById(id).then(dog => {
            const image = document.getElementById("adopt-dog-image");
            const title = document.getElementById("adopt-title");
            if (image) image.src = dog.first_image_url;
            if (title) title.textContent = "Adopt " + dog.name;
        });
    }
});