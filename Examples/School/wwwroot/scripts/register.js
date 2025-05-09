document.addEventListener('DOMContentLoaded', () => {
    fetchRegisters();
    document.getElementById('registration-form').addEventListener('submit', handleFormSubmit);
});

let selectedRegistration = null;

async function fetchRegisters() {
    try {
        clearForm();
        const response = await fetch('http://localhost:5035/CourseSubjectStudent');
        if (!response.ok) throw new Error('Erro ao buscar matrículas');
        
        const registers = await response.json();
        populateRegistersTable(registers);
        fetchCourses();
    } catch (error) {
        console.error(error);
        alert('Erro ao buscar matrículas');
    }
}

async function fetchCourses() {
    try {
        const response = await fetch('http://localhost:5035/Course');
        if (!response.ok) throw new Error('Erro ao buscar cursos');
        
        const courses = await response.json();
        populateCoursesSelect(courses);
        fetchStudents();
    } catch (error) {
        console.error(error);
        alert('Erro ao buscar cursos');
    }
}

function populateCoursesSelect(courses) {
    const select = document.getElementById('courses');
    select.innerHTML = '<option value="0"></option>';

    courses.forEach(course => {
        select.innerHTML += `<option value="${course.courseId}">${course.description}</option>`;
    });
}

async function fetchStudents() {
    try {
        const response = await fetch('http://localhost:5035/Student');
        if (!response.ok) throw new Error('Erro ao buscar estudantes');
        
        const students = await response.json();
        populateStudentsSelect(students);
        fetchSubjects();
    } catch (error) {
        console.error(error);
        alert('Erro ao buscar estudantes');
    }
}

function populateStudentsSelect(students) {
    const select = document.getElementById('students');
    select.innerHTML = '<option value="0"></option>';

    students.forEach(student => {
        select.innerHTML += `<option value="${student.studentId}">${student.studentName}</option>`;
    });
}

async function fetchSubjects() {
    try {
        const response = await fetch('http://localhost:5035/Subject');
        if (!response.ok) throw new Error('Erro ao buscar matérias');
        
        const subjects = await response.json();
        populateSubjectsSelect(subjects);
    } catch (error) {
        console.error(error);
        alert('Erro ao buscar matérias');
    }
}

function populateSubjectsSelect(subjects) {
    const select = document.getElementById('subjects');
    select.innerHTML = '<option value="0"></option>';

    subjects.forEach(subject => {
        select.innerHTML += `<option value="${subject.subjectId}">${subject.description}</option>`;
    });
}

function populateRegistersTable(registers) {
    const tableBody = document.getElementById('registers-table-body');
    tableBody.innerHTML = '';

    registers.forEach(register => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${register.student.studentName}</td>
            <td>${register.course.description}</td>
            <td>${register.subject.description}</td>
            <td><button class="btn btn-warning" onclick="editRegister('${register.student.studentId}', '${register.course.courseId}', '${register.subject.subjectId}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteRegistration('${register.student.studentId}', '${register.course.courseId}', '${register.subject.subjectId}')">Delete</button></td>
        `;

        tableBody.appendChild(row);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();

    const student = document.getElementById('students').value;
    const course = document.getElementById('courses').value;
    const subject = document.getElementById('subjects').value;

    const register = { studentId: student, courseId: course, subjectId: subject };

    if (selectedRegistration) {
        updateRegistration(selectedRegistration, register);
    } else {
        addRegistration(register);
    }

    clearForm();
}

function editRegister(studentId, courseId, subjectId) {
    selectedRegistration = { studentId, courseId, subjectId };
    console.log(selectedRegistration)

    document.getElementById('students').value = studentId;
    document.getElementById('courses').value = courseId;
    document.getElementById('subjects').value = subjectId;
}

function clearForm() {
    selectedRegistration = null;
    document.getElementById('students').value = "";
    document.getElementById('courses').value = "";
    document.getElementById('subjects').value = "";
}

async function addRegistration(register) {
    try {
        console.log(selectedRegistration)
        const response = await fetch('http://localhost:5035/CourseSubjectStudent', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(register)
        });

        if (!response.ok) throw new Error('Erro ao adicionar matrícula');
        fetchRegisters();
    } catch (error) {
        console.error(error);
        alert('Erro ao adicionar matrícula');
    }
}

async function updateRegistration(selected, register) {
    try {
        const response = await fetch(`http://localhost:5035/CourseSubjectStudent?studentId=${selected.studentId}&courseId=${selected.courseId}&subjectId=${selected.subjectId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(register)
        });

        if (!response.ok) throw new Error('Erro ao atualizar matrícula');
        fetchRegisters();
    } catch (error) {
        console.error(error);
        alert('Erro ao atualizar matrícula');
    }
}

async function deleteRegistration(studentId, courseId, subjectId) {
    try {
        const response = await fetch(`http://localhost:5035/CourseSubjectStudent?studentId=${studentId}&courseId=${courseId}&subjectId=${subjectId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Erro ao deletar matrícula');
        fetchRegisters();
    } catch (error) {
        console.error(error);
        alert('Erro ao deletar matrícula');
    }
}
