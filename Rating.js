document.addEventListener("DOMContentLoaded", function () {
    // Initialize star ratings
    document.querySelectorAll(".stars").forEach(starsContainer => {
        const stars = Array.from({ length: 5 }, (_, index) => 
            `<span class="star" data-value="${index + 1}">★</span>`
        ).join("");

        starsContainer.innerHTML = stars;

        starsContainer.addEventListener("click", function (event) {
            if (event.target.classList.contains("star")) {
                const rating = event.target.dataset.value;
                updateStars(starsContainer, rating);
            }
        });
    });

    function updateStars(container, rating) {
        container.querySelectorAll(".star").forEach(star => {
            star.classList.toggle("selected", star.dataset.value <= rating);
        });
        container.dataset.rating = rating;
    }

    // Submit Button Click Event
    document.getElementById("submitBtn").addEventListener("click", function () {
        let allRated = true;

        document.querySelectorAll(".stars").forEach(rating => {
            if (rating.dataset.rating === "0") {
                allRated = false;
            }
        });

        const popup = document.getElementById("popupMessage");
        const popupText = document.getElementById("popupText");

        if (!allRated) {
            popupText.innerText = "Please rate all parameters before submitting!";
            popup.style.display = "block";

            // Hide the popup after 5 seconds
            setTimeout(() => {
                popup.style.display = "none";
            }, 5000);
            return;
        }

        popupText.innerText = "Review Submitted Successfully!";
        popup.style.display = "block";

        // Hide popup and redirect after 5 seconds
        setTimeout(() => {
            popup.style.display = "none";
            window.location.href = "PeerReview.html"; // Redirects to Peer Review page
        }, 2000);
    });
});
