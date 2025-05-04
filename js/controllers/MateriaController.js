// js/controllers/MateriaController.js
import { MateriaModel } from '../models/MateriaModel.js';
import { PersonalModel } from '../models/PersonalModel.js';
import { MateriaView } from '../views/MateriaView.js';

const MateriaController = {
  init() {
    MateriaView.init(this);
    this.renderizar();
  },

  agregarMateria(data) {
    const docente = PersonalModel.getByCorreo(data.docenteCorreo);
    if (!docente || docente.rol !== 'docente') {
      alert('El correo ingresado no pertenece a un docente válido.');
      return;
    }

    const nuevaMateria = {
      ...data,
      id: Date.now(),
      docenteNombre: docente.nombre,
    };

    MateriaModel.add(nuevaMateria);
    this.renderizar();
  },

  eliminarMateria(id) {
    MateriaModel.delete(id);
    this.renderizar();
  },

  renderizar() {
    const lista = MateriaModel.getAll();
    MateriaView.renderizarTabla(lista);
  }
};

document.addEventListener('DOMContentLoaded', () => MateriaController.init());
