document.addEventListener("DOMContentLoaded", function() {
    const createStoryBtn = document.getElementById("createStoryBtn");
    const storyModal = document.getElementById("storyModal");
    const closeBtn = document.getElementsByClassName("close")[0];
    const submitStoryBtn = document.getElementById("submitStoryBtn");
    const startWritingBtn = document.getElementById("startWritingBtn");
    const storyList = document.getElementById("storyList");

    createStoryBtn.addEventListener("click", function() {
        storyModal.style.display = "block";
    });

    closeBtn.addEventListener("click", function() {
        storyModal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == storyModal) {
            storyModal.style.display = "none";
        }
    });

    document.getElementById("storyTitle").addEventListener("input", checkInputs);
    document.getElementById("storyDescription").addEventListener("input", checkInputs);

    function checkInputs() {
        const title = document.getElementById("storyTitle").value.trim();
        const description = document.getElementById("storyDescription").value.trim();
        if (title !== "" && description !== "") {
            startWritingBtn.removeAttribute("disabled");
        } else {
            startWritingBtn.setAttribute("disabled", "disabled");
        }
    }

    startWritingBtn.addEventListener("click", function() {
        const title = document.getElementById("storyTitle").value;
        const description = document.getElementById("storyDescription").value;
        window.location.href = "indexsub1.html?title=" + encodeURIComponent(title) + "&description=" + encodeURIComponent(description);
    });

    submitStoryBtn.addEventListener("click", function() {
        const title = document.getElementById("storyTitle").value;
        const description = document.getElementById("storyDescription").value;
        if (title.trim() !== "" && description.trim() !== "") {
            createStory(title, description);
            storyModal.style.display = "none";
            document.getElementById("storyTitle").value = "";
            document.getElementById("storyDescription").value = "";
        } else {
            alert("Please enter a title and description for your story.");
        }
    });

    function createStory(title, description) {
        const storyCard = document.createElement("div");
        storyCard.classList.add("storyCard");
        const titleElement = document.createElement("h3");
        titleElement.textContent = title;
        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = description;
        descriptionElement.classList.add("storyDescription");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.addEventListener("click", function() {
            storyCard.remove();
        });
        storyCard.appendChild(titleElement);
        storyCard.appendChild(descriptionElement);
        storyCard.appendChild(deleteBtn);
        storyList.appendChild(storyCard);
    }
});