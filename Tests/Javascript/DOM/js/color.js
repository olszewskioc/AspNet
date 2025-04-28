document.addEventListener("DOMContentLoaded", () => {
    const color = document.getElementById("color");

    color.addEventListener("click", () => {
        const randomColor = `#${Math.floor(Math.random() * 16777215)}`.toString(
            16
        );
        color.style.backgroundColor = randomColor;
        console.log(randomColor);
    });

    // color.addEventListener("mousedown", (e) => {
    //     let shiftX = e.clientx - color.getBoundingClientRect().left;
    //     let shiftY = e.clientx - color.getBoundingClientRect().top;

    //     color.style.position = "absolute";
    //     color.style.zIndex = 1000;
    //     color.body.append(color);

    //     moveAt(e.pageX, e.pageY);

    //     function moveAt(pageX, pageY) {
    //         color.style.left = pageX - shiftX + "px";
    //         color.style.top = pageY - shiftY + "px";
    //     }
    // });

    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    color.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - color.offsetLeft;
        offsetY = e.clientY - color.offsetTop;
        color.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            color.style.left = e.clientX - offsetX + "px";
            color.style.top = e.clientY - offsetY + "px";
            console.log(e.clientX + e.clientY)
            const randomColor = `#${Math.floor((e.clientX + e.clientY) / 50000 * 16777215)}`.toString(
                16
            );
            color.style.backgroundColor = randomColor;
            console.log(randomColor);
        }
    });

    document.addEventListener("mouseup", () => {
        color.onmouseup = null;
        isDragging = false;
        color.style.cursor = "pointer";
    });

});
