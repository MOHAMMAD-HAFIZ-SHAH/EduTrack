document.addEventListener('DOMContentLoaded', () => {
    const teacherForm = document.getElementById('teacherForm');
    const teacherTableBody = document.querySelector('#teacherTable tbody');

    let teachers = JSON.parse(localStorage.getItem('teachers')) || [];

    const saveToLocalStorage = () => {
        localStorage.setItem('teachers', JSON.stringify(teachers));
    };

    const renderTeachers = () => {
        teacherTableBody.innerHTML = '';
        teachers.forEach((teacher, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${teacher.idt}</td>
                <td>${teacher.name}</td>
                <td>${teacher.email}</td>
                <td>${teacher.contact}</td>
                <td>
                    <button class="action-btn edit-btn" data-index="${index}">Edit</button>
                    <button class="action-btn delete-btn" data-index="${index}">Delete</button>
                </td>
            `;

            teacherTableBody.appendChild(row);
        });
    };

    teacherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const idt = document.getElementById('idt').value.trim();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact').value.trim();

        if (idt && name && email && contact) {
            teachers.push({ idt, name, email, contact });
            saveToLocalStorage();
            renderTeachers();
            teacherForm.reset();
        }
    });

    teacherTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            teachers.splice(index, 1);
            saveToLocalStorage();
            renderTeachers();
        } else if (e.target.classList.contains('edit-btn')) {
            const index = e.target.getAttribute('data-index');
            const teacher = teachers[index];
            document.getElementById('idt').value = teacher.idt;
            document.getElementById('name').value = teacher.name;
            document.getElementById('email').value = teacher.email;
            document.getElementById('contact').value = teacher.contact;
            teachers.splice(index, 1);
            saveToLocalStorage();
            renderTeachers();
        }
    });

    renderTeachers();
});
