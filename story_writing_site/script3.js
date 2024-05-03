document.addEventListener("DOMContentLoaded", function() {
    const storyTitle = document.getElementById("storyTitle");
    const storyDescription = document.getElementById("storyDescription");
    const storyContent = document.getElementById("storyContent");
    const addPartBtn = document.getElementById("addPartBtn");
    const saveStoryBtn = document.getElementById("saveStoryBtn");

    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    const description = urlParams.get('description');
    const content = urlParams.get('content');

    storyTitle.textContent = title;
    storyDescription.textContent = description;

    storyContent.innerHTML = content;

    addPartBtn.addEventListener("click", function() {
        storyContent.innerHTML += "<hr><div class='editable' contenteditable='true' placeholder='Write the next part of your story here'></div>";
    });

    saveStoryBtn.addEventListener("click", function() {
        const newContent = storyContent.innerHTML;
        window.location.href = "index.html";
    });
});