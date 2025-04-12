// js/models/PersonalModel.js

export const PersonalModel = {
    STORAGE_KEY: 'personal',

    getAll() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    },

    saveAll(lista) {
        console.log("💾 Guardando en localStorage:", lista); // Agregado
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
    },

    add(nuevo) {
        const lista = this.getAll();
        nuevo.id = Date.now(); // ID único
        nuevo.activo = true;
        lista.push(nuevo);
        this.saveAll(lista);
    },

    update(id, datosActualizados) {
        const lista = this.getAll().map(item =>
            item.id === id ? { ...item, ...datosActualizados } : item
        );
        this.saveAll(lista);
    },

    delete(id) {
        const lista = this.getAll().map(item =>
            item.id === id ? { ...item, activo: false } : item
        );
        this.saveAll(lista);
    },

    activate(id) {
        const lista = this.getAll().map(item =>
            item.id === id ? { ...item, activo: true } : item
        );
        this.saveAll(lista);
    },

    getById(id) {
        return this.getAll().find(item => item.id === id);
    },
    

};
