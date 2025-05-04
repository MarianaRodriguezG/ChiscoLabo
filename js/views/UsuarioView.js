export const UsuarioView = {
    form: document.getElementById('formUsuario'),
    tabla: document.querySelector('#tablaUsuarios tbody'),
    inputs: {
      nombres: document.getElementById('nombres'),
      apellidoPaterno: document.getElementById('apellidoPaterno'),
      apellidoMaterno: document.getElementById('apellidoMaterno'),
      numeroControl: document.getElementById('numeroControl'),
      correo: document.getElementById('correo'),
      password: document.getElementById('password'),
    },
    modoEdicion: false,
    correoEnEdicion: null,
  
    init(controller) {
      this.form.addEventListener('submit', e => {
        e.preventDefault();
        const datos = this.obtenerDatosFormulario();
  
        if (!datos) return;
  
        if (this.modoEdicion) {
          controller.actualizarUsuario(this.correoEnEdicion, datos);
          this.salirModoEdicion();
        } else {
          controller.agregarUsuario(datos);
        }
        this.form.reset();
      });
    },
  
    obtenerDatosFormulario() {
      const datos = {
        nombres: this.inputs.nombres.value.trim(),
        apellidoPaterno: this.inputs.apellidoPaterno.value.trim(),
        apellidoMaterno: this.inputs.apellidoMaterno.value.trim(),
        numeroControl: this.inputs.numeroControl.value.trim(),
        correo: this.inputs.correo.value.trim(),
        password: this.inputs.password.value.trim(),
      };
  
      // Validación básica
      if (!datos.nombres || !datos.apellidoPaterno || !datos.numeroControl || !datos.correo || !datos.password) {
        alert("Todos los campos obligatorios deben estar completos.");
        return null;
      }
  
      return datos;
    },
  
    cargarEnFormulario(usuario) {
      this.inputs.nombres.value = usuario.nombres || '';
      this.inputs.apellidoPaterno.value = usuario.apellidoPaterno || '';
      this.inputs.apellidoMaterno.value = usuario.apellidoMaterno || '';
      this.inputs.numeroControl.value = usuario.numeroControl || '';
      this.inputs.correo.value = usuario.correo || '';
      this.inputs.password.value = usuario.password || '';
      this.modoEdicion = true;
      this.correoEnEdicion = usuario.correo;
    },
  
    salirModoEdicion() {
      this.modoEdicion = false;
      this.correoEnEdicion = null;
      this.form.reset();
    },
  
    renderizarTabla(lista, controller) {
      this.tabla.innerHTML = '';
      lista.forEach((usuario, index) => {
        const fila = document.createElement('tr');
        if (!usuario.activo) fila.classList.add('table-danger');
  
        const nombreCompleto = `${usuario.nombres} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`;
  
        fila.innerHTML = `
          <td>${index + 1}</td>
          <td>${nombreCompleto}</td>
          <td>${usuario.numeroControl}</td>
          <td>${usuario.correo}</td>
          <td>${usuario.activo ? 'Activo' : 'Inactivo'}</td>
          <td>
            <button class="btn btn-sm btn-warning me-1" data-correo="${usuario.correo}" data-action="editar">✏️</button>
            ${usuario.activo
              ? `<button class="btn btn-sm btn-danger" data-correo="${usuario.correo}" data-action="baja">🗑️</button>`
              : `<button class="btn btn-sm btn-success" data-correo="${usuario.correo}" data-action="alta">✅</button>`
            }
          </td>
        `;
        this.tabla.appendChild(fila);
      });
  
      this.tabla.querySelectorAll('button').forEach(btn => {
        const correo = btn.dataset.correo;
        const accion = btn.dataset.action;
        btn.addEventListener('click', () => {
          if (accion === 'editar') controller.editarUsuario(correo);
          if (accion === 'baja') controller.darDeBaja(correo);
          if (accion === 'alta') controller.darDeAlta(correo);
        });
      });
    }
  };
  