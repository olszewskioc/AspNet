const API = "http://localhost:5000/Usuario"; // Corrigido a URL

// Function that will consume from API
// document.getElementById("userForm").addEventListener("submit", salvarUsuario);
carregarUsuario();

function carregarUsuario() {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      const tbody = document.querySelector("#tabelaUsuarios tbody"); // Corrigido seletor
      tbody.innerHTML = ""; // Evita duplicação ao recarregar

      data.forEach((usuario) => {
        tbody.innerHTML += `
        <tr>
            <td>${usuario.userId}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.password}</td>
            <td>${usuario.ramal}</td>
            <td>${usuario.especialidade}</td>
            <td>
                <button class="edit" onClick="editarUsuario(${usuario.userId})">
                    Editar
                </button>
                <button class="delete" onClick="DeletarUsuario(${usuario.userId})">
                    Deletar
                </button>
            </td>
        </tr>`;
      });
    })
    .catch((err) => console.error("Erro ao carregar usuários:", err));
}
