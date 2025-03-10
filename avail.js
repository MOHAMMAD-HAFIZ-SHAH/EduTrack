const classrooms = [
    { id: "GA 101", capacity: 30, status: "Available", bookings: [] },
    { id: "NB 102", capacity: 25, status: "Available", bookings: [] },
    { id: "GA 103", capacity: 40, status: "Available", bookings: [] },
    { id: "NB 104", capacity: 35, status: "Available", bookings: [] },
    { id: "GA 105", capacity: 20, status: "Available", bookings: [] }
];

const classroomList = document.getElementById("classroom-list");
const searchInput = document.getElementById("search");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDetails = document.getElementById("modal-details");
const bookingDate = document.getElementById("booking-date");
const confirmBooking = document.getElementById("confirm-booking");
const closeModal = document.querySelector(".close");

let selectedRoom = null;

// Function to render classrooms
function renderClassrooms(filteredClassrooms = classrooms) {
    classroomList.innerHTML = "";

    if (filteredClassrooms.length === 0) {
        classroomList.innerHTML = "<p>No matching classrooms found.</p>";
        return;
    }

    filteredClassrooms.forEach(room => {
        const card = document.createElement("div");
        card.classList.add("classroom-card");

        card.innerHTML = `
            <div class="details">
                <p class="room-name"><strong>${room.id}</strong></p>
                <p>Capacity: ${room.capacity} | Status: 
                    <span class="status ${room.status === "Available" ? "available" : "booked"}">
                        ${room.status}
                    </span>
                </p>
            </div>
            <button class="book-btn" data-id="${room.id}" ${room.status === "Booked" ? "disabled" : ""}>
                ${room.status === "Booked" ? "Unavailable" : "Book"}
            </button>
        `;

        card.querySelector(".book-btn").addEventListener("click", () => openBookingModal(room));

        classroomList.appendChild(card);
    });
}

// Function to open booking modal
function openBookingModal(room) {
    selectedRoom = room;
    modalTitle.innerText = `Book ${room.id}`;
    modalDetails.innerText = `Capacity: ${room.capacity}`;
    bookingDate.value = "";
    modal.classList.remove("hidden");
    modal.style.display = "flex";
}

// Function to confirm booking
confirmBooking.addEventListener("click", () => {
    const selectedDate = bookingDate.value.trim();

    if (!selectedDate) {
        alert("Please select a date for booking.");
        return;
    }

    if (selectedRoom.bookings.includes(selectedDate)) {
        alert(`${selectedRoom.id} is already booked on ${selectedDate}.`);
        return;
    }

    selectedRoom.bookings.push(selectedDate);
    selectedRoom.status = "Booked"; // Mark as booked

    alert(`${selectedRoom.id} booked successfully for ${selectedDate}!`);
    
    modal.classList.add("hidden");
    modal.style.display = "none";
    
    renderClassrooms();
});

// Function to close modal
closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.style.display = "none";
});

// Function to filter classrooms based on search input
searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    const filtered = classrooms.filter(room => 
        room.id.toLowerCase().includes(query) || 
        room.id.split(" ")[1]?.includes(query) // Allow searching by number only
    );

    renderClassrooms(filtered);
});

// Initial render
renderClassrooms();
