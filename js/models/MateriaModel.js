import { PersonalModel } from './PersonalModel.js';

export const MateriaModel = {
  STORAGE_KEY: 'materias',

  getAll() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
  },

  saveAll(lista) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
  },

  add(materia) {
    const hora = materia.hora;
    if (hora < '07:00' || hora > '19:00') {
      alert('La hora debe estar entre las 7:00 a.m. y las 7:00 p.m.');
      return;
    }

    // Buscar nombre del docente en el modelo Personal
    const docente = PersonalModel.getByCorreo(materia.docenteCorreo);
    if (!docente || docente.rol !== 'docente') {
      alert('Correo no válido o el usuario no es docente.');
      return;
    }

    const lista = this.getAll();

    const nuevaMateria = {
      id: Date.now(),
      nombre: materia.nombre,
      clave: materia.clave,
      docenteCorreo: materia.docenteCorreo,
      docenteNombre: docente.nombre,
      hora: materia.hora,
    };

    lista.push(nuevaMateria);
    this.saveAll(lista);
  },

  delete(id) {
    const lista = this.getAll().filter(m => m.id !== id);
    this.saveAll(lista);
  }
};
