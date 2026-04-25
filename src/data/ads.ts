// src/data/ads.ts
// Pon tus imágenes en /public/images/ads/ y edita los campos aquí.

export interface Ad {
  title: string;
  image: string;
  url: string;
}

export const ads: Ad[] = [
  {
    title: "Flisol Quito 2026, ya se viene el evento más grande de Software Libre en Ecuador",
    image: "/images/ads/anuncio-01.JPG",
    url: "https://flisol.info/",
  },
  {
    title: "Charlas y Talleres Flisol 2026, el evento de Software Libre en QUITO",
    image: "/images/ads/anuncio-02.JPG",
    url: "https://www.facebook.com/photo?fbid=1291003086552606&set=pcb.1291003119885936",
  },
];
