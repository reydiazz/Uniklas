/* Carrusel de imágenes */
let current = 0;
const slides = document.querySelectorAll('.carrusel-slide');
const dots = document.querySelectorAll('.carrusel-dots .dot');
const total = slides.length;
let interval = setInterval(nextSlide, 4000);


function mostrarSlide(indice) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === indice);
        dots[i].classList.toggle('active', i === indice);
    });
    current = indice;
}

function nextSlide() {
    mostrarSlide((current + 1) % total);
}

function prevSlide() {
    mostrarSlide((current - 1 + total) % total);
}

document.querySelector('.carrusel-btn.next').onclick = () => {
    nextSlide();
    resetearIntervalo();
};
document.querySelector('.carrusel-btn.prev').onclick = () => {
    prevSlide();
    resetearIntervalo();
};
dots.forEach((dot, i) => {
    dot.onclick = () => {
        mostrarSlide(i);
        resetearIntervalo();
    };
});

function resetearIntervalo() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 4000);
}



let acceso = true;

const nav = document.querySelector("#navegacion")
const abrirYcerrar = document.querySelector("#abrirYcerrar")

abrirYcerrar.addEventListener("click", () => {
    if (acceso) {
        nav.classList.add("lista-navegacion_visible")
        acceso = false;
    } else {
        nav.classList.remove("lista-navegacion_visible")
        acceso = true;
    }
})
