export const HorarioModel = {
    STORAGE_KEY: 'reservas',
  
    guardarReserva(evento) {
      const reservas = this.getAll();
      reservas.push(evento);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reservas));
    },
  
    getAll() {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    },
  
    eliminarReserva(id) {
      const reservas = this.getAll().filter(ev => ev.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reservas));
    },
  
    generarId() {
      return Date.now();
    },
  
    existeConflicto(nuevaReserva, ignorarId = null) {
      const nuevasFechaInicio = new Date(nuevaReserva.start);
      const nuevasFechaFin = new Date(nuevaReserva.end);
  
      return this.getAll().some(ev => {
        if (ignorarId && ev.id === ignorarId) return false;
        const existenteInicio = new Date(ev.start);
        const existenteFin = new Date(ev.end);
  
        return nuevasFechaInicio < existenteFin && nuevasFechaFin > existenteInicio;
      });
    }
  };
  