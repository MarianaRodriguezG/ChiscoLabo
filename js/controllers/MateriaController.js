import { MateriaModel } from '../models/MateriaModel.js';
import { MateriaView } from '../views/MateriaView.js';
import { PersonalModel } from '../models/PersonalModel.js';

const MateriaController = {
  init() {
    MateriaView.init(this);
    this.actualizarVista();
  },

  actualizarVista() {
    const materias = MateriaModel.getAll();
    MateriaView.renderizarTabla(materias);
  },

  agregarMateria(datos) {
    const docente = PersonalModel.getAll().find(p => 
      p.correo === datos.docenteCorreo && 
      p.activo && 
      (p.rol === "docente" || p.rol === "admin") // Permitir docentes/admin-docentes
    );

    if (!docente) {
      alert("El correo no corresponde a un docente activo.");
      return;
    }

    // Validar que no tenga ya una materia a la misma hora
    const conflicto = MateriaModel.getAll().some(m =>
      m.docenteCorreo === datos.docenteCorreo && m.hora === datos.hora
    );

    if (conflicto) {
      alert("Este docente ya tiene asignada una materia a esa hora.");
      return;
    }

    // Agregar nombre completo del docente
    datos.docenteNombre = docente.nombre;
    MateriaModel.add(datos);
    this.actualizarVista();
  },

  eliminarMateria(id) {
    MateriaModel.delete(id);
    this.actualizarVista();
  }
};
document.addEventListener("DOMContentLoaded", () => {
    const btnExcel = document.getElementById("btnExportarExcel");
    const btnPDF = document.getElementById("btnExportarPDF");
  
    if (btnExcel) {
      btnExcel.addEventListener("click", () => {
        const materias = MateriaModel.getAll();
        const encabezados = "Nombre,Clave,Docente,Hora\n";
        const csv = materias.map(m => `${m.nombre},${m.clave},${m.docenteNombre || m.docenteCorreo},${m.hora}`).join("\n");
        const blob = new Blob([encabezados + csv], { type: 'text/csv' });
  
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "materias.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  
    if (btnPDF) {
      btnPDF.addEventListener("click", () => {
        const materias = MateriaModel.getAll();
        const ventana = window.open('', '_blank');
        ventana.document.write('<h2>Materias Registradas</h2>');
        ventana.document.write('<table border="1" cellpadding="5"><tr><th>Nombre</th><th>Clave</th><th>Docente</th><th>Hora</th></tr>');
        materias.forEach(m => {
          ventana.document.write(`<tr><td>${m.nombre}</td><td>${m.clave}</td><td>${m.docenteNombre || m.docenteCorreo}</td><td>${m.hora}</td></tr>`);
        });
        ventana.document.write('</table>');
        ventana.document.close();
        ventana.print();
      });
    }
  });
  
MateriaController.init();
