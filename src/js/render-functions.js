// Экспортируем функцию renderGallery для отображения галереи изображений
export function renderGallery(images) {
  // Преобразуем массив изображений в массив строк HTML
  return images
    .map(
      img =>
        `
        <li class="gallery-item">
          <div class="gallery-box item-card-wrapper">
            <a class="gallery-link" href="${img.largeImageURL}"> <!-- Ссылка на полноразмерное изображение -->
              <img class="gallery-img" src="${img.webformatURL}" alt="${img.tags}" loading="lazy"> <!-- Отображаемое изображение -->
            </a>
            <div class="card-box"> <!-- Контейнер для информации о изображении -->
              <div>
                <p class="card-box-text"><b>Likes</b></p> <!-- Заголовок для количества лайков -->
                <p class="card-box-text">${img.likes}</p> <!-- Количество лайков -->
              </div>
              <div>
                <p class="card-box-text"><b>Views</b></p> <!-- Заголовок для количества просмотров -->
                <p class="card-box-text">${img.views}</p> <!-- Количество просмотров -->
              </div>
              <div>
                <p class="card-box-text"><b>Comments</b></p> <!-- Заголовок для количества комментариев -->
                <p class="card-box-text">${img.comments}</p> <!-- Количество комментариев -->
              </div>
              <div>
                <p class="card-box-text"><b>Downloads</b></p> <!-- Заголовок для количества загрузок -->
                <p class="card-box-text">${img.downloads}</p> <!-- Количество загрузок -->
              </div>
            </div>
          </div>
        </li>`
    )
    .join(''); // Объединяем строки HTML в одну строку
}
