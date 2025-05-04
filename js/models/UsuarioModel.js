// js/models/UsuarioModel.js
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
    usuario.id = Date.now();
    usuario.activo = true;
    this.saveAll([...lista, usuario]);
  },

  findByCorreo(correo) {
    return this.getAll().find(u => u.correo === correo);
  },

  validarCredenciales(correo, password) {
    return this.getAll().find(u => u.correo === correo && u.password === password);
  },

  getById(id) {
    return this.getAll().find(u => u.id === id);
  },

  update(id, datosActualizados) {
    const lista = this.getAll().map(u =>
      u.id === id ? { ...u, ...datosActualizados } : u
    );
    this.saveAll(lista);
  },

  updateRol(id, nuevoRol) {
    const lista = this.getAll().map(u =>
      u.id === id ? { ...u, rol: nuevoRol } : u
    );
    this.saveAll(lista);
  },

  toggleActivo(id) {
    const lista = this.getAll().map(u =>
      u.id === id ? { ...u, activo: !u.activo } : u
    );
    this.saveAll(lista);
  },

  update(correo, nuevosDatos) {
    const lista = this.getAll().map(u =>
      u.correo === correo ? { ...u, ...nuevosDatos } : u
    );
    this.saveAll(lista);
  }
  
};
