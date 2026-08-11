// src/data/evento.ts
// ═══════════════════════════════════════════════════════════════
//  PRÓXIMO EVENTO  —  edita SOLO este archivo.
//  Se muestra automáticamente en: el inicio, /eventos y el anuncio lateral.
//  ¿No hay evento próximo?  Pon  activo: false  y desaparece de todo el sitio.
//  ¿Cambias la imagen?  Avísame para generar sus versiones .webp/.avif.
// ═══════════════════════════════════════════════════════════════

export interface EventoExtra {
  label: string; // etiqueta en negrita (ej: "Demo en vivo")
  texto: string; // descripción
}

export interface Evento {
  activo: boolean;        // true = se muestra · false = se oculta en todo el sitio
  comunidad: string;      // organizador / comunidad (aparece como etiqueta)
  titulo: string;         // título de la charla
  fecha: string;          // ej: "Jueves 13 de agosto"
  hora: string;           // ej: "7:30 PM"
  modalidad: string;      // ej: "En vivo (online)"  o el lugar físico
  descripcion: string;    // una frase de qué trata
  extras: EventoExtra[];  // viñetas (demo, debate, etc.) — deja [] si no hay
  headingLanding: string; // título de la sección en el INICIO
  headingEventos: string; // título de la sección en /EVENTOS
  imagen: string;         // ruta del arte en /public
  ancho: number;          // ancho real del arte en px
  alto: number;           // alto real del arte en px
  ctaTexto: string;       // texto del botón
  ctaUrl: string;         // link del botón (grupo, registro, etc.)
  ctaNota: string;        // nota bajo el botón
  anuncioTexto: string;   // texto del anuncio lateral en el inicio
}

export const evento: Evento = {
  activo: true,
  comunidad: "Comunidad JS Ecuador · Hablemos de IA",
  titulo: "Desconectados e inteligentes: IA local a prueba",
  fecha: "Jueves 13 de agosto",
  hora: "7:30 PM",
  modalidad: "En vivo (LOCAL ONLY)",
  descripcion: "Charla por Santino Suntaxi sobre correr IA sin depender de la nube.",
  extras: [
    { label: "Demo en vivo", texto: "cómo correr modelos locales (Ollama, Phi-3, Gemma-2)." },
    { label: "Debate abierto", texto: "el futuro de la IA sin la nube." },
  ],
  headingLanding: "Nos vemos este jueves.",
  headingEventos: "Este jueves.",
  imagen: "/images/eventos/arteialocal.jpg",
  ancho: 928,
  alto: 1152,
  ctaTexto: "Unirse al grupo de Telegram →",
  ctaUrl: "https://t.me/javascriptecuador",
  ctaNota: "El enlace de la charla se publica en ese grupo el día del evento.",
  anuncioTexto:
    "Hablemos de IA · jueves 13 de agosto, 7:30 PM — únete al grupo de JS Ecuador para recibir el enlace de la charla",
};
