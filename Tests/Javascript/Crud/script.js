var users = [];

document.getElementById("saveBtn").addEventListener("click", function () {
    const nome = document.getElementById("name").value.trim();
    const birth = document.getElementById("birth").value;
    const cpf = document.getElementById("cpf").value.trim();

    if (!nome || !birth || !cpf) {
        alert("Preencha todos os campos!");
        return;
    }

    users.push({ nome, birth, cpf });
    renderUsers();
});

function renderUsers() {
    const listUsers = document.getElementById("listUsers");
    listUsers.innerHTML = "";

    users.forEach((user, index) => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");

        userCard.innerHTML = `
            <div class="user-info">
                <div><strong>Nome:</strong> ${user.nome}</div>
                <div><strong>Nascimento:</strong> ${formatDate(user.birth)}</div>
                <div><strong>CPF:</strong> ${user.cpf}</div>
            </div>
            <div class="user-actions">
                <button class="edit-btn" onclick="editUser(${index})">Editar</button>
                <button class="delete-btn" onclick="deleteUser(${index})">Excluir</button>
            </div>
        `;

        listUsers.appendChild(userCard);
    });
}

function editUser(index) {
    const user = users[index];
    document.getElementById("name").value = user.nome;
    document.getElementById("birth").value = user.birth;
    document.getElementById("cpf").value = user.cpf;

    users.splice(index, 1);
    renderUsers();
}

function deleteUser(index) {
    users.splice(index, 1);
    renderUsers();
}

function colocaMascara(event) {
    let cpf = event.target.value.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    event.target.value = cpf;
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}
