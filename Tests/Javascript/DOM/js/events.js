let count = 1;

function addItem() {
    const item = document.createElement('li');
    const list = document.querySelector('ol');

    item.innerText = `Item ${count++}`;
    list.appendChild(item);
}

function removeItem() {
    const list = document.querySelector('ol');
    const item = list.querySelector('li:first-child');
    count--;
    list.removeChild(item);
}

const buttonAdd = document.getElementById('new-item');
const buttonRemove = document.getElementById('remove-item');

buttonAdd.addEventListener('click', addItem);
buttonRemove.addEventListener('click', removeItem);

