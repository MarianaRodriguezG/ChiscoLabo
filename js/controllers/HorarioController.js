import { HorarioModel } from '../models/HorarioModel.js';
import { HorarioView } from '../views/HorarioView.js';

let calendar = null;

function inicializarCalendario() {
  const calendarEl = document.getElementById('calendar');

  calendar = new FullCalendar.Calendar(calendarEl, {
    height: 'auto',
    initialView: 'timeGridWeek',
    slotMinTime: "07:00:00",
    slotMaxTime: "20:00:00",
    slotDuration: "01:00:00",
    editable: false,
    selectable: true,
    locale: 'es',
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "timeGridWeek,timeGridDay"
    },
    events: HorarioModel.getAll().map(ev => ({
      title: `${ev.materia} - ${ev.profesor}`,
      start: `${ev.fecha}T${ev.horaInicio}`,
      end: `${ev.fecha}T${ev.horaFin}`,
      extendedProps: {
        materia: ev.materia,
        profesor: ev.profesor,
        participantes: ev.participantes
      }
    })),
    select: HorarioView.mostrarFormulario
  });

  calendar.render();
}

function agregarEvento(evento) {
  const eventos = HorarioModel.getAll();

  // Validar duplicidad de horario para mismo profesor y fecha/hora
  const conflicto = eventos.some(ev =>
    ev.fecha === evento.fecha &&
    ev.horaInicio === evento.horaInicio &&
    ev.profesor === evento.profesor
  );

  if (conflicto) {
    HorarioView.mostrarAlerta("Este profesor ya tiene una materia asignada en esa hora.");
    return;
  }

  // Guardar y agregar visualmente
  HorarioModel.add(evento);
  calendar.addEvent({
    title: `${evento.materia} - ${evento.profesor}`,
    start: `${evento.fecha}T${evento.horaInicio}`,
    end: `${evento.fecha}T${evento.horaFin}`,
    extendedProps: {
      materia: evento.materia,
      profesor: evento.profesor,
      participantes: evento.participantes
    }
  });
}

function exportarPDF() {
  const eventos = HorarioModel.getAll();
  if (eventos.length === 0) {
    HorarioView.mostrarAlerta("No hay reservas para exportar.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(16);
  doc.text("Reporte de Reservas", 10, 10);

  eventos.forEach(ev => {
    const hora = `${ev.horaInicio} - ${ev.horaFin}`;
    const participantes = ev.participantes?.join(', ') || "Ninguno";

    doc.setFontSize(12);
    doc.text(`📅 Fecha: ${ev.fecha}`, 10, y); y += 6;
    doc.text(`🕒 Horario: ${hora}`, 10, y); y += 6;
    doc.text(`📘 Materia: ${ev.materia}`, 10, y); y += 6;
    doc.text(`👤 Profesor: ${ev.profesor}`, 10, y); y += 6;
    doc.text(`👥 Participantes: ${participantes}`, 10, y); y += 10;

    if (y > 270) { doc.addPage(); y = 20; }
  });

  doc.save("reservas.pdf");
}

document.addEventListener('DOMContentLoaded', () => {
  inicializarCalendario();
  HorarioView.init({ agregarEvento, exportarPDF });
});
