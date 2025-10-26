console.log('script loaded');
const picsContainer = document.querySelector('.pics');
let pics = document.querySelectorAll('.pic');
let index = 0;
let timer;

const firstClone = pics[0].cloneNode(true);
const lastClone = pics[pics.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';
picsContainer.append(firstClone);
picsContainer.prepend(lastClone);
pics = document.querySelectorAll('.pic');

const size = 60; // width percentage per slide
picsContainer.style.transform = `translateX(-${index * size}%)`;

function updatePics() {
    picsContainer.style.transition = 'transform 0.6s ease';
    picsContainer.style.transform = `translateX(-${index * 100}%)`;
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
    index = 1;
    picsContainer.style.transform = `translateX(-${index * size}%)`;
  }
  if (pics[index].id === 'last-clone') {
    picsContainer.style.transition = 'none';
    index = pics.length - 2;
    picsContainer.style.transform = `translateX(-${index * size}%)`;
  }
  updatePics();
});

document.querySelector('.next').addEventListener('click', () => { nextPic(); resetTimer(); });
document.querySelector('.prev').addEventListener('click', () => { prevPic(); resetTimer(); });

function startSlideshow() {
    timer = setInterval(nextPic(), 3000);
}

function resetTimer() {
    clearInterval(timer);
    startSlideshow();
}

updatePics();
startSlideshow();