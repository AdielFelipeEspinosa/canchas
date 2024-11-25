// carousel.js
export function iniciarCarrusel(carouselSelector, interval = 3000) {
    const carouselSlide = document.querySelector(carouselSelector);
    if (!carouselSlide) return;
  
    const images = carouselSlide.querySelectorAll('img');
    let counter = 0;
  
    const size = images[0].clientWidth;
  
    function moveCarousel() {
      carouselSlide.style.transform = translateX(${-size * counter}px);
      counter++;
      if (counter >= images.length) {
        counter = 0; // Regresa al inicio
      }
    }
  
    setInterval(moveCarousel, interval);
  }
  