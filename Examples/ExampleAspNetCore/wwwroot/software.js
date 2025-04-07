const API = "http://localhost:5000/Software"; // Substitua pela URL da sua API

document.addEventListener("DOMContentLoaded", () => {
    carregarSoftwares();
    document
        .getElementById("softwareForm")
        .addEventListener("submit", salvarSoftware);
});

async function carregarSoftwares() {
    try {
        const response = await fetch(API);
        const softwares = await response.json();
        const tabelaBody = document.querySelector("#tabelaSoftwares tbody");
        tabelaBody.innerHTML = "";

        softwares.forEach((software) => {
            const row = tabelaBody.insertRow();
            row.innerHTML = `
                <td>${software.softwareId}</td>
                <td>${software.produto}</td>
                <td>${software.hardDisk}</td>
                <td>${software.memoriaRam}</td>
                <td>${software.maquinaId}</td>
                <td>
                    <button onclick="editarSoftware(${software.softwareId})">Editar</button>
                    <button onclick="excluirSoftware(${software.softwareId})">Excluir</button>
                </td>
            `;
        });
    } catch (error) {
        console.error("Erro ao carregar softwares:", error);
    }
}

async function salvarSoftware(event) {
    event.preventDefault();
    const id = document.getElementById("id").value;
    const produto = document.getElementById("produto").value;
    const hd = document.getElementById("hd").value;
    const ram = document.getElementById("ram").value;
    const maquina = document.getElementById("maquina").value;
    const software = {
        softwareId: id,
        produto: produto,
        hardDisk: hd,
        memoriaRam: ram,
        maquinaId: maquina,
    };
    // const url = id ? `${apiUrl}/${id}` : apiUrl;

    console.table(software);
    try {
        // Verificar se a software já existe
        const res = await fetch(`${API}/${id}`);
        if (res.status === 404) {
            console.info("Software não encontrado. Criando um novo.");
            // Se a software não existir, cria uma nova
            const createResponse = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(software),
            });
            console.log("Software criado:", createResponse);
        } else if (res.ok) {
            console.info("Software encontrada. Atualizando.");
            // Se o software já existir, atualiza
            const updateResponse = await fetch(`${API}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(software),
            });
            console.log("Software atualizado:", updateResponse);
        } else {
            throw new Error("Erro ao verificar o software.");
        }

        // Limpar o formulário e recarregar
        document.getElementById("softwareForm").reset();
        carregarSoftwares();
    } catch (err) {
        console.error("Erro ao salvar software:", err);
    }
}

async function editarSoftware(id) {
    await fetch(`${API}/${id}`)
        .then((res) => res.json())
        .then((software) => {
            if (!software) {
                console.error("Máquina não encontrada!");
                return;
            }
            console.table(software);
            document.getElementById("id").value = software.softwareId || "";
            document.getElementById("produto").value = software.produto || "";
            document.getElementById("hd").value = software.hardDisk || "";
            document.getElementById("ram").value = software.memoriaRam || "";
            document.getElementById("maquina").value = software.maquinaId || "";
        })
        .catch((err) => {
            console.error("Erro ao editar software:", err);
        });
}

async function excluirSoftware(id) {
    if (confirm("Tem certeza que deseja excluir este software?")) {
        try {
            await fetch(`${API}/${id}`, { method: "DELETE" });
            console.warn(`SOFTWARE ${id} DELETED`);
            carregarSoftwares();
        } catch (error) {
            console.error("Erro ao excluir software:", error);
        }
    }
}
