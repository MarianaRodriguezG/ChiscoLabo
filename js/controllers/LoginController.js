// js/controllers/LoginController.js

import { UsuarioModel } from '../models/UsuarioModel.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const mensaje = document.getElementById('mensaje');

  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const correo = document.getElementById('loginCorreo').value.trim();
    const password = document.getElementById('loginPassword').value;

    let usuario = UsuarioModel.validarCredenciales(correo, password);

    // Si el usuario existe pero no tiene la propiedad "activo", la asignamos por compatibilidad
    if (usuario && usuario.activo === undefined) {
      usuario.activo = true;
      UsuarioModel.update(usuario.correo, usuario); // Guarda el cambio
    }

    if (usuario && usuario.activo) {
      localStorage.setItem('usuarioActivo', JSON.stringify(usuario));

      if (usuario.rol === 'admin') {
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
