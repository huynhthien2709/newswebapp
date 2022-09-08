'use strict';
const btnPrevious = document.getElementById('btn-prev');
const pageNumber = document.getElementById('page-num');
const btnNext = document.getElementById('btn-next');
const newsContainer = document.getElementById('news-container');

const currentUser = getFromStorage('currentUser');
const pageSize = getFromStorage('newPerPage');
const pageCategory = getFromStorage('newsCategory');

console.log(pageSize);

//API
let apiKey = '366a584ab8f047ed8db9265ced45341b';
// let apiKey = 'dcd5dd16203a4a448b4ed3dcfaae092f';

let apiURL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey;
let page = 1;

(async () => {
  let data = await getNews(page);
  renderApiData(data.articles);
})();
//các tham số để lấy thông tin của apiUrl
async function getNews(page) {
  const response = await fetch(
    apiURL +
      '&page=' +
      page +
      '&pageSize=' +
      pageSize +
      '&category=' +
      pageCategory
  );

  //truyền json vào biến data
  const data = await response.json();
  //trả về mảng chứa các phần tử của bài viết
  return data;
}

(async () => {
  let data = await getNews(page);
  console.log(data);
})().catch(err => {
  console.error(err);
});
console.log(pageSize);

//hàm render dữ liệu từ API
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

//nút previous
btnPrevious.addEventListener('click', async function () {
  page -= 1;
  let data = await getNews(page, pageSize);
  newsContainer.innerHTML = '';
  renderApiData(data.articles);
  hideNextBtn(data.totalResults);
  hidePriviousBtn();
  pageUpdate(data.totalResults);
});
//nút Next
btnNext.addEventListener('click', async function () {
  page += 1;
  let data = await getNews(page, pageSize);
  newsContainer.innerHTML = '';
  renderApiData(data.articles);
  hideNextBtn(data.totalResults);
  hidePriviousBtn();
  pageUpdate(data.totalResults);
});

//ẩn nút Next
function hideNextBtn(totalResults) {
  let currentPostDisplay = page * pageSize;
  if (currentPostDisplay < totalResults) {
    btnNext.disable = false;
    btnNext.style.display = 'block';
  } else {
    btnNext.disable = true;
    btnNext.style.display = 'none';
  }
}

// //ẩn nút previous
function hidePriviousBtn() {
  if (page <= 1) {
    btnPrevious.disable = true;
    btnPrevious.style.display = 'none';
  } else {
    btnPrevious.disable = false;
    btnPrevious.style.display = 'block';
  }
}

//cập nhật page Number
function pageUpdate(totalResults) {
  let pageNumber = document.getElementById('page-num');
  pageNumber.innerHTML = page;
  hideNextBtn(totalResults);
  hidePriviousBtn();
}
