// js/views/HorarioView.js
export const HorarioView = {
    init(materias, docentes) {
      const materiaSelect = document.getElementById("materiaSelect");
      const docenteSelect = document.getElementById("docenteSelect");
  
      materias.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m.nombre;
        opt.textContent = `${m.nombre} (${m.clave})`;
        materiaSelect.appendChild(opt);
      });
  
      docentes.forEach(d => {
        const opt = document.createElement("option");
        opt.value = d.correo;
        opt.textContent = `${d.nombre} (${d.correo})`;
        docenteSelect.appendChild(opt);
      });
    },
  
    mostrarAlerta(mensaje) {
      document.getElementById("modalAlertaMensaje").innerText = mensaje;
      new bootstrap.Modal(document.getElementById("modalAlerta")).show();
    }
  };
  