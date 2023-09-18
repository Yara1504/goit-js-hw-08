import { galleryItems } from './gallery-items.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {});

const galleryList = document.querySelector('.gallery');

galleryList.addEventListener('click', (event) => {
    event.preventDefault();

    const clickElement = event.target;

    if (clickElement.classList.contains('gallery__image')) {
        const imageLink = clickElement.getAttribute('src');

        lightbox.open({
            items: [{ src: imageLink }],
        });
    }
});

const galleryMarkup = galleryItems
    .map((galleryItem) => `
        <li class="gallery__item">
            <a class="gallery__link" href="${galleryItem.original}">
                <img class="gallery__image" src="${galleryItem.preview}" alt="${galleryItem.description}" />
            </a>
        </li>
    `)
    .join('');

galleryList.insertAdjacentHTML('beforeend', galleryMarkup);