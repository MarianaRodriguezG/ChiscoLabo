// js/controllers/LoginController.js
import { UsuarioModel } from '../models/UsuarioModel.js';
import { LoginView } from '../views/LoginView.js';

const LoginController = {
  init() {
    LoginView.init(this);
  },

  login(correo, password) {
    const usuario = UsuarioModel.validarCredenciales(correo, password);
    if (usuario) {
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      LoginView.mostrarMensaje("Inicio de sesión exitoso.", "success");

      setTimeout(() => {
        if (usuario.rol === "admin") {
          window.location.href = "../js/views/admin/dashboard.html";
        } else {
          window.location.href = "../js/views/alumno/dashboard.html";
        }
      }, 1000);
    } else {
      LoginView.mostrarMensaje("Correo o contraseña incorrectos.", "danger");
    }
  },

  registrar({ correo, password, rol }) {
    if (UsuarioModel.findByCorreo(correo)) {
      LoginView.mostrarMensaje("Este correo ya está registrado.", "warning");
      return;
    }
    UsuarioModel.add({ correo, password, rol });
    LoginView.mostrarMensaje("Registro exitoso. Puedes iniciar sesión.", "success");
    LoginView.limpiarFormularioRegistro();
  }
};

LoginController.init();
