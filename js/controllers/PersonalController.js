import { PersonalModel } from '../models/PersonalModel.js';
import { PersonalView } from '../views/PersonalView.js';

const PersonalController = {
  init() {
    console.log("✅ PersonalController iniciado");
    PersonalView.init(this);
    this.actualizarVista();
  },

  actualizarVista() {
    const lista = PersonalModel.getAll();
    PersonalView.renderizarTabla(lista, this);
  },

  agregarPersonal(datos) {
    console.log("👤 Agregando personal:", datos); // Agregado
    PersonalModel.add(datos);
    this.actualizarVista();
  },
  

  editarPersonal(id) {
    const persona = PersonalModel.getById(id);
    if (persona) {
      PersonalView.cargarEnFormulario(persona);
    }
  },

  actualizarPersonal(id, datos) {
    PersonalModel.update(id, datos);
    this.actualizarVista();
  },

  darDeBaja(id) {
    if (confirm('¿Seguro que deseas dar de baja a esta persona?')) {
      PersonalModel.delete(id);
      this.actualizarVista();
    }
  },

  darDeAlta(id) {
    PersonalModel.activate(id);
    this.actualizarVista();
  }
};

// Esperar que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  PersonalController.init();
});
