// js/auth.js

document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));

  if (!usuario) {
    window.location.href = '../../../login.html';
  }
});
