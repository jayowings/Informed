console.log('script loaded');

let visibleSlides = 3;
let size;

function calculateSize() {
  if (window.innerWidth < 600) visibleSlides = 2;
  else if (window.innerWidth < 900) visibleSlides = 3;
  else visibleSlides = 4;

  size = 120 / visibleSlides; // e.g. 100/3 = 33.33%
  pics.forEach(pic => pic.style.flex = `0 0 ${size}%`);
  picsContainer.style.transform = `translateX(-${index * size}%)`;
}

window.addEventListener('resize', calculateSize);

const picsContainer = document.querySelector('.pics');
let pics = document.querySelectorAll('.pic');
let index = 2;
let timer;

const firstClone = pics[0].cloneNode(true);
const lastClone = pics[pics.length - 1].cloneNode(true);
const extraClone = pics[pics.length - 2].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';
extraClone.id = 'extraClone';
picsContainer.append(firstClone);
picsContainer.prepend(lastClone);
picsContainer.prepend(extraClone);
pics = document.querySelectorAll('.pic');

picsContainer.style.transform = `translateX(-${index * size}%)`;

function updatePics() {
    picsContainer.style.transition = 'transform 0.6s ease';
    picsContainer.style.transform = `translateX(-${index * size}%)`;
    pics.forEach((pic, i) => {
        pic.classList.toggle('active', i === index);
    });
} 

function nextPic() {
    if (index >= pics.length - 1) return;
    index++;
    updatePics();
}

function prevPic() {
    if (index <= 0) return;
    index--;
    updatePics();
}

picsContainer.addEventListener('transitionend', () => {
  if (pics[index].id === 'first-clone') {
    picsContainer.style.transition = 'none';
    index = 2;
    picsContainer.style.transform = `translateX(-${index * size}%)`;
  }
  if (pics[index].id === 'last-clone') {
    picsContainer.style.transition = 'none';
    index = pics.length - 1;
    picsContainer.style.transform = `translateX(-${index * size}%)`;
  }
});

document.querySelector('.next').addEventListener('click', () => { nextPic(); resetTimer(); });
document.querySelector('.prev').addEventListener('click', () => { prevPic(); resetTimer(); });

function startSlideshow() {
    timer = setInterval(nextPic, 3000);
}

function resetTimer() {
    clearInterval(timer);
    startSlideshow();
}

updatePics();
startSlideshow();