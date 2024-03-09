import axios from 'axios'; // Импортируем библиотеку Axios для выполнения HTTP-запросов

// Экспортируем асинхронную функцию buildUrl для построения URL и получения данных из Pixabay API
export async function buildUrl(query, page) {
  const API_KEY = '42695738-6b8e09c0e47bd53fa68e0735a'; // Константа с ключом API
  const URL = 'https://pixabay.com/api/'; // Константа с базовым URL Pixabay API

  // Отправляем GET-запрос к Pixabay API с указанными параметрами
  const fetchGallery = await axios.get(URL, {
    params: {
      per_page: 15, // Количество изображений на странице
      page: page, // Номер страницы результатов
      key: API_KEY, // API ключ
      q: query, // Поисковый запрос
      IMAGE_TYPE: 'photo', // Тип изображения (фото)
      SAFESEARCH: 'true', // Фильтрация изображений по безопасности
      ORIENTATION: 'horizontal', // Ориентация изображений (горизонтальная)
    },
  });

  return fetchGallery.data; // Возвращаем данные, полученные из запроса
}
