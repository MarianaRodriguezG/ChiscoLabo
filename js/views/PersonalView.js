// js/views/PersonalView.js

export const PersonalView = {
    form: document.getElementById('formPersonal'),
    tabla: document.querySelector('#tablaPersonal tbody'),
    inputs: {
      nombre: document.getElementById('nombre'),
      correo: document.getElementById('correo'),
      puesto: document.getElementById('puesto'),
      filtro: 'todos',
    },
    modoEdicion: false,
    idEnEdicion: null,
  
    init(controller) {
      this.form.addEventListener('submit', e => {
        e.preventDefault();
        const datos = this.obtenerDatosFormulario();
        if (this.modoEdicion) {
          controller.actualizarPersonal(this.idEnEdicion, datos);
          this.salirModoEdicion();
        } else {
          controller.agregarPersonal(datos);
        }
        this.form.reset();
      });
    
      // Evento de cambio en el filtro
      document.getElementById('filtroEstado').addEventListener('change', e => {
        this.filtro = e.target.value;
        controller.actualizarVista(); // Se vuelve a renderizar con filtro aplicado
      });
    },
    
  
    obtenerDatosFormulario() {
      return {
        nombre: this.inputs.nombre.value,
        correo: this.inputs.correo.value,
        puesto: this.inputs.puesto.value,
      };
    },
  
    cargarEnFormulario(personal) {
      this.inputs.nombre.value = personal.nombre;
      this.inputs.correo.value = personal.correo;
      this.inputs.puesto.value = personal.puesto;
      this.modoEdicion = true;
      this.idEnEdicion = personal.id;
    },
  
    salirModoEdicion() {
      this.modoEdicion = false;
      this.idEnEdicion = null;
      this.form.reset();
    },
  
    renderizarTabla(lista, controller) {
      this.tabla.innerHTML = '';
    
      // Aplicar filtro antes de renderizar
      const filtrados = lista.filter(item => {
        if (this.filtro === 'activos') return item.activo;
        if (this.filtro === 'inactivos') return !item.activo;
        return true;
      });
    
      filtrados.forEach((item, index) => {
        const fila = document.createElement('tr');
        if (!item.activo) fila.classList.add('table-danger');
    
        fila.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.nombre}</td>
          <td>${item.correo}</td>
          <td>${item.puesto}</td>
          <td>
            <button class="btn btn-sm btn-warning me-1" data-id="${item.id}" data-action="editar" ${!item.activo ? 'disabled' : ''}>✏️</button>
            ${item.activo
              ? `<button class="btn btn-sm btn-danger" data-id="${item.id}" data-action="baja">🗑️</button>`
              : `<button class="btn btn-sm btn-success" data-id="${item.id}" data-action="alta">✅</button>`
            }
          </td>
        `;
        this.tabla.appendChild(fila);
      });
    
      this.tabla.querySelectorAll('button').forEach(btn => {
        const id = Number(btn.dataset.id);
        const accion = btn.dataset.action;
    
        btn.addEventListener('click', () => {
          if (accion === 'editar') controller.editarPersonal(id);
          if (accion === 'baja') controller.darDeBaja(id);
          if (accion === 'alta') controller.darDeAlta(id);
        });
      });
    }
    
    
  };
  