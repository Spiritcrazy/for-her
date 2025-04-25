const slides = document.getElementById('slides');
const dots = document.querySelectorAll('.dot');
const doneBtn = document.getElementById('doneBtn');
let currentSlide = 0;
let startX = 0;
let endX = 0;

function adjustSlideElements() {
    const slides = document.querySelectorAll('.slide-box');
    const container = document.querySelector('.carousel');
    const containerDimensions = container.getBoundingClientRect();

    slides.forEach((slide) => {
        slide.style.width = `${containerDimensions.width}px`;
        slide.style.height = `${containerDimensions.height}px`;

        const polaroidGrid = slide.querySelector('.polaroid-grid');
        if (polaroidGrid) {
            polaroidGrid.style.gridTemplateColumns = `repeat(auto-fit, minmax(${containerDimensions.width / 4}px, 1fr))`;
        }

        const images = slide.querySelectorAll('.polaroid img');
        images.forEach((polaroid) => {
            polaroid.style.width = '80%';
            polaroid.style.height = 'auto';
            polaroid.style.objectFit = 'cover'; // Fixed typo
        });
    });
}

window.addEventListener('load', adjustSlideElements);
window.addEventListener('resize', adjustSlideElements);

function updateSlide() {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    const totalSlides = slides.children.length;

    // Show DONE button only on the last slide
    if (currentSlide === totalSlides - 1) {
        doneBtn.style.display = 'block';
        doneBtn.style.pointerEvents = 'auto';
        doneBtn.textContent = 'DONE'; // Ensure the button says DONE
        console.log('Done button is now visible');
    } else {
        doneBtn.style.display = 'none';
        doneBtn.style.pointerEvents = 'none';
        console.log('Done button is now hidden');
    }
}

function moveSlide(step) {
    const totalSlides = slides.children.length;
    currentSlide = (currentSlide + step + totalSlides) % totalSlides;
    updateSlide(); // Call updateSlide to handle all updates
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
}

updateSlide();

slides.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slides.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (startX - endX > swipeThreshold) {
        moveSlide(1); // Swipe left
    } else if (endX - startX > swipeThreshold) {
        moveSlide(-1); // Swipe right
    }
}

doneBtn.addEventListener('click', () => {
    window.location.href = 'birthday.html'; // Redirect to another page
});