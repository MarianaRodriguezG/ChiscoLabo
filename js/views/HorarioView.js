import { MateriaModel } from '../models/MateriaModel.js';
import { PersonalModel } from '../models/PersonalModel.js';

export const HorarioView = {
  init(controller) {
    this.controller = controller;
    this.asignarEventos();
    this.cargarMateriasYDocentes();
  },

  asignarEventos() {
    document.getElementById("formEvento").addEventListener("submit", e => {
      e.preventDefault();
      const fecha = this.fechaSeleccionada;
      const materia = document.getElementById("materia").value;
      const profesor = document.getElementById("docente").value;
      const horaInicio = document.getElementById("horaInicio").value;
      const horaFin = document.getElementById("horaFin").value;
      const participantes = ["persona1","persona2","persona3","persona4"].map(id => document.getElementById(id).value.trim()).filter(Boolean);

      this.controller.agregarEvento({
        fecha,
        materia,
        profesor,
        horaInicio,
        horaFin,
        participantes
      });

      bootstrap.Modal.getInstance(document.getElementById("modalEvento")).hide();
    });

    document.getElementById("btnPDF").addEventListener("click", () => {
      this.controller.exportarPDF();
    });
  },

  cargarMateriasYDocentes() {
    // Materias
    const selectMateria = document.getElementById("materia");
    const materias = MateriaModel.getAll();
    selectMateria.innerHTML = '<option value="">Seleccionar materia...</option>';
    materias.forEach(m => {
      const option = document.createElement("option");
      option.value = m.nombre;
      option.textContent = m.nombre;
      selectMateria.appendChild(option);
    });

    // Docentes
    const selectDocente = document.getElementById("docente");
    const docentes = PersonalModel.getAll().filter(p => p.rol === 'docente');
    selectDocente.innerHTML = '<option value="">Seleccionar docente...</option>';
    docentes.forEach(d => {
      const option = document.createElement("option");
      option.value = d.correo;
      option.textContent = d.nombre;
      selectDocente.appendChild(option);
    });
  },

  mostrarFormulario(info) {
    const fecha = info.startStr.split("T")[0];
    const horaInicio = info.startStr.substring(11,16);
    const horaFin = info.endStr.substring(11,16);

    HorarioView.fechaSeleccionada = fecha;

    document.getElementById("materia").value = "";
    document.getElementById("docente").value = "";
    ["persona1", "persona2", "persona3", "persona4"].forEach(id => document.getElementById(id).value = "");
    document.getElementById("horaInicio").value = horaInicio;
    document.getElementById("horaFin").value = horaFin;

    new bootstrap.Modal(document.getElementById("modalEvento")).show();
  },

  mostrarAlerta(mensaje) {
    alert(mensaje);
  }
};
