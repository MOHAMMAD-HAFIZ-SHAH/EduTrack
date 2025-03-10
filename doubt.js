document.addEventListener("DOMContentLoaded", () => {
    const teacherSelect = document.getElementById("teacherSelect");
    const nextStep = document.getElementById("nextStep");
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const slotSelect = document.getElementById("slotSelect");
    const confirmBooking = document.getElementById("confirmBooking");
    const goBack = document.getElementById("goBack");
    const confirmation = document.getElementById("confirmation");
    const goHome = document.getElementById("goHome");
    const homeButton = document.getElementById("homeButton");
    const requestedSessions = document.getElementById("requestedSessions");
    const bookedSessions = new Set();

    nextStep.addEventListener("click", () => {
        if (teacherSelect.value) {
            step1.classList.add("hidden");
            step2.classList.remove("hidden");
        } else {
            alert("Please select a teacher.");
        }
    });

    goBack.addEventListener("click", () => {
        step2.classList.add("hidden");
        step1.classList.remove("hidden");
    });

    confirmBooking.addEventListener("click", () => {
        const teacher = teacherSelect.value;
        const slot = slotSelect.value;
        const sessionKey = `${teacher} - ${slot}`;

        if (bookedSessions.has(sessionKey)) {
            alert("This session is already booked.");
            return;
        }

        bookedSessions.add(sessionKey);
        step2.classList.add("hidden");
        confirmation.classList.remove("hidden");

        updateRequestedSessions(teacher, slot);
    });

    goHome.addEventListener("click", () => {
        confirmation.classList.add("hidden");
        step1.classList.remove("hidden");
    });

    homeButton.addEventListener("click", () => {
        confirmation.classList.add("hidden");
        step2.classList.add("hidden");
        step1.classList.remove("hidden");
    });

    function updateRequestedSessions(teacher, slot) {
        if (document.querySelector(".placeholder")) {
            document.querySelector(".placeholder").remove();
        }
        
        const listItem = document.createElement("li");
        listItem.textContent = `${teacher} - ${slot}`;
        listItem.classList.add("text-gray-800", "font-medium");
        requestedSessions.appendChild(listItem);
    }
});