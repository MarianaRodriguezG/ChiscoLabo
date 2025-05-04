export function protegerVista(rolRequerido) {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  // Si no hay sesión o el rol no coincide, redirigir al login
  if (!usuario || usuario.rol !== rolRequerido) {
    window.location.href = "../../../login.html";
  }
}

// (Opcional) Redirección automática desde login si ya hay sesión
export function redirigirSiSesionActiva() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (usuario) {
    if (usuario.rol === "admin") {
      window.location.href = "./js/views/admin/dashboard.html";
    } else {
      window.location.href = "./js/views/alumno/dashboard.html";
    }
  }
}

