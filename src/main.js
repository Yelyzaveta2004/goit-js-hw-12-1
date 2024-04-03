
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";
import iziToast from "izitoast";

let searchQuery = '';
let page = 1;

import { fetchImages } from "./js/pixabay-api.js"
import { showLoadingIndicator, hideLoadingIndicator, renderImages } from "./js/render-functions.js";

const searchForm = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('#load-more');
const loadingIndicator = document.querySelector('#loading-indicator');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    searchQuery = document.querySelector('#search-input').value.trim();
    page = 1;
    await searchImages(searchQuery, page);
});

loadMoreButton.addEventListener('click', async () => {
    page++;
    await searchImages(searchQuery, page);
});

async function searchImages(query, pageNum) {
    showLoadingIndicator();
    try {
        const images = await fetchImages(query, pageNum);
        renderImages(images);

        if (images.length === 0) {
            hideLoadingIndicator();
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topCenter',
            });
            return;
        }

        if (pageNum === 1) {
            const lightbox = new SimpleLightbox('.gallery img');
            lightbox.refresh();
        }

        if (images.length < 15) {
            loadMoreButton.style.display = 'none';
            iziToast.info({
                title: 'Info',
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topCenter',
            });
        } else {
            loadMoreButton.style.display = 'block';
        }

        smoothScroll();
    } catch (error) {
        console.error('Error searching for images:', error.message);
    } finally {
        hideLoadingIndicator();
    }
}

function smoothScroll() {
    const galleryHeight = document.querySelector('.gallery').getBoundingClientRect().height;
    window.scrollBy({
        top: galleryHeight * 2,
        behavior: 'smooth'
    });
}