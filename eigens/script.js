const body = document.querySelector("body"),
    left = body.querySelector(".left"),
    right = body.querySelector(".right");
    toggle = body.querySelector(".toggle");

    toggle.addEventListener("click", () =>{
        left.classList.toggle("close");
        right.classList.toggle("close");
    })