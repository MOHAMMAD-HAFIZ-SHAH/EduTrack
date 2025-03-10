const people = [
    { name: "John Doe", image: "person1.jpg" },
    { name: "Jane Smith", image: "person2.jpg" },
    { name: "Michael Brown", image: "person3.jpg" },
];

let currentIndex = 0;

function revealName() {
    const nameElement = document.getElementById("person-name");
    nameElement.classList.remove("hidden");
    nameElement.style.opacity = "1";
    nameElement.style.transform = "translateY(0)";
}

function nextPerson() {
    currentIndex = (currentIndex + 1) % people.length;
    const imgElement = document.getElementById("person-image");
    const nameElement = document.getElementById("person-name");
    const progressElement = document.getElementById("progress-indicator");

    imgElement.src = people[currentIndex].image;
    nameElement.textContent = people[currentIndex].name;
    nameElement.classList.add("hidden");
    nameElement.style.opacity = "0";
    nameElement.style.transform = "translateY(10px)";

    progressElement.textContent = `Person ${currentIndex + 1} of ${people.length}`;
}

// Initialize progress
document.getElementById("progress-indicator").textContent = `Person 1 of ${people.length}`;
