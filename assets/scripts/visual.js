document.addEventListener("DOMContentLoaded", function () {
    const initialParagraph = document.querySelector(".initial-paragraph");
    const sections = document.querySelectorAll(".section");

    function fadeContent(newContentId) {
        const currentSection = document.querySelector(".section:not(.hidden)");
        const newSection = document.getElementById(newContentId);

        function fadeInNewSection() {
            newSection.classList.remove("hidden");
            newSection.classList.add("fade-in");
        }

        if (initialParagraph && !initialParagraph.classList.contains("hidden")) {
            initialParagraph.classList.add("fade-out");
            setTimeout(() => {
                initialParagraph.classList.add("hidden");
                initialParagraph.classList.remove("fade-out");
                fadeInNewSection();
            }, 500);
        } else if (currentSection) {
            currentSection.classList.add("fade-out");
            setTimeout(() => {
                currentSection.classList.add("hidden");
                currentSection.classList.remove("fade-out");
                fadeInNewSection();
            }, 500);
        } else {
            fadeInNewSection();
        }
    }

    document.querySelectorAll(".sidebar a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            fadeContent(targetId);
        });
    });

    sections.forEach(section => section.classList.add("hidden"));

    const hamburger = document.querySelector(".hamburger");
    const sidebar = document.querySelector(".sidebar");
    hamburger.addEventListener("click", function () {
        sidebar.classList.toggle("active");
    });
});
