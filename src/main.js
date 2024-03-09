'use strict';

import iziToast from 'izitoast'; // Импорт библиотеки для всплывающих уведомлений
import 'izitoast/dist/css/iziToast.min.css'; // Импорт стилей для iziToast
import SimpleLightbox from 'simplelightbox'; // Импорт библиотеки для галереи изображений
import 'simplelightbox/dist/simple-lightbox.min.css'; // Импорт стилей для SimpleLightbox
import { buildUrl } from './js/pixabay-api.js'; // Импорт функции для построения URL
import { renderGallery } from './js/render-functions.js'; // Импорт функции для рендеринга галереи
import Error from './img/octagon.svg'; // Импорт изображения для отображения ошибки

const lightbox = new SimpleLightbox('.gallery a', {
  // Инициализация SimpleLightbox для элементов галереи
  captionsData: 'alt', // Использование атрибута 'alt' для подписей
  captionDelay: 250, // Задержка перед показом подписей
});

const refs = {
  // Объект с ссылками на DOM-элементы
  form: document.querySelector('.form'), // Форма поиска
  gallery: document.querySelector('.list'), // Галерея
  loader: document.querySelector('.loader'), // Индикатор загрузки
  loadMoreBtn: document.querySelector('.btn-more'), // Кнопка "Загрузить еще"
};

let currentPage = 1; // Номер текущей страницы
let searchQuery = null; // Поисковый запрос

hideLoader(); // Скрываем индикатор загрузки
hideBtn(); // Скрываем кнопку "Загрузить еще"

// Функция обработки отправки формы
async function checkForSending(event) {
  event.preventDefault(); // Предотвращаем действие по умолчанию

  searchQuery = refs.form.elements.query.value.trim(); // Получаем поисковый запрос из поля ввода

  currentPage = 1; // Сбрасываем номер текущей страницы
  refs.gallery.innerHTML = ''; // Очищаем галерею

  // Если поисковый запрос пустой
  if (searchQuery === '') {
    // Показываем предупреждающее уведомление
    iziToast.warning({
      message: 'Please enter a search query.', // Текст уведомления
      messageColor: 'black', // Цвет текста
      backgroundColor: '#ffac26', // Фоновый цвет
      position: 'topRight', // Позиция на экране
      pauseOnHover: false, // Пауза при наведении
      progressBarColor: 'black', // Цвет прогресс-бара
      timeout: 3000, // Продолжительность показа
    });

    return; // Завершаем выполнение функции
  }

  showLoader(); // Показываем индикатор загрузки

  // Выполняем запрос к API Pixabay
  buildUrl(searchQuery, currentPage)
    .then(data => {
      const images = data.hits; // Получаем массив изображений

      refs.gallery.innerHTML = renderGallery(images); // Отображаем галерею

      // Если количество изображений меньше 15, скрываем кнопку "Загрузить еще", иначе показываем
      if (images.length < 15) {
        hideBtn();
      } else {
        showBtn();
      }

      lightbox.refresh(); // Обновляем галерею
    })
    .catch(error =>
      // В случае ошибки показываем уведомление об ошибке
      iziToast.error({
        theme: 'dark', // Тема уведомления
        message:
          'Sorry, there are no images matching your search query. Please try again!', // Текст уведомления
        messageColor: '#ffffff', // Цвет текста
        backgroundColor: '#ef4040', // Фоновый цвет
        position: 'topRight', // Позиция на экране
        iconUrl: Error, // Иконка уведомления
        pauseOnHover: false, // Пауза при наведении
        progressBarColor: '#b51b1b', // Цвет прогресс-бара
        timeout: 3000, // Продолжительность показа
      })
    )
    .finally(() => {
      hideLoader(); // Скрываем индикатор загрузки

      refs.form.reset(); // Очищаем форму
    });
}

// Обработчик отправки формы
refs.form.addEventListener('submit', checkForSending);

// Обработчик клика по кнопке "Загрузить еще"
refs.loadMoreBtn.addEventListener('click', async () => {
  try {
    showLoader(); // Показываем индикатор загрузки

    // Выполняем запрос к API Pixabay для загрузки следующей страницы
    const res = await buildUrl(searchQuery, ++currentPage);

    refs.gallery.insertAdjacentHTML('beforeend', renderGallery(res.hits)); // Добавляем новые изображения в галерею

    lightbox.refresh(); // Обновляем галерею

    // Если количество изображений меньше 15
    if (res.hits.length < 15) {
      hideBtn(); // Скрываем кнопку "Загрузить еще"

      // Показываем информационное уведомление о достижении конца результатов поиска
      iziToast.info({
        theme: 'dark', // Тема уведомления
        message: "We're sorry, but you've reached the end of search results.", // Текст уведомления
        messageColor: '#ffffff', // Цвет текста
        backgroundColor: '#1f79ff', // Фоновый цвет
        position: 'topRight', // Позиция на экране
        pauseOnHover: false, // Пауза при наведении
        progressBarColor: 'black', // Цвет прогресс-бара
        timeout: 3000, // Продолжительность показа
      });
    }

    // Получаем высоту элемента галереи и прокручиваем страницу к третьему элементу с плавным скроллингом
    const itemHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;
    window.scrollTo({
      top: itemHeight * 2 + window.pageYOffset, // Позиция прокрутки
      behavior: 'smooth', // Плавный скроллинг
    });

    // В случае ошибки при загрузке следующей страницы показываем уведомление об ошибке
  } catch {
    iziToast.error({
      theme: 'dark', // Тема уведомления
      message:
        'Sorry, there are no images matching your search query. Please try again!', // Текст уведомления
      messageColor: '#ffffff', // Цвет текста
      backgroundColor: '#ef4040', // Фоновый цвет
      position: 'topRight', // Позиция на экране
      iconUrl: Error, // Иконка уведомления
      pauseOnHover: false, // Пауза при наведении
      progressBarColor: '#b51b1b', // Цвет прогресс-бара
      timeout: 3000, // Продолжительность показа
    });

    // Скрываем индикатор загрузки после завершения выполнения запроса
  } finally {
    hideLoader();
  }
});
// Функция для отображения кнопки "Загрузить еще"
function showBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden'); // Удаляем класс для скрытия кнопки
}

// Функция для скрытия кнопки "Загрузить еще"
function hideBtn() {
  refs.loadMoreBtn.classList.add('is-hidden'); // Добавляем класс для скрытия кнопки
}

// Функция для отображения индикатора загрузки
function showLoader() {
  refs.loader.style.display = 'block'; // Показываем элемент
}

// Функция для скрытия индикатора загрузки
function hideLoader() {
  refs.loader.style.display = 'none'; // Скрываем элемент
}
