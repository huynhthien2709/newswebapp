'use strict';

const mainContent = document.getElementById('main-content');
const welcomeMessage = document.getElementById('welcome-message');
const loginModal = document.getElementById('login-modal');
const btnLogout = document.getElementById('btn-logout');
const currentUser = getFromStorage('currentUser');

///Home Page
function loginDisplay() {
  if (currentUser) {
    //hiển thị sau khi user đã login
    loginModal.style.display = 'none';
    mainContent.style.display = 'block';

    //hiển thị thông điệp chào mừng
    welcomeMessage.textContent = `Welcome ${currentUser.firstName}`;
  }
  if (currentUser.length == 0) {
    loginModal.style.display = 'block';
    mainContent.style.display = 'none';
  }
}
loginDisplay();
//Chức năng Logout
btnLogout.addEventListener('click', function () {
  const isLogout = confirm('Bạn có chắc muốn thoát');
  if (isLogout) {
    localStorage.removeItem('currentUser');
    window.location.href = './pages/login.html';
  }
});
