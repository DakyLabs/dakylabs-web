---
title: "¡Prueba y error en la nube no es buena idea!"
description: "GCP Search Chatbot: pay as you go o reservar recursos"
pubDate: 2026-05-18
category: GCP
author: DakyLabs
draft: false
image: /images/posts/gcp-pay-as-you-go-o-reservar-recursos.jpg
featured: false
---

### Resumen

En la nube no se puede suponer nada, cada opción que actives o utilices puede reflejarse en tu próxima factura, así que no se puede utilizar el método mundialmente famoso "prueba y error" a menos que tengas dinero de sobra.

## Probar todo lo nuevo puede ser una debilidad

Me sumé nuevamente a una de las modas en la época de la IA "los chatbots potenciados con IA". Escogí Google Cloud Platform (GCP) para construir mi chatbot a escala empresarial. Y como el requerimiento del cliente era un chatbot RAG, GCP es el indicado.

RAG es una tecnología la cual permite al chatbot responder preguntas de una fuente de datos establecida lo que evita que nuestro chatbot invente información.

> 📌 RAG = Retrieval Augmented Generation. El chatbot busca primero en tus documentos y luego genera la respuesta basada en esa información real, no en suposiciones.

<figure class="blog-figure">
  <img src="/images/posts/gcp-pay-as-you-go-o-reservar-recursos/figura-1.jpg" alt="Opciones de aplicaciones que se pueden crear con IA en Google Cloud Console" loading="lazy" width="800" height="450">
  <figcaption><strong>Figura 1:</strong> Opciones de aplicaciones que se pueden crear con IA en Google Cloud Console.</figcaption>
</figure>

