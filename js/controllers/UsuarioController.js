// js/controllers/UsuarioController.js

import { UsuarioModel } from '../models/UsuarioModel.js';
import { UsuarioView } from '../views/UsuarioView.js';

const UsuarioController = {
  init() {
    UsuarioView.init(this); // Conecta la vista con el controlador
    this.actualizarVista();
  },

  actualizarVista() {
    // Solo mostrar usuarios con rol "alumno"
    const lista = UsuarioModel.getAll().filter(u => u.rol === 'alumno');
    UsuarioView.renderizarTabla(lista, this);
  },

  agregarUsuario(datos) {
    const nuevo = {
      ...datos,
      rol: 'alumno', // 🔒 Siempre se registra como alumno
      activo: true
    };
    UsuarioModel.add(nuevo);
    this.actualizarVista();
  },

  editarUsuario(correo) {
    const usuario = UsuarioModel.findByCorreo(correo);
    if (usuario && usuario.rol === 'alumno') {
      UsuarioView.cargarEnFormulario(usuario);
    }
  },

  actualizarUsuario(correo, nuevosDatos) {
    UsuarioModel.update(correo, { ...nuevosDatos, rol: 'alumno' });
    this.actualizarVista();
  },

  darDeBaja(correo) {
    const usuario = UsuarioModel.findByCorreo(correo);
    if (usuario && usuario.rol === 'alumno') {
      usuario.activo = false;
      UsuarioModel.update(correo, usuario);
      this.actualizarVista();
    }
  },

  darDeAlta(correo) {
    const usuario = UsuarioModel.findByCorreo(correo);
    if (usuario && usuario.rol === 'alumno') {
      usuario.activo = true;
      UsuarioModel.update(correo, usuario);
      this.actualizarVista();
    }
  }
};

UsuarioController.init();
