document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".item-list");
    const modal = document.getElementById("modal");
    const content = document.getElementById("content-div");
    const closeModal = document.getElementById("closeModal");
    count = 1;

    items.forEach((item) => {
        item.addEventListener("click", () => {
            modal.style.display = "block";
            content.innerHTML = `
                <p id="content">Conteúdo do Modal ${count++}</p>
            `
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });
});
