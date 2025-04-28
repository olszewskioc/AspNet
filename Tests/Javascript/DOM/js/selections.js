const selectById = () => {
    const titulo = document.getElementById("titulo");
    console.log(titulo)
}

const selectByClass = () => {
    const list = document.getElementsByClassName("item-list");
    console.log(list)
}

const selectByTag = () => {
    const list = document.getElementsByTagName("ul");
    console.log(list)
}

const selectByQuery = () => {
    const element = document.querySelector("footer")
    console.log(element)
}

selectById();
selectByClass();
selectByTag();
selectByQuery();
