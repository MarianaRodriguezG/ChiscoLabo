import { UsuarioModel } from '../models/UsuarioModel.js';
import { PersonalModel } from '../models/PersonalModel.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const mensaje = document.getElementById('mensaje');

  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const correo = document.getElementById('loginCorreo').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Buscar en ambas fuentes
    let usuario = UsuarioModel.getAll().find(u => u.correo === correo && u.password === password);
    let personal = PersonalModel.getAll().find(p => p.correo === correo && p.password === password);

    // Asignar prioridad: si existe personal, se usa personal
    const loginUser = personal || usuario;

    if (loginUser && loginUser.activo !== false) {
      localStorage.setItem('usuarioActivo', JSON.stringify(loginUser));

      // Redirección según rol
      if (loginUser.rol === 'admin') {
        window.location.href = './js/views/admin/dashboard.html';
      } else {
        window.location.href = './js/views/alumno/dashboard.html';
      }

    } else {
      mostrarMensaje('Correo o contraseña incorrectos, o cuenta inactiva.', 'danger');
    }
  });

  function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = `alert alert-${tipo}`;
    mensaje.classList.remove('d-none');
    setTimeout(() => mensaje.classList.add('d-none'), 3000);
  }
});
