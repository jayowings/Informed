const picsContainer = document.querySelector('.pics');
const pics = document.querySelectorAll('.pics');
let index = 0;
let timer;

function updatePics() {
    picsContainer.computedStyleMap.transform = 'translateX(-${index * 100}%)';
}

function nextPic() {
    index = (index + 1) % slides.length;
    updatePics();
}

function prevPic() {
    index = (index - 1 + slides.length) % slides.length;
    updatePics();
}

document.querySelector('.next').addEventListener('click', () => { nextPic(); resetTimer(); });
document.querySelector('.prev').addEventListener('click', () => { prevPic(); resetTimer(); });

function startSlideshow() {
  timer = setInterval(nextSlide, 3000);
}

function resetTimer() {
  clearInterval(timer);
  startSlideshow();
}

updateSlides();
startSlideshow();