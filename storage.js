'use strict';

//2. Lưu dữ liệu dưới LocalStorage

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getFromStorage(key) {
  if (key != null && localStorage.getItem(key) != null) {
    return JSON.parse(localStorage.getItem(key));
  } else return [];
}
///chuyển từ JS Object sang Class Instance
function jsOtoInstance(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.password
  );
  return user;
}
