document.addEventListener('DOMContentLoaded', () => {
    fetchRegistrations();

    document.getElementById('registration-form').addEventListener('submit', handleFormSubmit);
});

let selectedRegistration = null;

async function fetchRegistrations() {
    try {
        const response = await fetch('http://localhost:5035/CourseSubjectStudent');
        if (!response.ok) {
            throw new Error('Erro ao buscar matrículas');
        }
        const registrations = await response.json();
        populateRegistrationsTable(registrations);
    } catch (error) {
        console.error(error);
        alert('Erro ao buscar matrículas');
    }
}

function populateRegistrationsTable(registrations) {
    const tableBody = document.getElementById('registrations-table-body');
    tableBody.innerHTML = '';

    registrations.forEach(reg => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${reg.student.studentId}</td>
            <td>${reg.course.courseId}</td>
            <td>${reg.subject.subjectId}</td>
            <td>${reg.student.studentName}</td>
            <td>${reg.course.description}</td>
            <td>${reg.subject.description}</td>
            <td><button class="btn btn-warning" onclick="editRegistration(${reg.student.studentId}, ${reg.course.courseId}, ${reg.subject.subjectId})">Edit</button>
                <button class="btn btn-danger" onclick="deleteRegistration(${reg.student.studentId}, ${reg.course.courseId}, ${reg.subject.subjectId})">Delete</button></td>
        `;

        tableBody.appendChild(row);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();

    const studentId = document.getElementById('student-id').value;
    const courseId = document.getElementById('course-id').value;
    const subjectId = document.getElementById('subject-id').value;

    const registration = { studentId, courseId, subjectId };

    if (selectedRegistration) {
        updateRegistration(registration);
    } else {
        addRegistration(registration);
    }

    clearForm();
}

function clearForm() {
    selectedRegistration = null;
    document.getElementById('student-id').value = "";
    document.getElementById('course-id').value = "";
    document.getElementById('subject-id').value = "";
}

async function addRegistration(registration) {
    try {
        const response = await fetch('http://localhost:5035/CourseSubjectStudent', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(registration)
        });

        if (!response.ok) throw new Error('Erro ao adicionar matrícula');
        fetchRegistrations();
    } catch (error) {
        console.error(error);
        alert('Erro ao adicionar matrícula');
    }
}

async function deleteRegistration(studentId, courseId, subjectId) {
    try {
        const response = await fetch(`http://localhost:5035/CourseSubjectStudent?studentId=${studentId}&courseId=${courseId}&subjectId=${subjectId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Erro ao deletar matrícula');
        fetchRegistrations();
    } catch (error) {
        console.error(error);
        alert('Erro ao deletar matrícula');
    }
}
