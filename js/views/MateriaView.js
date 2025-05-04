// js/views/MateriaView.js
export const MateriaView = {
    form: document.getElementById('formMateria'),
    tabla: document.querySelector('#tablaMaterias tbody'),
    inputs: {
      nombre: document.getElementById('nombreMateria'),
      clave: document.getElementById('claveMateria'),
      hora: document.getElementById('horaMateria'),
      docenteCorreo: document.getElementById('docenteCorreo'),
    },
  
    init(controller) {
      this.form.addEventListener('submit', e => {
        e.preventDefault();
        const datos = this.obtenerDatosFormulario();
        controller.agregarMateria(datos);
        this.form.reset();
      });
    },
  
    obtenerDatosFormulario() {
      return {
        nombre: this.inputs.nombre.value.trim(),
        clave: this.inputs.clave.value.trim(),
        hora: this.inputs.hora.value,
        docenteCorreo: this.inputs.docenteCorreo.value.trim(),
      };
    },
  
    renderizarTabla(lista) {
      this.tabla.innerHTML = '';
      lista.forEach((materia, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${index + 1}</td>
          <td>${materia.nombre}</td>
          <td>${materia.clave}</td>
          <td>${materia.docenteNombre || materia.docenteCorreo}</td>
          <td>${materia.hora}</td>
          <td>
            <button class="btn btn-danger btn-sm" data-id="${materia.id}">🗑️</button>
          </td>
        `;
        this.tabla.appendChild(fila);
      });
  
      this.tabla.querySelectorAll('button').forEach(btn => {
        const id = parseInt(btn.dataset.id);
        btn.addEventListener('click', () => {
          if (confirm('¿Deseas eliminar esta materia?')) {
            controller.eliminarMateria(id);
          }
        });
      });
    }
  };
  