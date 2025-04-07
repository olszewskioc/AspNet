/// <reference lib="dom" />
function enviar() {
    var input = document.getElementById('name');
    if (input == null) {
        alert("Não achei o input 'name'!");
        return;
    }
    ;
    var nome = input.value.trim();
    if (nome === "") {
        alert("Por favor, digite seu nome.");
    }
    else {
        alert("Ol\u00E1, ".concat(nome, "!"));
        console.log("Nome enviado: ".concat(nome));
        input.value = "";
    }
}
