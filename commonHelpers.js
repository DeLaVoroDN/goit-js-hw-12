import{a as b,S as v,i as n}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();async function p(s,e){const a="42695738-6b8e09c0e47bd53fa68e0735a",l="https://pixabay.com/api/";return(await b.get(l,{params:{per_page:15,page:e,key:a,q:s,IMAGE_TYPE:"photo",SAFESEARCH:"true",ORIENTATION:"horizontal"}})).data}function g(s){return s.map(e=>`
        <li class="gallery-item">
          <div class="gallery-box item-card-wrapper">
            <a class="gallery-link" href="${e.largeImageURL}"> <!-- Ссылка на полноразмерное изображение -->
              <img class="gallery-img" src="${e.webformatURL}" alt="${e.tags}" loading="lazy"> <!-- Отображаемое изображение -->
            </a>
            <div class="card-box"> <!-- Контейнер для информации о изображении -->
              <div>
                <p class="card-box-text"><b>Likes</b></p> <!-- Заголовок для количества лайков -->
                <p class="card-box-text">${e.likes}</p> <!-- Количество лайков -->
              </div>
              <div>
                <p class="card-box-text"><b>Views</b></p> <!-- Заголовок для количества просмотров -->
                <p class="card-box-text">${e.views}</p> <!-- Количество просмотров -->
              </div>
              <div>
                <p class="card-box-text"><b>Comments</b></p> <!-- Заголовок для количества комментариев -->
                <p class="card-box-text">${e.comments}</p> <!-- Количество комментариев -->
              </div>
              <div>
                <p class="card-box-text"><b>Downloads</b></p> <!-- Заголовок для количества загрузок -->
                <p class="card-box-text">${e.downloads}</p> <!-- Количество загрузок -->
              </div>
            </div>
          </div>
        </li>`).join("")}const m="/goit-js-hw-12/assets/octagon-8fe9c699.svg",h=new v(".gallery a",{captionsData:"alt",captionDelay:250}),t={form:document.querySelector(".form"),gallery:document.querySelector(".list"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".btn-more")};let d=1,i=null;u();f();async function x(s){if(s.preventDefault(),i=t.form.elements.query.value.trim(),d=1,t.gallery.innerHTML="",i===""){n.warning({message:"Please enter a search query.",messageColor:"black",backgroundColor:"#ffac26",position:"topRight",pauseOnHover:!1,progressBarColor:"black",timeout:3e3});return}y(),p(i,d).then(e=>{const a=e.hits;t.gallery.innerHTML=g(a),a.length<15?f():L(),h.refresh()}).catch(e=>n.error({theme:"dark",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#ffffff",backgroundColor:"#ef4040",position:"topRight",iconUrl:m,pauseOnHover:!1,progressBarColor:"#b51b1b",timeout:3e3})).finally(()=>{u(),t.form.reset()})}t.form.addEventListener("submit",x);t.loadMoreBtn.addEventListener("click",async()=>{try{y();const s=await p(i,++d);t.gallery.insertAdjacentHTML("beforeend",g(s.hits)),h.refresh(),s.hits.length<15&&(f(),n.info({theme:"dark",message:"We're sorry, but you've reached the end of search results.",messageColor:"#ffffff",backgroundColor:"#1f79ff",position:"topRight",pauseOnHover:!1,progressBarColor:"black",timeout:3e3}));const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollTo({top:e*2+window.pageYOffset,behavior:"smooth"})}catch{n.error({theme:"dark",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#ffffff",backgroundColor:"#ef4040",position:"topRight",iconUrl:m,pauseOnHover:!1,progressBarColor:"#b51b1b",timeout:3e3})}finally{u()}});function L(){t.loadMoreBtn.classList.remove("is-hidden")}function f(){t.loadMoreBtn.classList.add("is-hidden")}function y(){t.loader.style.display="block"}function u(){t.loader.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
