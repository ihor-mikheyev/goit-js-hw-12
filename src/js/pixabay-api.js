import axios from 'axios';

const apiKey = '44649550-1f14fff39212e3f1a5e911ecf';
const apiUrl = 'https://pixabay.com/api/';
export const perPage = 15;
export let currentPage = 1;

export async function searchImages(query) {
  const params = {
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: perPage,
  };

  try {
    const response = await axios.get(apiUrl, { params });
    const { hits, totalHits } = response.data;
    currentPage += 1;
    return { hits, totalHits };
  } catch (error) {
    console.log(error);
  }
}

export function resetPage() {
  currentPage = 1;
}
