'use strict';
const searchInput = document.getElementById('input-query');
const searchBtn = document.getElementById('btn-submit');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
// const searchResult = getFromStorage('searchInput');
const pageSize = 5;
const pageCategory = getFromStorage('newsCategory');
const newsContainer = document.getElementById('news-container');

let apiKey = '366a584ab8f047ed8db9265ced45341b';
// let apiKey = 'dcd5dd16203a4a448b4ed3dcfaae092f';
let apiURL = 'https://newsapi.org/v2/everything?apiKey=' + apiKey;
let page = 1;

//lấy api
async function getNews() {
  const response = await fetch(apiURL + '&q=' + searchInput.value);
  console.log(searchInput.value);
  const data = await response.json();

  renderApiData(data.articles);
}
//render api trả về
function renderApiData(data) {
  let html = '';

  data.forEach(function (e) {
    html += `<div class="card flex-row flex-wrap">
          <div class="card mb-3" style="">
              <div class="row no-gutters">
                  <div class="col-md-4">
                      <img src="${e.urlToImage}"
                          class="card-img"
                      alt="${e.title}">
                  </div>
                  <div class="col-md-8">
                  <div class="card-body">
                          <h5 class="card-title">${e.title}</h5>
                          <p class="card-text">${e.description}</p>
                          <a href="${e.url}"
                              class="btn btn-primary">View</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>`;
  });

  newsContainer.innerHTML = html;
}
searchBtn.addEventListener('click', function () {
  if (searchValidate()) {
    getNews();
  }
});
function searchValidate() {
  let checked = true;
  if (searchInput.value === '') {
    alert('Vui lòng nhập nội dung cần tìm');
    checked = false;
  }
  return checked;
}
