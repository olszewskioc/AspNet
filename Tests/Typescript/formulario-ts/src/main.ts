/// <reference lib="dom" />

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("enviar");
  button?.addEventListener("click", () => {
    const input = document.getElementById("name") as HTMLInputElement;
    if (!input) {
      alert("Input não encontrado!");
      return;
    }

    const nome = input.value.trim();
    if (!nome) {
      alert("Por favor, digite seu nome.");
    } else {
      alert(`Olá, ${nome}!`);
      console.log(`Nome enviado: ${nome}`);
      input.value = "";
    }
  });
});
