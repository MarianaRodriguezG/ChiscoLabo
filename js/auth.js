// js/auth.js
export function protegerVista(rolRequerido, redir = '../../login.html') {
    const user = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (!user || user.rol !== rolRequerido) {
      alert('Acceso denegado');
      window.location.href = redir;
    }
  }
  