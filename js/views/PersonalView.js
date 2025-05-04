export const PersonalView = {
  form: document.getElementById('formPersonal'),
  tabla: document.querySelector('#tablaPersonal tbody'),
  filtro: document.getElementById('filtroEstado'),
  inputs: {
    nombre: document.getElementById('nombre'),
    correo: document.getElementById('correo'),
    password: document.getElementById('password'),
    rol: document.getElementById('rol'),
  },
  modoEdicion: false,
  correoEnEdicion: null,

  init(controller) {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      const datos = this.obtenerDatosFormulario();
      if (!datos) return;

      if (this.modoEdicion) {
        controller.actualizarPersonal(this.correoEnEdicion, datos);
        this.salirModoEdicion();
      } else {
        controller.agregarPersonal(datos);
      }
      this.form.reset();
    });

    this.filtro.addEventListener('change', () => {
      controller.actualizarVista();
    });
  },

  obtenerDatosFormulario() {
    const datos = {
      nombre: this.inputs.nombre.value.trim(),
      correo: this.inputs.correo.value.trim(),
      password: this.inputs.password.value.trim(),
      rol: this.inputs.rol.value,
    };

    if (!datos.nombre || !datos.correo || !datos.password || !datos.rol) {
      alert('Por favor completa todos los campos.');
      return null;
    }

    return datos;
  },

  cargarEnFormulario(personal) {
    this.inputs.nombre.value = personal.nombre || '';
    this.inputs.correo.value = personal.correo || '';
    this.inputs.password.value = personal.password || '';
    this.inputs.rol.value = personal.rol || '';
    this.modoEdicion = true;
    this.correoEnEdicion = personal.correo;
  },

  salirModoEdicion() {
    this.modoEdicion = false;
    this.correoEnEdicion = null;
    this.form.reset();
  },

  renderizarTabla(lista, controller) {
    this.tabla.innerHTML = '';

    const estado = this.filtro.value;
    const filtrado = lista.filter(p => {
      if (estado === 'activos') return p.activo !== false;
      if (estado === 'inactivos') return p.activo === false;
      return true;
    });

    filtrado.forEach((p, index) => {
      const fila = document.createElement('tr');
      if (!p.activo) fila.classList.add('table-danger');

      fila.innerHTML = `
        <td>${index + 1}</td>
        <td>${p.nombre}</td>
        <td>${p.correo}</td>
        <td>${p.rol}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1" data-correo="${p.correo}" data-action="editar">✏️</button>
          ${p.activo
            ? `<button class="btn btn-sm btn-danger" data-correo="${p.correo}" data-action="baja">🗑️</button>`
            : `<button class="btn btn-sm btn-success" data-correo="${p.correo}" data-action="alta">✅</button>`
          }
        </td>
      `;

      this.tabla.appendChild(fila);
    });

    this.tabla.querySelectorAll('button').forEach(btn => {
      const correo = btn.dataset.correo;
      const accion = btn.dataset.action;
      btn.addEventListener('click', () => {
        if (accion === 'editar') controller.editarPersonal(correo);
        if (accion === 'baja') controller.darDeBaja(correo);
        if (accion === 'alta') controller.darDeAlta(correo);
      });
    });
  }
};
