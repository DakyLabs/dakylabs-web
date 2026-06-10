---
title: "Cazando moscas con una bazuca!"
description: "Conversational Agents vs CX Agent Studio hacen casi lo mismo, el precio no es el mismo."
pubDate: 2026-06-09
category: GCP
author: DakyLabs
draft: false
image: /images/posts/conversational-agents-vs-cx-agent-studio.jpg
---
La IA cada vez es más "inteligente" y lucha con nosotros para reemplazarnos, esto se lo toma muy a pecho Google y por esa razón sus agentes hacen tareas cada vez más complicadas, es así que no hace mucho tiempo el estándar era Dialogflow que actualmente se llama Conversational Agents, y básicamente era un chat conversacional pregunta respuesta y se puede generar un flujo de trabajo, pero recientemente existe CX Agent Studio que prácticamente nos permite realizar un chatbot con más características avanzadas como interactuar con voz, pero esto tiene un precio , que si no lo tomamos en cuenta infla nuestras facturas hasta las nubes,y esta vez cazaremos una mosca con una bazuca. En este artículo te ayudaré a elegir la herramienta correcta para el trabajo correcto.

Aunque a primera vista parezca que hacen "casi lo mismo", la diferencia en arquitectura, autonomía y, sobre todo, en la factura al final del mes, es por decir un poquito alta.

Todo comenzó al implementar una solución de chatbot a la medida del cliente y utilicé el famoso y no tan utilizado gcloud (es la navaja suiza de Google para implementar soluciones vía terminal), la aplicación estaba lista , pero en la revisión con los equipos de ingeniería , se mencionó la palabra mágica, "porque no utilizamos", y mencionaron el servicio llamado CX Agent Studio que básicamente es una evolución en la suite de productos de agentes conversacionales , para este punto es bueno saber que un agente significa que no solo es un chatbot sino que está en la capacidad de ejecutar alguna acción, bueno en realidad es una herramienta muy poderosa , prácticamente Low Code como nos gusta a los vibecoders, pero me surgió la duda y en sí esto puede impactar positivamente o negativamente un proyecto y es ¿cuál es el valor y cómo funciona el cobro de estos servicios?

<figure class="blog-figure">
  <figcaption>🎧 <strong>¿Prefieres escucharlo?</strong> Te dejo este artículo en formato podcast (1:40).</figcaption>
  <audio controls preload="none" style="width:100%" src="/audio/conversational-agents-vs-cx-agent-studio.m4a"></audio>
</figure>

## Juntos pero no revueltos, qué hace cada uno

**Conversational Agents (antes Dialogflow CX)**

Como un árbol de decisiones muy inteligente, el usuario escribe, el bot entiende y sigue un camino predefinido. Cobra por cada turno de conversación cada mensaje del usuario cuenta.

**CX Agent Studio**

Un agente que no solo responde sino que actúa, tiene voz humana en más de 40 idiomas según la documentación, puede consultar bases de conocimiento, ejecuta acciones reales. La gran diferencia está en que cobra por sesión completa sin importar cuántos mensajes se intercambien dentro.

<figure class="blog-figure">
  <img src="/images/posts/conversational-agents-vs-cx-agent-studio/cx-agent-studio.jpg" alt="Interfaz de CX Agent Studio: panel de Preview del agente probando una conversación y el Root agent con sus acciones" loading="lazy" width="800" height="646">
  <figcaption><strong>Figura 1:</strong> La consola de CX Agent Studio a la izquierda el "Preview agent" probando una conversación, a la derecha el "Root agent" con sus acciones.</figcaption>
</figure>

📊 **Ejemplo: 1,000 usuarios al día con 10 mensajes cada uno**

- Conversational Agents: 1,000 × 10 × $0.007 = $70/día → ~$2,100/mes
- CX Agent Studio: 1,000 sesiones × $0.50 = $500/día → ~$15,000/mes

→ CX Agent Studio puede salir ~7x más caro. Ahí estaríamos cazando moscas con una bazuca.

<figure class="blog-figure">
  <img src="/images/posts/conversational-agents-vs-cx-agent-studio/comparativa.jpg" alt="Infografía comparativa entre Conversational Agents y CX Agent Studio: capacidades, modelo de cobro y diferencia en la factura" loading="lazy" width="800" height="450">
  <figcaption><strong>Figura 2:</strong> Conversational Agents vs CX Agent Studio de un vistazo — capacidades, modelo de cobro y el impacto en la factura.</figcaption>
</figure>

## Conversational Agents CX vs CX Agent Studio

|                  | Conversational Agents (CX)  | CX Agent Studio            |
| ---------------- | --------------------------- | -------------------------- |
| Tecnología      | NLU + Flows determinístico | Gemini AI generativo       |
| Voz              | Básica                     | Humana, +40 idiomas        |
| Agente autónomo | No                          | Sí (ejecuta acciones)     |
| Multimodal       | No                          | Sí (texto, audio, imagen) |
| Ideal para       | Bots simples y medianos     | Contact center enterprise  |

## No es lo mismo cobrar por sesión que por interacción

| Producto              | Tipo | Precio     | Se cobra por...              |
| --------------------- | ---- | ---------- | ---------------------------- |
| Conversational Agents | Chat | $0.007     | Cada request/turno           |
| Conversational Agents | Voz  | $0.001/seg | Segundos de audio            |
| CX Agent Studio       | Chat | $0.50      | Sesión completa (50 turnos) |
| CX Agent Studio       | Voz  | $0.50      | Sesión (5 min incl.)        |

🔗 **Links oficiales:**

- Conversational Agents: [cloud.google.com/products/conversational-agents/pricing](https://cloud.google.com/products/conversational-agents/pricing)
- CX Agent Studio: [cloud.google.com/products/gemini-enterprise-for-customer-experience/cx-agent-studio/pricing](https://cloud.google.com/products/gemini-enterprise-for-customer-experience/cx-agent-studio/pricing)

## Decisiones que pueden marcar positivamente o negativamente todo el proyecto

Bot de FAQ o soporte simple → Conversational Agents (CX). Más barato, más que suficiente.

Contact center con voz humana o agente que ejecuta acciones → CX Agent Studio. El precio se justifica.

Startup o MVP → Conversational Agents. 

Proyectos enterprise con conversaciones largas → compara ambos con la calculadora oficial primero.

## No todo lo nuevo es lo mejor

Ambas herramientas son potentes y tienen su lugar. El error está en elegir CX Agent Studio porque suena mejor o está a la moda o es nuevo más potente y tiene más características, sin entender bien el requerimiento del cliente. Para la mayoría de proyectos, Conversational Agents (CX) es más que suficiente. CX Agent Studio brilla en enterprise con funciones avanzadas.

Bueno al final después de hacer ese análisis pues escogimos la mejor opción que en este caso era Conversational Agents

Un día más de aprendizaje, y recuerda hay que analizar bien los requerimientos del cliente en conjunto con su presupuesto, esa es nuestra misión para que cualquier proyecto tenga éxito, y más que nada agreguemos valor a nuestras soluciones. Nos vemos la próxima semana y ya veremos que cosas nuevas pasan.

<div class="video-embed">
  <iframe src="https://www.youtube-nocookie.com/embed/7qh2i3oXO0s" title="Resumen en video — Conversational Agents vs CX Agent Studio" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
<p class="video-caption">📺 <strong>Resumen en video</strong> — la versión corta de este análisis.</p>

✅ Recomendación dakylabs: usa la calculadora oficial antes de decidir la utilización de un servicio de GCP

🔢 [https://cloud.google.com/products/calculator](https://cloud.google.com/products/calculator)
