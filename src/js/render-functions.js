import iziToast from "izitoast";

export function showLoadingIndicator() {
    iziToast.show({
        title: 'Loading',
        message: 'Fetching images from Pixabay...',
        theme: 'dark',
        progressBarColor: '#17a2b8',
        position: 'bottomRight',
    });
}

export function hideLoadingIndicator() {
    iziToast.hide({}, document.querySelector('.iziToast'));
}

export function renderImages(images) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    if (images.length === 0) {
        iziToast.error({
            title: 'Error',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'topCenter',
        });
        return;
    }

    const fragment = document.createDocumentFragment();
    images.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${image.webformatURL}" alt="${image.tags}" data-large="${image.largeImageURL}">
            <div class="info">
                <span>${image.likes} Likes</span>
                <span>${image.views} Views</span>
                <span>${image.comments} Comments</span>
                <span>${image.downloads} Downloads</span>
            </div>
        `;
        fragment.appendChild(card);
    });
    gallery.appendChild(fragment);
}