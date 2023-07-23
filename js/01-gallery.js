import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
let instance;

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

const openModal = (event) => {
     if (event.target.nodeName === 'IMG') {
          let options = {
               onClose: () => document.removeEventListener('keydown', closeModal)
          }
          event.preventDefault();
          instance = basicLightbox.create(`<img src="${event.target.dataset.source}">`, options);
          document.addEventListener('keydown', closeModal);
          instance.show();
     }
}

function closeModal(event) {
     if (event.code === 'Escape') {
          instance.close();
     }
}

gallery.addEventListener('click', openModal);