let current = 0;
const slides = document.querySelectorAll('.carrusel-slide');
const dots = document.querySelectorAll('.carrusel-dots .dot');
const total = slides.length;
let interval = setInterval(nextSlide, 4000);

function showSlide(idx) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === idx);
        dots[i].classList.toggle('active', i === idx);
    });
    current = idx;
}

function nextSlide() {
    showSlide((current + 1) % total);
}

function prevSlide() {
    showSlide((current - 1 + total) % total);
}

document.querySelector('.carrusel-btn.next').onclick = () => {
    nextSlide();
    resetInterval();
};
document.querySelector('.carrusel-btn.prev').onclick = () => {
    prevSlide();
    resetInterval();
};
dots.forEach((dot, i) => {
    dot.onclick = () => {
        showSlide(i);
        resetInterval();
    };
});

function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 4000);
}