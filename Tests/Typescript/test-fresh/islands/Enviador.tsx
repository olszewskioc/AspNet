export default function Enviador() {
    return (
      <div class="flex flex-col items-center gap-4 p-6 max-w-md mx-auto bg-white rounded-2xl shadow-2xl">
        <input
          class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="text"
          id="name"
          placeholder="Digite seu nome"
        />
        <button
          type="button"
          onClick={handleClick}
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          Enviar
        </button>
      </div>
    );
  
    function handleClick() {
      const input = document.getElementById("name") as HTMLInputElement;
      if (!input?.value.trim()) {
        alert("Por favor, digite seu nome.");
      } else {
        alert(`Olá, ${input.value.trim()}!`);
      }
    }
  }
  