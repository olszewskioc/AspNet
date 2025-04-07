/// <reference lib="dom" />
console.log("Script TS carregado com sucesso!");
function enviar(): void {
    const input = document.getElementById('name') as HTMLInputElement;
    if (input == null) {
        alert("Não achei o input 'name'!");
        return;
    };
    const nome = input.value.trim();
  
    if (nome === "") {
      alert("Por favor, digite seu nome.");
    } else {
      alert(`Olá, ${nome}!`);
      console.log(`Nome enviado: ${nome}`);
      input.value = "";
    }
  }
  