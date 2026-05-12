---
title: "IA, Next.js 15.x y la crónica de un cryptojacking-cidio"
description: "Cómo una 'simple versión' desactualizada de un paquete (aproximadamente 1 año) puede ser utilizada para vulnerar tu aplicación y hacer rico a otros."
pubDate: 2026-05-11
category: Ciberseguridad
author: DakyLabs
draft: false
image: /images/posts/ia-nextjs-cronica-cryptojacking.jpg
featured: false
---

## Antecedentes

La inteligencia artificial es como un exoesqueleto para realizar tareas informáticas por ahora, (quién sabe si en el futuro ya hagan de todo), pero ya dejando a un lado la ciencia ficción, construir software con IA tiene sus ventajas, en mi caso realizar una aplicación web a lo largo de una semana, algunos dirán que es mucho tiempo pero antes de ponerme manos a la obra construí una arquitectura, escogí tecnologías y fui ajustando todo en base a las recomendaciones de la IA, y todo fue hermoso, todo fluía, veía cómo todo se construía, y yo solo tomaba decisiones, el sueño del vibecoder, a la final terminé mi app, pero no tomé en cuenta algo. ¿Qué? Si bien le ordené a la IA que coloque las versiones más recientes de algunas herramientas, no sé por qué escogió Next.js en su versión 15.3.2, y no me puse a revisar, confié ciegamente. GRAVE ERROR. Bueno terminé todo el pipeline lo subí a un servidor virtual y lo dejé 2 días corriendo y pasó lo siguiente.

## Alerta, mi contenedor está enfermo

<figure class="blog-figure">
  <img src="/images/posts/ia-nextjs-cronica-cryptojacking/healthcheck.jpg" alt="Healthcheck marcando unhealthy" loading="lazy" width="800" height="450">
  <figcaption><strong>Figura 1:</strong> [Contenedor en estado unhealthy].</figcaption>
</figure>

Para vigilar los tiempos de respuesta, tenía configurado en mi Dockerfile un healthcheck que los mide cada 30 segundos, y justamente este comenzó a marcar el contenedor como "unhealthy", no sabía por qué, pero al revisar los procesos de mi máquina, vi algo extraño.

## Un malware en mi aplicación, ¿cómo puede ser?

<figure class="blog-figure">
  <img src="/images/posts/ia-nextjs-cronica-cryptojacking/procesos.webp" alt="Procesos sospechosos en el contenedor" loading="lazy" width="800" height="450">
  <figcaption><strong>Figura 2:</strong> [Captura de procesos sospechosos detectados].</figcaption>
</figure>

Configuré medidas de seguridad básicas, llaves, tokens etc, pero como dice el libro del Arte de la Guerra, no debes atacar el lugar más protegido, sino el más débil.

## Vulnerabilidad crítica en Next.js 15.3.2

Por qué la IA no escogió una versión actual como le dije, tal vez porque su base de conocimiento tiene un corte hasta el 2025, o quién sabe, y ¿por qué no corrió el comando npm audit?, si yo le dije actúa como un experto en seguridad, pues las tecnologías también se equivocan.

## Cryptojacking silencioso

<figure class="blog-figure">
  <img src="/images/posts/ia-nextjs-cronica-cryptojacking/cryptojacking.webp" alt="Inspeccionando /tmp del contenedor" loading="lazy" width="800" height="450">
  <figcaption><strong>Figura 3:</strong> [ Inspeccionando /tmp del contenedor].</figcaption>
</figure>

