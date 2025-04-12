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
      lista.push(usuario);
      this.saveAll(lista);
    },
  
    findByCorreo(correo) {
      return this.getAll().find(u => u.correo === correo);
    },
  
    validarCredenciales(correo, password) {
      return this.getAll().find(u => u.correo === correo && u.password === password);
    }
  };
  