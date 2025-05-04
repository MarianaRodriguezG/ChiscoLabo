export const UsuarioModel = {
  STORAGE_KEY: 'usuarios',

  getAll() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
  },

  saveAll(lista) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
  },

  add(usuario) {
    const lista = this.getAll();

    // Asignar ID, rol y estado
    usuario.id = Date.now();
    usuario.rol = 'alumno';
    usuario.activo = true;

    // Asegurar que tenga todos los campos del alumno
    usuario = {
      nombres: usuario.nombres || '',
      apellidoPaterno: usuario.apellidoPaterno || '',
      apellidoMaterno: usuario.apellidoMaterno || '',
      numeroControl: usuario.numeroControl || '',
      correo: usuario.correo,
      password: usuario.password,
      rol: usuario.rol,
      activo: usuario.activo,
      id: usuario.id
    };

    lista.push(usuario);
    this.saveAll(lista);
  },

  update(correo, nuevosDatos) {
    const lista = this.getAll().map(u =>
      u.correo === correo ? { ...u, ...nuevosDatos } : u
    );
    this.saveAll(lista);
  },

  findByCorreo(correo) {
    return this.getAll().find(u => u.correo === correo);
  },

  validarCredenciales(correo, password) {
    return this.getAll().find(u => u.correo === correo && u.password === password);
  }
};
