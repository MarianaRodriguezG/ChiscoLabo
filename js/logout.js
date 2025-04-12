// // js/logout.js


// const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

// const cancelarBtn = document.getElementById("cancelarBtn");

// if (usuario?.rol === "admin") {
//   cancelarBtn.href = "views/admin/dashboard.html";
// } else if (usuario?.rol === "usuario") {
//   cancelarBtn.href = "views/alumno/dashboard.html";
// } else {
//   cancelarBtn.href = "login.html";
// }




// localStorage.removeItem("usuarioActivo");
// js/logout.js

const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

// Si no hay sesión activa, redirige al login directamente
if (!usuario) {
  window.location.href = "login.html";
}

// Si hay sesión, configura el botón cancelar según el rol
const cancelarBtn = document.getElementById("cancelarBtn");
if (usuario.rol === "admin") {
  cancelarBtn.href = "./js/views/admin/dashboard.html";
} else if (usuario.rol === "usuario") {
  cancelarBtn.href = "./js/views/alumno/dashboard.html";
} else {
  cancelarBtn.href = "login.html";
}

// Elimina la sesión
localStorage.removeItem("usuarioActivo");
