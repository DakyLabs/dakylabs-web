// src/data/ads.ts
// Pon tus imágenes en /public/images/ads/ y edita los campos aquí.

export interface Ad {
  title: string;
  image: string;
  url: string;
}

export const ads: Ad[] = [
  {
    title: "Hablemos de IA · jueves 13 de agosto, 7:30 PM — únete al grupo de JS Ecuador para recibir el enlace de la charla",
    image: "/images/eventos/arteialocal.jpg",
    url: "https://t.me/javascriptecuador",
  },
  {
    title: "Charlas y Talleres Flisol 2026, el evento de Software Libre en QUITO",
    image: "/images/ads/anuncio-02.JPG",
    url: "https://www.facebook.com/photo?fbid=1291003086552606&set=pcb.1291003119885936",
  },
];
