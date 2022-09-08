'use strict';

const newPerPage = document.getElementById('input-page-size');
const newsCategory = document.getElementById('input-category');
const saveSettingBtn = document.getElementById('btn-submit');
const currentUser = getFromStorage('currentUser');

//lấy dữ liệu setting load lên form
newPerPage.value = getFromStorage('newPerPage');
newsCategory.value = getFromStorage('newsCategory');
//lưu setting xuống localStorage
saveSettingBtn.addEventListener('click', function () {
  if (validate()) {
    if (!isNaN(newPerPage.value) && newPerPage.value > 0) {
      saveToStorage('newPerPage', newPerPage.value);
      saveToStorage('newsCategory', newsCategory.value);
    }
  }
});

//valid thông tin setting nhập vào
function validate() {
  let checked = true;
  if (newPerPage.value < 0) {
    alert('Số bà viết không hợp lệ');
    checked = false;
  }
  if (newsCategory.value === '') {
    alert('Cần chon danh mục tin tức');
    checked = false;
    newsCategory.value === 'General';
  }
  return checked;
}
