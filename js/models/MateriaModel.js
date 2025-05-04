export const MateriaModel = {
    STORAGE_KEY: 'materias',
  
    getAll() {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    },
  
    saveAll(lista) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
    },
  
    add(materia) {
      const lista = this.getAll();
      materia.id = Date.now();
      lista.push(materia);
      this.saveAll(lista);
    },
  
    delete(id) {
      const lista = this.getAll().filter(m => m.id !== id);
      this.saveAll(lista);
    },
  
    findByClave(clave) {
      return this.getAll().find(m => m.clave === clave);
    }
  };
  