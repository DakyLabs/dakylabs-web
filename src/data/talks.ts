// src/data/talks.ts
// Agrega aquí cada charla que des. El más reciente primero.

export interface Talk {
  title: string;       // Título de tu charla
  event: string;       // Nombre del evento (aparece como badge)
  date: string;        // Fecha legible, ej: "25 de abril, 2026"
  location: string;    // Ciudad, País
  youtube: string;     // ID del video de YouTube (lo que va después de ?v=)
  url: string;         // URL completa del video
}

export const talks: Talk[] = [
  {
    title: "Cuando el paquete ataca (modo instld)",
    event: "PWNORDIE 2025",
    date: "2025",
    location: "Ecuador",
    youtube: "no_SaMiDL1o",
    url: "https://www.youtube.com/watch?v=no_SaMiDL1o",
  },
];
