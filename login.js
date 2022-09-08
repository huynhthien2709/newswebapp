'use strict';

const userNameInput = document.getElementById('input-username');
const passWordInput = document.getElementById('input-password');
const btnLogin = document.getElementById('btn-submit');
const btnRegister = document.querySelector('.btn-block');

const userArr = getFromStorage('userArr');
//sự kiện login
btnLogin.addEventListener('click', function () {
  const userLoginValidated = checkDataLogin(userArr);
  if (userLoginValidated) {
    //kiểm tra username và password có được đăng kí chưa
    const user = userArr.find(
      e =>
        e.userName === userNameInput.value && e.password === passWordInput.value
    );
    if (user) {
      alert('Đăng nhập thành công');
      saveToStorage('currentUser', user);
      window.location.href = '../index.html';
    } else {
      alert('Đăng nhập không thành công');
    }
  }
});
//kiểm tra username và password đã được nhập hay chưa
function checkDataLogin() {
  let checked = true;
  if (!userNameInput.value) {
    alert('Bạn cần nhập User Name');
    checked = false;
  }
  if (!passWordInput.value) {
    alert('Bạn cần nhập mật khẩu');
    checked = false;
  }
  return checked;
}
