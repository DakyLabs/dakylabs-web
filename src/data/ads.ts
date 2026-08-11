// src/data/ads.ts
// Pon tus imágenes en /public/images/ads/ y edita los campos aquí.
// El primer anuncio (evento) se toma de src/data/evento.ts.
import { evento } from "./evento";

export interface Ad {
  title: string;
  image: string;
  url: string;
}

export const ads: Ad[] = [
  ...(evento.activo
    ? [{ title: evento.anuncioTexto, image: evento.imagen, url: evento.ctaUrl }]
    : []),
  {
    title: "Charlas y Talleres Flisol 2026, el evento de Software Libre en QUITO",
    image: "/images/ads/anuncio-02.JPG",
    url: "https://www.facebook.com/photo?fbid=1291003086552606&set=pcb.1291003119885936",
  },
];
