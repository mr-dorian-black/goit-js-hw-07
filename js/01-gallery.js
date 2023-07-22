import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
let instance;

const openModal = (link) => {
     instance = basicLightbox.create(`<img src="${link}">`);
     document.addEventListener('keydown', closeModal);
     instance.show();
}


const images = galleryItems.map(item => {
     let liItem = document.createElement('li');
     liItem.classList.add('gallery__item');

     let aItem = document.createElement('a');
     aItem.classList.add('gallery__link');
     aItem.href = item.original;

     let imgItem = document.createElement('img');
     imgItem.classList.add('gallery__image');
     imgItem.src = item.preview;
     imgItem.dataset.source = item.original;
     imgItem.alt = item.description;

     aItem.append(imgItem);
     liItem.append(aItem);
     return liItem
});

gallery.append(...images);


function openImage(event) {
     event.preventDefault();
     openModal(event.target.dataset.source);
}

function closeModal(event) {
     if (event.code === 'Escape') {
          instance.close();
          document.removeEventListener('keydown', closeModal);
     }
}

gallery.addEventListener('click', openImage);