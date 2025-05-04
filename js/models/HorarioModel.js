// js/models/HorarioModel.js

export const HorarioModel = {
    STORAGE_KEY: 'reservas',
  
    obtenerTodos() {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    }
  };
  