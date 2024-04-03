
const API_KEY = '35544467-972bad3ac294320c3ee48db53';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(searchQuery, pageNum) {
    const perPage = 15;
    const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNum}&per_page=${perPage}`;

    try {
        const response = await axios.get(url);
        if (response.status !== 200) {
            throw new Error('Failed to fetch images');
        }
        return response.data.hits;
    } catch (error) {
        console.error('Error fetching images:', error.message);
        throw error;
    }
}