Este tipo de chatbots se factura por interacción y dependiendo de la "inteligencia" que tenga, el precio varía. Comparto el link de la documentación oficial: [https://cloud.google.com/generative-ai-app-builder/pricing](https://cloud.google.com/generative-ai-app-builder/pricing)

No me voy a detener colocando los precios, pero vamos a topar un tema importante: al momento de crear un Data Store para mi chatbot (donde está la información con la cual responde el chatbot), hay que escoger el precio y había dos opciones, una de pago por uso (en la consola aparece como **General Pricing**) y otra de precios configurables (en la consola aparece como **Configurable Pricing**).

Al leer esta opción precios configurables yo pensé que podía escoger un máximo o límite de consumo para este elemento, así que también pensé "probemos, a la final ¿qué puede pasar?". Pues hay que entender algo, cada nube tiene su forma de cobrar el consumo de sus recursos. Me guie solo en las etiquetas, y escogí la nueva opción.

Para darle contexto, activé una cuenta de prueba de $300 dólares y estaba confiado.

## Saldo de $300 dólares bien utilizados es oro

Como tip puedo decir que cuando uno activa una cuenta de prueba **es mejor no activar el acceso ilimitado a recursos como se ve en la imagen**, ya que esto permite utilizar todas las herramientas de GCP pero el consumo en el caso de pasarse los 300$ de prueba ya se descuentan de la tarjeta asociada. Así que para aprender a utilizar GCP basta con no activar esta opción.

> 📌 Tip: Mantén la cuenta de prueba en modo restringido. El acceso ilimitado conecta tu tarjeta de crédito y los cobros van directo ahí, incluso durante el período de prueba.

<figure class="blog-figure">
  <img src="/images/posts/gcp-pay-as-you-go-o-reservar-recursos/figura-2.jpg" alt="Pantalla de activación de acceso ilimitado en GCP" loading="lazy" width="800" height="450">
  <figcaption><strong>Figura 2:</strong> Pantalla de activación de acceso ilimitado a recursos en GCP.</figcaption>
</figure>

Bueno, sigamos. Escogí la opción de precios configurables.

<figure class="blog-figure">
  <img src="/images/posts/gcp-pay-as-you-go-o-reservar-recursos/figura-3.jpg" alt="Pantalla de selección de modelo de precios - Configurable seleccionado" loading="lazy" width="800" height="450">
  <figcaption><strong>Figura 3:</strong> Pantalla de selección de modelo de precios — Configurable seleccionado.</figcaption>
</figure>

Y al pensar que estoy limitando el consumo, escogí reservar el espacio para 1,000 queries por minuto que va a soportar mi chatbot y reservar un espacio de 50 gigas para que se guarden estos datos. ¿Y qué pasó?


## No suponer: la mejor protección contra cobros no esperados

### ¿Qué pasó exactamente?

Al aplicar esto estaba reservando recursos, lo cual conlleva a que se me cobre por la totalidad de los recursos reservados. Aunque parece obvio, no lo es cuando leí la palabra "threshold" que en el ámbito dev significa un tope. Así que puede llevarnos a equivocarnos.

> 📌 Por lo pronto ya se cambió esa etiqueta y ahora menciona "MINIMUM" en lugar de "THRESHOLD" Google reconoció que la palabra anterior generaba confusión.

### ¿Qué es un Data Store y por qué cobra?

El Data Store es la biblioteca de conocimiento de tu chatbot, el lugar donde guardas todos los documentos desde los cuales responde. Cuando lo creas, GCP no solo guarda tus archivos originales: los procesa, los vectoriza y los indexa en su propio espacio optimizado para búsqueda con IA.

Por eso te pide reservar GB (espacio para esa copia indexada) y QPM (capacidad para responder consultas). Es como arrendar una bodega: pagas el espacio aunque no metas nada dentro.

### Pay as you go (General Pricing) vs Configurable Pricing: ¿cuál elegir?

<div class="table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Situación</th>
        <th>Pay as you go (General Pricing)</th>
        <th>Configurable Pricing</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Desarrollo / pruebas / aprendizaje</td>
        <td>✅ Ideal </td>
        <td>❌ Pagas el mínimo mensual aunque uses 0 queries</td>
      </tr>
      <tr>
        <td>Producción con tráfico bajo o medio</td>
        <td>✅ Pagas solo lo que se usa</td>
        <td>❌ El mínimo puede superar tu consumo real</td>
      </tr>
      <tr>
        <td>Producción con +15M queries/mes constantes</td>
        <td>⚠️ Puede salir más caro</td>
        <td>✅ El costo fijo puede ser menor que pay-per-query</td>
      </tr>
    </tbody>
  </table>
</div>

A la final se me terminó todo el saldo promocional sin utilizar nada. Perdí todo el saldo que tenía en esa cuenta free para mi laboratorio.

## Bueno, como no utilicé esos recursos...

Al ser una cuenta para estudio, levanté un ticket (caso de soporte) a Google para que puedan analizar el caso. Me hicieron un pequeño ajuste a la cuenta pero al final el saldo era muy pequeño.

<figure class="blog-figure">
  <img src="/images/posts/gcp-pay-as-you-go-o-reservar-recursos/figura-4.jpg" alt="Saldo en $0 en la cuenta de GCP" loading="lazy" width="800" height="450">
  <figcaption><strong>Figura 4:</strong> Saldo en $0 en la cuenta de GCP.</figcaption>
</figure>

### Checklist: antes de activar cualquier servicio nuevo en GCP

- Lee la página de precios oficial del servicio antes de hacer clic en "Create".
- Identifica si el cobro es por uso (pay as you go) o por reserva (suscripción mínima).
- Activa alertas de billing desde el primer día: GCP Console → Billing → Budgets & alerts.
- En entornos de prueba, usa siempre General pricing / pay as you go.
- No actives el acceso ilimitado en la cuenta de prueba de $300.
- Si ves la palabra "Minimum" en un campo de configuración, eso es lo que vas a pagar aunque uses cero.

## Después de la tormenta viene la calma

Como moraleja: en la nube no sirve el método de prueba y error. Esta vez al ser una cuenta de prueba me confié probando nuevas opciones. Google Cloud siempre está modernizando sus productos, esto es bueno, pero nos obliga a estar al día y saber las características de cada servicio. Así que cuando nos consuma la curiosidad, nos piquen las manos y probemos algo nuevo es mejor estar seguro y como siempre leer la documentación oficial, o tener una cuenta de prueba sin activar el uso ilimitado de recursos de GCP.

Bueno, un aprendizaje más y a seguir implementando mi chatbot.

<figure class="blog-figure">
  <img src="/images/posts/gcp-pay-as-you-go-o-reservar-recursos/figura-5.jpg" alt="Chatbot funcionando correctamente" loading="lazy" width="800" height="450">
  <figcaption><strong>Figura 5:</strong> Me aprobaron un saldo a favor pequeño pero algo es algo.</figcaption>
</figure>
