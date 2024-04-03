
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages } from "./js/pixabay-api.js"
import { showLoadingIndicator, hideLoadingIndicator, renderImages } from "./js/render-functions.js";

const searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchInput = document.querySelector('#search-input');
    const searchQuery = searchInput.value.trim();

    if (!searchQuery) {
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a search query',
            position: 'topCenter',
        });
        return;
    }

    showLoadingIndicator();

    try {
        const images = await fetchImages(searchQuery);
        renderImages(images);
        const lightbox = new SimpleLightbox('.gallery img');
        lightbox.refresh();
    } catch (error) {
        console.error('Error searching for images:', error.message);
    } finally {
        hideLoadingIndicator();
    }
});