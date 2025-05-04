// js/controllers/HorarioController.js

import { HorarioModel } from '../models/HorarioModel.js';

document.addEventListener("DOMContentLoaded", () => {
  const calendarEl = document.getElementById("calendar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridWeek',
    slotMinTime: "07:00:00",
    slotMaxTime: "19:00:00",
    locale: "es",
    selectable: false,
    editable: false,
    height: "auto",
    events: HorarioModel.obtenerTodos().map(ev => ({
      title: `${ev.materia} - ${ev.profesor}`,
      start: ev.inicio,
      end: ev.fin,
    }))
  });

  calendar.render();

  // Generar PDF
  document.getElementById("btnPDF").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const eventos = HorarioModel.obtenerTodos();
    let y = 20;

    doc.text("📅 Reporte de Reservas", 10, 10);
    eventos.forEach(ev => {
      const inicio = new Date(ev.inicio);
      const fin = new Date(ev.fin);
      doc.text(`Materia: ${ev.materia}`, 10, y); y += 6;
      doc.text(`Profesor: ${ev.profesor}`, 10, y); y += 6;
      doc.text(`Horario: ${inicio.toLocaleString()} - ${fin.toLocaleTimeString()}`, 10, y); y += 10;
      if (y > 270) { doc.addPage(); y = 20; }
    });

    doc.save("reservas.pdf");
  });
});
