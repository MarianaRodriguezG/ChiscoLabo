import { protegerVista } from "../../views/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  protegerVista("admin");

  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  document.getElementById("usuarioCorreo").textContent = usuario.correo;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Contadores
  const total = usuarios.length;
  const activos = usuarios.filter(u => u.activo !== false).length;
  const inactivos = usuarios.filter(u => u.activo === false).length;

  document.getElementById("contadorUsuarios").textContent = total;
  document.getElementById("contadorActivos").textContent = activos;
  document.getElementById("contadorInactivos").textContent = inactivos;

  // Tabla de últimos usuarios
  const cuerpoTabla = document.querySelector("#tablaUsuarios tbody");
  cuerpoTabla.innerHTML = "";

  usuarios.slice(-5).reverse().forEach((u, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${i + 1}</td>
      <td>${u.correo}</td>
      <td>${u.rol}</td>
      <td>${u.activo === false ? 'Inactivo' : 'Activo'}</td>
    `;
    cuerpoTabla.appendChild(fila);
  });
});
