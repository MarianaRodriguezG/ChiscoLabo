import { PersonalModel } from '../models/PersonalModel.js';
import { PersonalView } from '../views/PersonalView.js';

const PersonalController = {
  init() {
    PersonalView.init(this);
    this.actualizarVista();
  },

  actualizarVista() {
    const lista = PersonalModel.getAll();
    PersonalView.renderizarTabla(lista, this);
  },

  agregarPersonal(datos) {
    PersonalModel.add(datos);
    this.actualizarVista();
  },

  editarPersonal(correo) {
    const persona = PersonalModel.getByCorreo(correo);
    if (persona) {
      PersonalView.cargarEnFormulario(persona);
    }
  },

  actualizarPersonal(correo, nuevosDatos) {
    PersonalModel.update(correo, nuevosDatos);
    this.actualizarVista();
  },

  darDeBaja(correo) {
    if (confirm('¿Deseas dar de baja a esta persona?')) {
      PersonalModel.delete(correo);
      this.actualizarVista();
    }
  },

  darDeAlta(correo) {
    PersonalModel.activate(correo);
    this.actualizarVista();
  }
};

PersonalController.init();
