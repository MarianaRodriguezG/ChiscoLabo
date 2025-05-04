export const PersonalModel = {
    STORAGE_KEY: 'personal',
  
    getAll() {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    },
  
    saveAll(lista) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
    },
  
    add(nuevo) {
      const rolesPermitidos = ['admin', 'docente', 'laboratorista', 'tecnico'];
      if (!rolesPermitidos.includes(nuevo.rol)) {
        alert('Rol inválido');
        return;
      }
  
      const lista = this.getAll();
      nuevo.id = Date.now();
      nuevo.activo = true;
  
      const persona = {
        nombre: nuevo.nombre || '',
        correo: nuevo.correo,
        password: nuevo.password,
        rol: nuevo.rol,
        id: nuevo.id,
        activo: nuevo.activo
      };
  
      lista.push(persona);
      this.saveAll(lista);
    },
  
    update(correo, datosActualizados) {
      const lista = this.getAll().map(item =>
        item.correo === correo ? { ...item, ...datosActualizados } : item
      );
      this.saveAll(lista);
    },
  
    delete(correo) {
      const lista = this.getAll().map(item =>
        item.correo === correo ? { ...item, activo: false } : item
      );
      this.saveAll(lista);
    },
  
    activate(correo) {
      const lista = this.getAll().map(item =>
        item.correo === correo ? { ...item, activo: true } : item
      );
      this.saveAll(lista);
    },
  
    getByCorreo(correo) {
      return this.getAll().find(item => item.correo === correo);
    }
  };
  