const teacherForm = document.getElementById('teacherForm');
const courseForm = document.getElementById('courseForm');
const teacherList = document.getElementById('teacherList');
const courseList = document.getElementById('courseList');
const courseSelect = document.getElementById('courseSelect');

function getTeachers() {
  return JSON.parse(localStorage.getItem('teachers') || '[]');
}

function getCourses() {
  return JSON.parse(localStorage.getItem('courses') || '[]');
}

function saveTeachers(teachers) {
  localStorage.setItem('teachers', JSON.stringify(teachers));
}

function saveCourses(courses) {
  localStorage.setItem('courses', JSON.stringify(courses));
}

function renderCourses() {
  const courses = getCourses();
  courseList.innerHTML = '';
  courseSelect.innerHTML = '';
  courses.forEach(course => {
    const li = document.createElement('li');
    li.textContent = `${course.title} (${course.code})`;
    courseList.appendChild(li);

    const option = document.createElement('option');
    option.value = course.code;
    option.textContent = course.title;
    courseSelect.appendChild(option);
  });
}

function renderTeachers() {
  const teachers = getTeachers();
  teacherList.innerHTML = '';
  teachers.forEach(t => {
    const div = document.createElement('div');
    const courseNames = getCourses()
      .filter(c => t.courses.includes(c.code))
      .map(c => c.title)
      .join(', ');
    div.innerHTML = `
      <strong>${t.name}</strong> - ${t.email} - ${t.subject}
      <br>Courses: ${courseNames || 'None'}
      <br>
      <button onclick='editTeacher("${t.id}")'>Edit</button>
      <button onclick='deleteTeacher("${t.id}")'>Delete</button>
    `;
    teacherList.appendChild(div);
  });
}

function editTeacher(id) {
  const t = getTeachers().find(t => t.id === id);
  document.getElementById('teacherId').value = t.id;
  document.getElementById('name').value = t.name;
  document.getElementById('email').value = t.email;
  document.getElementById('subject').value = t.subject;
  Array.from(courseSelect.options).forEach(opt => {
    opt.selected = t.courses.includes(opt.value);
  });
}

function deleteTeacher(id) {
  const teachers = getTeachers().filter(t => t.id !== id);
  saveTeachers(teachers);
  renderTeachers();
}

teacherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('teacherId').value || crypto.randomUUID();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const selectedCourses = Array.from(courseSelect.selectedOptions).map(o => o.value);

  const teachers = getTeachers();
  const existingIndex = teachers.findIndex(t => t.id === id);
  const newTeacher = { id, name, email, subject, courses: selectedCourses };

  if (existingIndex >= 0) teachers[existingIndex] = newTeacher;
  else teachers.push(newTeacher);

  saveTeachers(teachers);
  teacherForm.reset();
  renderTeachers();
});

courseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('courseTitle').value;
  const code = document.getElementById('courseCode').value;

  const courses = getCourses();
  if (!courses.some(c => c.code === code)) {
    courses.push({ title, code });
    saveCourses(courses);
    courseForm.reset();
    renderCourses();
  } else {
    alert('Course code already exists.');
  }
});

renderCourses();
renderTeachers();
