
function getAgeEmoji(age, sex) {
  const emojiMap = {
    Young: { Male: "🧒", Female: "👧" },
    Adult: { Male: "👨", Female: "👩" },
    Senior: { Male: "👴", Female: "👵" }
  };

  for (const [ageGroup, emojis] of Object.entries(emojiMap)) {
    if (age.includes(ageGroup)) {
      return emojis[sex] || "";
    }
  }
  return "";
}

function formatBooleanStatus(id, value) {
    document.getElementById(id).textContent = formatBoolean(value);
    const el = document.getElementById(id);
    if (value === true) {
        el.classList.add("yes");
    } else if (value === false) {
        el.classList.add("no");
    } else {
        el.classList.add("unknown");
    }
}

function formatStory(story) {
    if (!story) {
        return "No story available.";
    }
    return story.replace(/\./g, '.\n');
}

document.addEventListener("DOMContentLoaded", function () {
    let id = parseInt(getIdFromURL());
    getDogDataById(id).then(function(dog) {
        document.getElementById("dog-image").src = dog.first_image_url;
        document.getElementById("dog-image").alt = dog.name;
        document.getElementById("dog-name").textContent = dog.name;

        document.getElementById("dog-breed").textContent = dog.breed;

        document.getElementById("dog-age").textContent = getAgeEmoji(dog.age, dog.sex) + " " + dog.age;

        const card = document.querySelector(".dog-details-card");
        const image_container = document.querySelector(".hero-image-container");
        if (dog.sex === "Male") {
            dog.sex = "♂️ " + dog.sex;
            card.classList.add("male");
            image_container.classList.add("male");
        } else if (dog.sex === "Female") {
            dog.sex = "♀️ " + dog.sex;
            card.classList.add("female");
            image_container.classList.add("female");
        }
        document.getElementById("dog-gender").textContent = dog.sex;

        formatBooleanStatus("dog-vaccinated", dog.vaccinated);
        formatBooleanStatus("dog-house-trained", dog.house_trained);
        formatBooleanStatus ("dog-neutered", dog.neutered);

        document.getElementById("dog-story").textContent = formatStory(dog.story);

        const prevBtn = document.getElementById("prev-btn");
        const nextBtn = document.getElementById("next-btn");

        // hide Previous if first dog
        if (id === MIN_ID) {
            prevBtn.style.display = "none";
        }
        // hide Next if last dog
        if (id === MAX_ID) {
            nextBtn.style.display = "none";
        }
        prevBtn.addEventListener("click", function () {
            window.location.href = "dog.html?id=" + (id - 1);
        });
        nextBtn.addEventListener("click", function () {
            window.location.href = "dog.html?id=" + (id + 1);
        });

    }).catch(function(error) {
        console.error("Error fetching dog:", error);
    });
});