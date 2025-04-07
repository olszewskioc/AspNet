const API = "http://localhost:5000/Maquina"; // Substitua pela URL da sua API

document.addEventListener("DOMContentLoaded", () => {
    carregarMaquinas();
    document
        .getElementById("maquinaForm")
        .addEventListener("submit", salvarMaquina);
});

async function carregarMaquinas() {
    try {
        const response = await fetch(API);
        const maquinas = await response.json();
        const tabelaBody = document.querySelector("#tabelaMaquinas tbody");
        tabelaBody.innerHTML = "";

        maquinas.forEach((maquina) => {
            const row = tabelaBody.insertRow();
            row.innerHTML = `
                <td>${maquina.maquinaId}</td>
                <td>${maquina.tipo}</td>
                <td>${maquina.velocidade}</td>
                <td>${maquina.hardDisk}</td>
                <td>${maquina.placaRede}</td>
                <td>${maquina.memoriaRam}</td>
                <td>${maquina.usuarioId}</td>
                <td>
                    <button onclick="editarMaquina(${maquina.maquinaId})">Editar</button>
                    <button onclick="excluirMaquina(${maquina.maquinaId})">Excluir</button>
                </td>
            `;
        });
    } catch (error) {
        console.error("Erro ao carregar máquinas:", error);
    }
}

async function salvarMaquina(event) {
    event.preventDefault();
    const id = document.getElementById("id").value;
    const tipo = document.getElementById("tipo").value;
    const velocidade = document.getElementById("velocidade").value;
    const hd = document.getElementById("hd").value;
    const rede = document.getElementById("rede").value;
    const ram = document.getElementById("ram").value;
    const user = document.getElementById("user").value;

    const maquina = {
        maquinaId: id,
        tipo: tipo,
        velocidade: velocidade,
        hardDisk: hd,
        placaRede: rede,
        memoriaRam: ram,
        usuarioId: user,
    };
    console.table(maquina)
    try {
        // Verificar se a máquina já existe
        const res = await fetch(`${API}/${id}`);

        if (res.status === 404) {
            console.info("Máquina não encontrada. Criando uma nova.");
            // Se a máquina não existir, cria uma nova
            const createResponse = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(maquina),
            });
            console.log("Máquina criada:", createResponse);
        } else if (res.ok) {
            console.info("Máquina encontrada. Atualizando.");
            // Se a máquina já existir, atualiza a máquina
            const updateResponse = await fetch(`${API}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(maquina),
            });
            console.log("Máquina atualizada:", updateResponse);
        } else {
            throw new Error("Erro ao verificar a máquina.");
        }

        // Limpar o formulário e recarregar as máquinas
        document.getElementById("maquinaForm").reset();
        carregarMaquinas();
    } catch (err) {
        console.error("Erro ao salvar máquina:", err);
    }
}


async function editarMaquina(id) {
    await fetch(`${API}/${id}`)
        .then(res => res.json())
        .then(maquina => {
            if (!maquina) {
                console.error("Máquina não encontrada!");
                return;
            }
            console.table(maquina);
            document.getElementById("id").value = maquina.maquinaId || "";
            document.getElementById("tipo").value = maquina.tipo || "";
            document.getElementById("velocidade").value = maquina.velocidade || "";
            document.getElementById("hd").value = maquina.hardDisk || "";
            document.getElementById("rede").value = maquina.placaRede || "";
            document.getElementById("ram").value = maquina.memoriaRam || "";
            document.getElementById("user").value = maquina.usuarioId || "";
        })
        .catch((err) => {
            console.error("Erro ao editar máquina:", err);
        });
}

async function excluirMaquina(id) {
    if (confirm("Tem certeza que deseja excluir esta máquina?")) {
        try {
            await fetch(`${API}/${id}`, { method: "DELETE" });
            console.warn(`MACHINE ${id} DELETED`);
            carregarMaquinas();
        } catch (error) {
            console.error("Erro ao excluir máquina:", error);
        }
    }
}
