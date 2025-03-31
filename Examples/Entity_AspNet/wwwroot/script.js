const API = "http://localhost:5000/Usuario"; // Substitua pela URL da sua API

document.addEventListener("DOMContentLoaded", () => {
    carregarUsuarios();
    document
        .getElementById("userForm")
        .addEventListener("submit", salvarUsuario);
});

async function carregarUsuarios() {
    try {
        const response = await fetch(API);
        const usuarios = await response.json();
        console.table(usuarios)
        const tabelaBody = document.querySelector("#tabelaUsuarios tbody");
        tabelaBody.innerHTML = "";

        usuarios.forEach((usuario) => {
            const row = tabelaBody.insertRow();
            row.innerHTML = `
                <td>${usuario.userId}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.password}</td>
                <td>${usuario.ramal}</td>
                <td>${usuario.especialidade}</td>
                <td>
                    <button onclick="editarUsuario(${usuario.userId}, '${usuario.nome}', '${usuario.password}', ${usuario.ramal}, '${usuario.especialidade}')">Editar</button>
                    <button onclick="excluirUsuario(${usuario.userId})">Excluir</button>
                </td>
            `;
        });
    } catch (error) {
        console.error("Erro ao carregar usuários:", error);
    }
}

async function salvarUsuario(event) {
    event.preventDefault();
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const password = document.getElementById("password").value;
    const ramal = document.getElementById("ramal").value;
    const especialidade = document.getElementById("especialidade").value;
    const usuario = {
        userId: id,
        nome: nome,
        password: password,
        ramal: ramal,
        especialidade: especialidade,
    };
    // const url = id ? `${apiUrl}/${id}` : apiUrl;

    console.table(usuario);
    try {
        await fetch(`${API}/${id}`)
            .then((res) => {
                if (res.status === 404) {
                    console.info("User not found. Creating one.");
                    return fetch(API, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(usuario),
                    });
                } else if (res.ok) {
                    console.info("User found. Updating.");
                    return fetch(`${API}/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(usuario),
                    });
                } else throw new Error("Error when verifying user");
            })
            .then((res) => res.json())
            .then(() => {
                document.getElementById("userForm").reset();
                carregarUsuarios();
            })
            .catch((err) => console.error("ERROR", err));
    } catch (error) {
        console.error("Erro ao salvar usuário:", error);
    }
}

function editarUsuario(id, nome, password, ramal, especialidade) {
    document.getElementById("id").value = id;
    document.getElementById("nome").value = nome;
    document.getElementById("password").value = password;
    document.getElementById("ramal").value = ramal;
    document.getElementById("especialidade").value = especialidade;
}

async function excluirUsuario(id) {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
        try {
            await fetch(`${API}/${id}`, { method: "DELETE" });
            console.warn(`USER ${id} DELETED`)
            carregarUsuarios();
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
        }
    }
}
