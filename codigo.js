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

// Validación de formulario
// Interceptar el envío del formulario de contacto

// Obtiene el formulario por su id
const form = document.getElementById('formularioContacto');

// Verifica que el formulario exista en el DOM
if (form) {
    // Agrega un listener al evento 'submit' del formulario
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita el envío tradicional del formulario (no recarga la página)

        // Crea un objeto FormData con los datos del formulario
        const formData = new FormData(form);

        // Envía los datos a procesar.php usando fetch (AJAX)
        fetch('procesar.php', {
            method: 'POST',
            body: formData
        })
            // Cuando recibe la respuesta, la convierte a texto
            .then(response => response.text())
            .then(data => {
                if (data.includes("correctamente")) {
                    // Muestra la modal centrada si el mensaje fue enviado exitosamente
                    document.getElementById("modalConfirmacion").style.display = "flex";
                    form.reset(); // Limpia el formulario
                } else {
                    // Muestra mensaje de error en el div con id 'respuesta'
                    document.getElementById('respuesta').innerHTML =
                        `<div class="notificacion error">${data}</div>`;
                }
            })
            // Si ocurre un error en la petición, muestra un mensaje de error
            .catch(error => {
                document.getElementById('respuesta').innerHTML =
                    '<div class="notificacion error">Error al enviar el mensaje.</div>';
            });
    });
}
function cerrarModal() {
  document.getElementById("modalConfirmacion").style.display = "none";
}
// Escucha todos los eventos de teclas presionadas en el documento
document.addEventListener('keydown', function (event) {
    
    // Obtiene la referencia al modal de confirmación
    const modal = document.getElementById("modalConfirmacion");

    // Verifica si:
    // 1. La tecla presionada fue "Escape"
    // 2. El modal está actualmente visible (tiene la clase 'visible')
    if (event.key === "Escape" && modal.classList.contains("visible")) {

        // Si ambas condiciones se cumplen, cierra el modal
        cerrarModal();
    }
});

