document.addEventListener('DOMContentLoaded', () => {
    fetchStudents();
    fetchCourses();

    document.getElementById('student-form').addEventListener('submit', handleFormSubmit);
});

let selectedStudentId = null;

async function fetchStudents() {
    try {
        const response = await fetch('http://localhost:5035/Student');
        if (!response.ok) {
            throw new Error('Erro ao buscar estudantes');
        }

        const students = await response.json();
        populateStudentsTable(students);
    } catch (error) {
        console.error(error);
        alert('Erro ao buscar estudantes');
    }
}

async function fetchCourses() {
    try {
        const response = await fetch('http://localhost:5035/Course');
        if (!response.ok) {
            throw new Error('Erro ao buscar cursos');
        }
        const courses = await response.json();
        populateCoursesSelect(courses);
    } catch (error) {
        console.error(error);
        alert('Erro ao buscar cursos');
    }
}

function populateCoursesSelect(courses) {
    const select = document.getElementById('courses-student');
    select.innerHTML = '<option value="0"></option>';

    courses.forEach(course => {
        select.innerHTML += `
            <option value="${course.courseId}">${course.description}</option>
        `
    })
}

function populateStudentsTable(students) {
    const tableBody = document.getElementById('students-table-body');
    tableBody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.studentId}</td>
            <td>${student.studentName}</td>
            <td>${student.course.description}</td>
            <td><button class="btn btn-warning" onclick="editStudent(${student.studentId}, '${student.studentName}', '${student.course.courseId}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteStudent(${student.studentId})">Delete</button></td>
        `;

        tableBody.appendChild(row);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('student-name').value;
    const course = document.getElementById('courses-student').value;

    const student = { studentName: name, courseId: course };

    if (selectedStudentId) {
        student.studentId = selectedStudentId;
        updateStudent(student);
    } else {
        addStudent(student);
    }

    clearForm();
}

function editStudent(id, name, course) {
    selectedStudentId = id;
    document.getElementById('student-name').value = name;
    document.getElementById('courses-student').value = course;
}

function clearForm() {
    selectedStudentId = null;
    document.getElementById('student-name').value = '';
    document.getElementById('courses-student').value = '';
}

async function addStudent(student) {
    try {
        const response = await fetch('http://localhost:5035/Student', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(student)
        });

        if (!response.ok) throw new Error('Erro ao adicionar estudante');
        fetchStudents();
    } catch (error) {
        console.error(error);
        alert('Erro ao adicionar estudante');
    }
}

async function updateStudent(student) {
    console.log(student)

    try {
        const response = await fetch(`http://localhost:5035/Student/${student.studentId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(student)
        });

        if (!response.ok) throw new Error('Erro ao atualizar estudante');
        fetchStudents();
    } catch (error) {
        console.error(error);
        alert('Erro ao atualizar estudante');
    }
}


async function deleteStudent(id) {
    try {
        const response = await fetch(`http://localhost:5035/Student/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Erro ao deletar estudante');
        fetchStudents();
    } catch (error) {
        console.error(error);
        alert('Erro ao deletar estudante');
    }
}
