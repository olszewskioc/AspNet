document.addEventListener('DOMContentLoaded', () => {
    fetchCourses();

    document.getElementById('course-form').addEventListener('submit', handleFormSubmit);
});

let selectedCourseId = null;

async function fetchCourses() {
    try {
        const response = await fetch('http://localhost:5035/Course');
        if (!response.ok) {
            throw new Error('Erro ao buscar cursos');
        }
        const courses = await response.json();
        populateCoursesTable(courses)
    } catch (error) {
        console.error(error);
        alert('Erro ao buscar cursos');
    }
}


function populateCoursesTable(courses) {
    const tableBody = document.getElementById('courses-table-body');
    tableBody.innerHTML = '';

    courses.forEach(course => {
        const row = document.createElement('tr');
        const studentNames = course.students.length;

        row.innerHTML = `
            <td>${course.courseId}</td>
            <td>${course.description}</td>
            <td>${studentNames}</td>
            <td><button class="btn btn-warning" onclick="editCourse(${course.courseId}, '${course.description}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteCourse(${course.courseId})">Delete</button></td>
        `;

        tableBody.appendChild(row);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();

    const description = document.getElementById('course-description').value;

    const course = { description: description };

    if (selectedCourseId) {
        course.courseId = selectedCourseId;
        updateCourse(course);
    } else {
        addCourse(course);
    }

    clearForm();
}

function editCourse(id, description) {
    selectedCourseId = id;
    document.getElementById('course-description').value = description;
}

function clearForm() {
    selectedCourseId = null;
    document.getElementById('course-description').value = "";
}

async function addCourse(course) {
    try {
        const response = await fetch('http://localhost:5035/Course', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(course)
        });

        if (!response.ok) throw new Error('Erro ao adicionar curso');
        fetchCourses();
    } catch (error) {
        console.error(error);
        alert('Erro ao adicionar curso');
    }
}

async function updateCourse(course) {
    console.log(course)

    try {
        const response = await fetch(`http://localhost:5035/Course/${course.courseId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(course)
        });

        if (!response.ok) throw new Error('Erro ao atualizar cursp');
        fetchCourses();
    } catch (error) {
        console.error(error);
        alert('Erro ao atualizar curso');
    }
}


async function deleteCourse(id) {
    try {
        const response = await fetch(`http://localhost:5035/Course/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Erro ao deletar curso');
        fetchCourses();
    } catch (error) {
        console.error(error);
        alert('Erro ao deletar cursp');
    }
}
