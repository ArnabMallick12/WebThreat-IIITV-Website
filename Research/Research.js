let currentIndex = 1; // Start at the first real slide

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.getElementById('slider');
  const firstSlide = slides.children[0].cloneNode(true);
  const lastSlide = slides.children[slides.children.length - 1].cloneNode(true);

  slides.appendChild(firstSlide); // Append cloned first slide at the end
  slides.insertBefore(lastSlide, slides.children[0]); // Prepend cloned last slide at the start

  // Set initial position to the first actual slide
  slides.style.transform = `translateX(-100%)`;
});

function showSlide(index) {
  const slides = document.getElementById('slider');
  const dots = document.querySelectorAll('.dot');
  const totalSlides = slides.children.length - 2; // Adjust for cloned slides

  slides.style.transition = 'transform 0.5s ease';

  if (index > totalSlides) {
    // Transition to the cloned first slide
    slides.style.transform = `translateX(-${(totalSlides + 1) * 100}%)`;
    currentIndex = 1;

    slides.addEventListener('transitionend', function resetSlide() {
      slides.style.transition = 'none';
      slides.style.transform = `translateX(-100%)`;
      slides.removeEventListener('transitionend', resetSlide);
    });
  } else if (index < 1) {
    // Transition to the cloned last slide
    slides.style.transform = 'translateX(0%)';
    currentIndex = totalSlides;

    slides.addEventListener('transitionend', function resetSlide() {
      slides.style.transition = 'none';
      slides.style.transform = `translateX(-${totalSlides * 100}%)`;
      slides.removeEventListener('transitionend', resetSlide);
    });
  } else {
    currentIndex = index;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Active dot
  dots.forEach(dot => dot.classList.remove('active'));
  dots[(currentIndex - 1 + totalSlides) % totalSlides].classList.add('active');
}

function moveSlide(n) {
  showSlide(currentIndex + n);
}

function currentSlide(n) {
  showSlide(n + 1); // Offset for initial slide position
}

// Initial slide
showSlide(currentIndex);
