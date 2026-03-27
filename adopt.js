document.addEventListener("DOMContentLoaded", function () {
    const idStr = getDogIdFromURL();
    const id = parseInt(idStr, 10);
    const form = document.getElementById("adoption-form");

    // === Name validation ===
    const nameInput = document.getElementById("full-name");
    const nameError = document.getElementById("name-error");
    const nameRegex = /^[a-zA-Z\u0590-\u05FF\s]+$/;

    nameInput.addEventListener("input", function () {
        const value = nameInput.value.trim();
        if (value === "") {
            nameInput.classList.remove("invalid", "valid");
            nameError.textContent = "";
        } else if (!nameRegex.test(value)) {
            nameInput.classList.add("invalid");
            nameInput.classList.remove("valid");
            nameError.textContent = "Name must contain only English or Hebrew letters";
        } else {
            nameInput.classList.add("valid");
            nameInput.classList.remove("invalid");
            nameError.textContent = "";
        }
    });

    // === Email validation ===
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailInput.addEventListener("input", function () {
        const value = emailInput.value.trim();
        if (value === "") {
            emailInput.classList.remove("invalid", "valid");
            emailError.textContent = "";
        } else if (!emailRegex.test(value)) {
            emailInput.classList.add("invalid");
            emailInput.classList.remove("valid");
            emailError.textContent = "Email must be in the format: name@domain.extension";
        } else {
            emailInput.classList.add("valid");
            emailInput.classList.remove("invalid");
            emailError.textContent = "";
        }
    });

    // === Phone validation ===
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phone-error");
    const phoneRegex = /^05\d-?\d{7}$/;

    phoneInput.addEventListener("input", function () {
        const value = phoneInput.value.trim();
        if (value === "") {
            phoneInput.classList.remove("invalid", "valid");
            phoneError.textContent = "";
        } else if (!phoneRegex.test(value)) {
            phoneInput.classList.add("invalid");
            phoneInput.classList.remove("valid");
            phoneError.textContent = "Phone must be in the format: 05X-XXXXXXX (dash optional)";
        } else {
            phoneInput.classList.add("valid");
            phoneInput.classList.remove("invalid");
            phoneError.textContent = "";
        }
    });

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Block submit if name is invalid
            const nameValue = nameInput.value.trim();
            if (!nameRegex.test(nameValue) || nameValue === "") {
                nameInput.classList.add("invalid");
                nameError.textContent = "Name must contain only English or Hebrew letters";
                nameInput.focus();
                return;
            }

            // Email check
            const emailValue = emailInput.value.trim();
            if (!emailRegex.test(emailValue) || emailValue === "") {
                emailInput.classList.add("invalid");
                emailError.textContent = "Email must be in the format: name@domain.extension";
                emailInput.focus();
                return;
            }

            // Phone check
            const phoneValue = phoneInput.value.trim();
            if (!phoneRegex.test(phoneValue) || phoneValue === "") {
                phoneInput.classList.add("invalid");
                phoneError.textContent = "Phone must be in the format: 05X-XXXXXXX (dash optional)";
                phoneInput.focus();
                return;
            }

            window.location.href = "thankyou.html?id=" + id;
        });
    }

    // Load dog details for the UI
    if (!isNaN(id)) {
        fetchDogById(id).then(dog => {
            const image = document.getElementById("adopt-dog-image");
            const title = document.getElementById("adopt-title");
            if (image) image.src = dog.first_image_url;
            if (title) title.textContent = "Adopt " + dog.name;
            const card = document.querySelector(".adopt-card");  // <-- this was missing

            // Gender-based styling
            if (dog.sex === "Male" && card) {
                card.classList.add("male");
                if (image) image.style.borderColor = "#5ab3e6";
            } else if (dog.sex === "Female" && card) {
                card.classList.add("female");
                if (image) image.style.borderColor = "#ff85b5";
            }
        });
    }
});