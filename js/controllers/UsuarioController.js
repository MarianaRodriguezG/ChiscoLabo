import { UsuarioModel } from '../models/UsuarioModel.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formUsuario');
  const tabla = document.querySelector('#tablaUsuarios tbody');
  const inputCorreo = document.getElementById('correo');
  const selectRol = document.getElementById('rol');

  let modoEdicion = false;
  let idEnEdicion = null;

  function renderTabla() {
    const usuarios = UsuarioModel.getAll();
    tabla.innerHTML = '';

    usuarios.forEach((u, index) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${index + 1}</td>
        <td>${u.correo}</td>
        <td>
          <select data-id="${u.id}" class="form-select form-select-sm cambiarRol">
            <option value="usuario" ${u.rol === 'usuario' ? 'selected' : ''}>Usuario</option>
            <option value="admin" ${u.rol === 'admin' ? 'selected' : ''}>Administrador</option>
          </select>
        </td>
        <td>
          ${u.activo
            ? `<button class="btn btn-danger btn-sm toggleActivo" data-id="${u.id}">🗑️ Baja</button>`
            : `<button class="btn btn-success btn-sm toggleActivo" data-id="${u.id}">✅ Alta</button>`}
        </td>
      `;
      tabla.appendChild(fila);
    });

    // Botones de baja/alta
    tabla.querySelectorAll('.toggleActivo').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.id);
        UsuarioModel.toggleActivo(id);
        renderTabla();
      });
    });

    // Select para cambiar rol
    tabla.querySelectorAll('.cambiarRol').forEach(sel => {
      sel.addEventListener('change', () => {
        const id = Number(sel.dataset.id);
        UsuarioModel.updateRol(id, sel.value);
        renderTabla();
      });
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const correo = inputCorreo.value.trim();
    const rol = selectRol.value;

    if (UsuarioModel.findByCorreo(correo)) {
      alert('El correo ya está registrado.');
      return;
    }

    UsuarioModel.add({ correo, rol, password: '1234' });
    form.reset();
    renderTabla();
  });

  renderTabla();
});
