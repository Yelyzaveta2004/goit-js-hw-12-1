const API_KEY = '35544467-972bad3ac294320c3ee48db53';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(searchQuery) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        return data.hits;
    } catch (error) {
        console.error('Error fetching images:', error.message);
        throw error;
    }
}