Pues uno de los miles de bots que viven en la internet detectó mi servidor, y también detectó mi versión vulnerable de Next.js que procesaba datos del cliente sin validar que fueran seguros (vulnerabilidad de tipo deserialización insegura). Link: [https://github.com/advisories/GHSA-9qr9-h5gf-34mp](https://github.com/advisories/GHSA-9qr9-h5gf-34mp)

Qué permitía: ejecutar código arbitrario en el servidor remotamente.
Qué hizo mi "amigo" ciberdelincuente: descargó y corrió un minero de Monero que consumió recursos de mi CPU para ganar dinero a costa de mi servidor, además instaló un bot que estaba dormido y que podía usarse para ataques DDoS. (Un ataque DDoS es como tener una sola puerta para que ingresen millones de personas a la vez, al final no va a entrar nadie porque colapsa)

Y lo más grave, una calificación de 10/10 (el máximo posible en la escala CVSS).

## Estructurando el caos

<figure class="blog-figure">
  <img src="/images/posts/ia-nextjs-cronica-cryptojacking/virustotal.jpg" alt="Detección del binario nodes en VirusTotal vía hash SHA-256." loading="lazy" width="800" height="450">
  <figcaption><strong>Figura 4:</strong> [ Detección del binario nodes en VirusTotal vía hash SHA-256].</figcaption>
</figure>

Cuando algo malo pasa en un servidor, la reacción desesperada es borrar archivos, apagar el sistema, gritar. Para evitar exactamente eso, la industria de seguridad informática usa frameworks de incident response, guías paso a paso que ordenan qué hacer, en qué orden, y por qué. Y bueno apliqué estos pasos durante este incidente llamados SANS PICERL, por las iniciales de sus seis fases: Preparation, Identification, Containment, Eradication, Recovery y Lessons Learned (preparación, identificación, contención, erradicación, recuperación y lecciones aprendidas). Como un ejercicio para recordar viejos tiempos aquellos.

## Billetera de mi atacante y sus víctimas

<figure class="blog-figure">
  <img src="/images/posts/ia-nextjs-cronica-cryptojacking/billetera.webp" alt="El pool del atacante un día después de mi contención: 10 víctimas activas y 487 KH/s combinados(Kilo Hashes por segundo). Mi VPS ya no figura, otros servidores vulnerables cayeron en su lugar." loading="lazy" width="800" height="450">
  <figcaption><strong>Figura 5:</strong> [El pool del atacante un día después de mi contención: 10 víctimas activas y 487 KH/s combinados(Kilo Hashes por segundo). Mi VPS ya no figura, otros servidores vulnerables cayeron en su lugar].</figcaption>
</figure>

El atacante debe enviar información a algún lado, bueno en su código estaba el número de billetera y como es información pública fui a consultar y ver cuántas víctimas más tenía y pues al momento tiene 10.

## DDoS as a Service

Y buscando entre los archivos del malware instalado estaba un bot listo para activarse cuando el atacante requiera, con lo cual el proveedor de mi servidor VPS me hubiese bloqueado.

## Lecciones aprendidas

En esta época de IA los ciberdelincuentes también tienen IA a su disposición, aunque ataques masivos como el que sufrí siguen siendo la automatización clásica que existe desde hace años. En base a esta experiencia puedo sacar las siguientes conclusiones en forma de lecciones aprendidas, y comparto algunas:

- Utilizar siempre `npm audit` o dependiendo de su gestor de dependencias alguna herramienta que nos permita tener visibilidad de las vulnerabilidades de las versiones de los paquetes, no suponer que la IA ya lo va a realizar.
- Utilizar un WAF para poder agregar una mayor capa de seguridad.
- Saber exactamente qué conexiones salientes están permitidas y configurarlas en el firewall.

Y bueno mi VPS estaba configurado y hardenizado, pero al ser una aplicación modo MVP (trato de ser el hombre orquesta pero es imposible creo yo llevar todo el control que lo realizan varios departamentos), y al menos el tema del WAF es un gasto adicional. Podría haber ayudado si tuviera una regla específica para esta CVE (que normalmente aparece días después del disclosure), por otro lado utilizar un monitoreo activo como Falco también ayuda pero eso ya es un tema aparte, ya que para un MVP (producto mínimo viable) es demasiado esfuerzo.

En todo caso la arquitectura planteada basada en separación de ambientes y funciones impidió que se tome el control de todo el servidor y que solo pueda moverse a nivel de contenedor, a la final tuvo un final feliz y yo un día de aprendizaje más.
