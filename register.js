'use strict';
const firstNameInput = document.getElementById('input-firstname');
const lastNameInput = document.getElementById('input-lastname');
const userNameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const confirmPasswordInput = document.getElementById('input-password-confirm');
const btnRegister = document.getElementById('btn-submit');

const KEY = 'userArr';
// let userArr = [];
const userArr = getFromStorage(KEY) || [];

//lấy dữ liệu từ form
btnRegister.addEventListener('click', function () {
  const user = new User(
    firstNameInput.value,
    lastNameInput.value,
    userNameInput.value,
    passwordInput.value,
    confirmPasswordInput.value
  );

  const usrValidated = checkValidForm(user);
  if (usrValidated) {
    // Thêm user vào mảng
    userArr.push(user);
    clearForm();
    window.location.href = '../pages/login.html';
  }
  saveToStorage('userArr', userArr);
});

function checkValidForm() {
  let checked = true;

  //   Username không được trùng với Username của các người dùng trước đó
  if (!userArr.every(x => x.userName !== userNameInput.value)) {
    alert('UserName đã được sử dụng');
    checked = false;
  }
  //Không có trường nào bị bỏ trống.
  if (!firstNameInput.value) {
    alert('Bạn cần nhập Họ');
    checked = false;
  }
  if (!lastNameInput.value) {
    alert('Bạn cần nhập Tên');
    checked = false;
  }
  if (!userNameInput.value) {
    alert('Bạn cần nhập User Name');
    checked = false;
  }
  if (passwordInput.value.trim().length === 0) {
    alert('Bạn cần nhập mật khẩu');
    checked = false;
  }
  if (passwordInput.value.length < 8) {
    alert('Mật khẩu phải nhiều hơn 8 ký tự ');
    checked = false;
  }
  if (!confirmPasswordInput.value) {
    alert('Bạn cần nhập lại mật khẩu');
    checked = false;
  }
  if (passwordInput.value != confirmPasswordInput.value) {
    alert('Mật khẩu không trùng khớp');
    checked = false;
  }
  return checked;
}

function clearForm() {
  firstNameInput.value = '';
  lastNameInput.value = '';
  userNameInput.value = '';
  passwordInput.value = '';
  confirmPasswordInput.value = '';
}
