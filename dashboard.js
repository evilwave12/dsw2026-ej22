document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');

  logoutButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });


  const menuBtn = document.getElementById('menu');
  const nav = document.getElementById('sidebar');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
});