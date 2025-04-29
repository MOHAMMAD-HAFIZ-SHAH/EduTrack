// Toggle cards
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');

const addCard = document.getElementById('addCard');
const updateCard = document.getElementById('updateCard');
const deleteCard = document.getElementById('deleteCard');

addBtn.addEventListener('click', () => toggleCard(addCard));
updateBtn.addEventListener('click', () => toggleCard(updateCard));
deleteBtn.addEventListener('click', () => toggleCard(deleteCard));

function toggleCard(card) {
    [addCard, updateCard, deleteCard].forEach(c => {
        if (c !== card) c.style.display = 'none';
    });
    card.style.display = card.style.display === 'block' ? 'none' : 'block';
}

// Save schedule to localStorage
function saveSchedule(classroom, date, details) {
    let schedules = JSON.parse(localStorage.getItem('schedules')) || {};
    if (!schedules[classroom]) schedules[classroom] = {};
    schedules[classroom][date] = details;
    localStorage.setItem('schedules', JSON.stringify(schedules));
    alert('Schedule Saved!');
    populateClassrooms();
}

// Update schedule
function updateSchedule(classroom, date, details) {
    let schedules = JSON.parse(localStorage.getItem('schedules')) || {};
    if (schedules[classroom] && schedules[classroom][date]) {
        schedules[classroom][date] = details;
        localStorage.setItem('schedules', JSON.stringify(schedules));
        alert('Schedule Updated!');
    } else {
        alert('Schedule not found!');
    }
}

// Delete schedule
function deleteSchedule(classroom, date) {
    let schedules = JSON.parse(localStorage.getItem('schedules')) || {};
    if (schedules[classroom] && schedules[classroom][date]) {
        delete schedules[classroom][date];
        localStorage.setItem('schedules', JSON.stringify(schedules));
        alert('Schedule Deleted!');
    } else {
        alert('Schedule not found!');
    }
}

// Forms
document.getElementById('addForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const classroom = document.getElementById('addClassroom').value;
    const date = document.getElementById('addDate').value;
    const details = document.getElementById('addDetails').value;
    saveSchedule(classroom, date, details);
    this.reset();
});

document.getElementById('updateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const classroom = document.getElementById('updateClassroom').value;
    const date = document.getElementById('updateDate').value;
    const details = document.getElementById('updateDetails').value;
    updateSchedule(classroom, date, details);
    this.reset();
});

document.getElementById('deleteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const classroom = document.getElementById('deleteClassroom').value;
    const date = document.getElementById('deleteDate').value;
    deleteSchedule(classroom, date);
    this.reset();
});

// View Schedule
const viewClassroom = document.getElementById('viewClassroom');
const viewDate = document.getElementById('viewDate');
const scheduleDisplay = document.getElementById('scheduleDisplay');

viewClassroom.addEventListener('change', displaySchedule);
viewDate.addEventListener('change', displaySchedule);

function displaySchedule() {
    const classroom = viewClassroom.value;
    const date = viewDate.value;
    const schedules = JSON.parse(localStorage.getItem('schedules')) || {};

    if (schedules[classroom] && schedules[classroom][date]) {
        scheduleDisplay.innerText = schedules[classroom][date];
    } else {
        scheduleDisplay.innerText = 'No schedule found for this day.';
    }
}

// Populate classrooms dropdown
function populateClassrooms() {
    const schedules = JSON.parse(localStorage.getItem('schedules')) || {};
    viewClassroom.innerHTML = `<option value="">Select Classroom</option>`;
    for (let classroom in schedules) {
        viewClassroom.innerHTML += `<option value="${classroom}">${classroom}</option>`;
    }
}
populateClassrooms();
