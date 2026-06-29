---
title: "¿Mi chatbot puede ser atacado y cada ataque me cuesta dinero?"
description: "Del chatbot de prueba al chatbot real, qué es el Denial of Wallet, por qué OWASP lo pone entre los grandes riesgos de la IA y por qué el widget que pegamos en la web no nos protege."
pubDate: 2026-06-29
category: Ciberseguridad
author: DakyLabs
draft: false
image: /images/posts/mi-chatbot-puede-ser-atacado-denial-of-wallet.png
---

Hoy en día montar un chatbot con IA es "fácil", y en parte es culpa de los tutoriales con títulos tipo "despliega tu solución en 10 minutos" (yo doy charlas con ese título jaja..). Para aprender conceptos es un buen recurso. El problema es otro, entre "funciona en mi demo" y "funciona con clientes reales" hay una pequeña gran diferencia, que nos puede llegar en forma de factura, y de eso vamos a hablar hoy.

<figure class="blog-figure">
  <figcaption>🎧 <strong>¿Prefieres escucharlo?</strong> Te dejo este artículo en formato podcast (6:42).</figcaption>
  <audio controls preload="none" style="width:100%" src="/audio/mi-chatbot-puede-ser-atacado-denial-of-wallet.m4a"></audio>
</figure>

---

## Todo comienza como una semana normal

Pues bueno, todo comienza como una semana normal de trabajo en donde un cliente necesita un [chatbot tipo RAG](/blog/corazon-chatbots-data-store-google-cloud) para responder a preguntas que sus clientes realicen (una de las soluciones que están de moda hoy en día) pero entre sus dolores de cabeza (siempre escuchamos a los clientes con paciencia), nos menciona que debe tener un control sobre el contenido que sube al chatbot, y lo más importante, tener un control sobre el consumo, y nos enfocaremos en eso, la herramienta escogida es llamada Conversational Agents de Google Cloud (el servicio para construir chatbots conversacionales, la evolución del difunto Dialogflow CX), como saben una solución así, tiene más componentes, entre ellos software, seguridad perimetral etc., pero no es tema de la conversación.

---

## El cobro, el widget y el ataque

Volviendo al tema, Conversational Agents tiene soluciones de chatbot para muchos usos, y el que escogimos es uno tipo RAG, básicamente tiene una base de conocimiento y sus respuestas son en base a dicho conocimiento, pero hay que entender cómo funciona el tema del cobro, y aquí las cosas se ponen interesantes.

 Nuestro objetivo es tener el control total sobre el chatbot para implementar más controles o funcionalidades que nativamente no es posible solo utilizando el widget, y ¿qué es un widget? Es un código que pegamos en nuestro sitio web y ya tenemos funcionando nuestro chatbot, pero cómo evitamos un ataque en donde un amigo sea humano o bot consuma o pregunte indiscriminadamente a nuestro chatbot.

Esto se conoce como **Denial of Wallet (DoW)**. No buscan dejar fuera un servicio (eso es el DoS clásico). Buscan dejarlo corriendo y que llegue una factura que nos haga arrepentir de utilizar las nuevas herramientas con IA. En sí el daño es el costo. Y vamos a hablar de dónde sale este concepto.

<figure class="blog-figure">
  <img src="/images/posts/mi-chatbot-puede-ser-atacado-denial-of-wallet/panorama-dow.png" alt="Panorama del ataque Denial of Wallet a un chatbot: preguntas sin parar, el puesto de jugos y el dinero drenándose hacia el tope de gasto" loading="lazy" width="800" height="450">
  <figcaption><strong>Figura 1:</strong> El panorama del Denial of Wallet, el chatbot recibe preguntas sin parar (humanas o bots), cada una factura.</figcaption>
</figure>

---

## ¿De dónde sale esto? OWASP

¿Con qué se come eso? OWASP, ¿quiénes son? OWASP es una organización mundial que se dedica a la seguridad del software, básicamente son los que publican listas de "ojo con esto" que toda la industria respeta (bueno, eso dice la teoría), como esos carteles de "cuidado, piso mojado" pero para programadores.

Y como ahora todo el mundo le mete inteligencia artificial a sus aplicaciones sí o sí, OWASP sacó una lista especial solo para eso, y ahí, en el puesto número diez, está nuestro protagonista, lo llaman Unbounded Consumption, que dicho en simple es "consumo sin límite", y dentro de esa categoría está el famoso Denial of Wallet.

---

## El puesto de jugos

Imaginémonos lo siguiente, tenemos un puesto de jugos y ponemos un cartel que dice "el jugo lo sirvo yo", pero la trampa es que cada vaso lo pagamos nosotros de nuestro bolsillo, entonces llega una persona, y empieza a pedir vasos sin parar, uno tras otro, solo nos hace servir hasta que nos quedamos sin dinero, bueno, eso mismo pero con nuestro chatbot, cada pregunta es un vaso de jugo que factura Google Cloud y lo pagamos nosotros.

---

## Cómo defendernos (y no, no es el "no soy un robot")

¡Que no cunda el pánico!, lo bueno es que OWASP no solo nos dice cuál es el problema, también nos dice cómo defendernos, la solución no es el clásico "no soy un robot" (que es molestoso pero necesario muchas veces), lo que OWASP recomienda son límites y presupuestos, o sea ponerle reglas a nuestro chatbot, cuántas preguntas puede hacer un usuario por minuto, cuántas por sesión (a eso se le llama rate limiting, o límite de tasa), y lo más importante, un [tope de gasto](/blog/gcp-pay-as-you-go-o-reservar-recursos) que no se pueda pasar pase lo que pase, igualito al límite de nuestra tarjeta de crédito, así aunque venga alguien a nuestro puesto de jugos a pedir mil vasos, llega al tope, se cierra la llave, y dormimos tranquilos.

---

## ¿Y no me basta con reCAPTCHA y una regla de Cloud Armor?

Excelente pregunta me hice jaja, y la respuesta honesta es, ayudan muchísimo y sí deberíamos usarlos.

Cloud Armor es el guardia de seguridad que Google Cloud pone en la puerta de nuestra app (técnicamente un WAF, un firewall para aplicaciones web), revisa todo el tráfico que llega y bloquea lo sospechoso antes de que entre. Por ejemplo, frena a la IP que nos dispara cientos de peticiones por minuto (eso es el rate-based ban), puede bloquear países enteros que no nos interesan (geo-bloqueo) y filtra bots conocidos. Es nuestro perímetro y se lleva el grueso del abuso barato antes de que toque la app.

reCAPTCHA, por su lado, filtra robots en la puerta, es esa prueba de Google del "no soy un robot" (el checkbox o elegir las fotos con semáforos; en las versiones nuevas muchas veces ni aparece, valida sola en segundo plano).

O sea, los dos mitigan una buena parte del DoW.

El problema es que son controles de perímetro y por fuente, y el DoW es un problema que va más allá, y ahí está el problema. Lo pongo con tres casos donde Armor + reCAPTCHA pasan la prueba y aun así nos puede perjudicar en el consumo indiscriminado.

- **Ataque repartido (botnet).** 10.000 IPs, cada una haciendo 5 preguntas por minuto, cada IP va por debajo del límite de Armor (parecen usuarios normales), pero sumadas son 50.000 preguntas por minuto, Armor cuida cada puerta por separado, nadie está contando el total.
- **Tráfico real viral.** Comparten nuestro bot en redes y entran 100.000 personas reales, reCAPTCHA las deja pasar a todas (¡son humanas!) y cada pregunta cuesta, reCAPTCHA sabe decir "esto es humano", no sabe decir "ya gastamos suficiente hoy, esto se va a descontrolar".
- **Un bug en nuestra propia web.** Un reintento en bucle del widget desde los navegadores de nuestros clientes legítimos, IPs normales, humanos, reCAPTCHA OK… y se produce un consumo de igual manera.

Así que no es "Armor/reCAPTCHA o un límite de gasto", son los tres juntos, en capas, Armor (perímetro) → reCAPTCHA (puerta) → tope de gasto (techo que nunca se pasa), cada capa asume que la anterior puede fallar, y el tope de gasto es el último que queda en pie aunque todo lo demás lo evadan.

De paso, evaluamos usar las cuotas nativas de Google Cloud, pero esas controlan otra cosa, la velocidad por minuto (cuántas peticiones o tokens por minuto), no el total por día ni por usuario, así que sirven de freno general, no del candado que buscábamos.

<figure class="blog-figure">
  <img src="/images/posts/mi-chatbot-puede-ser-atacado-denial-of-wallet/capas-defensa.png" alt="Diagrama de defensa en capas: Cloud Armor, reCAPTCHA, cuota de GCP y el backend con el tope de gasto como control crítico" loading="lazy" width="800" height="450">
  <figcaption><strong>Figura 2:</strong> La defensa en capas, Cloud Armor y reCAPTCHA filtran por fuente, la cuota de GCP frena por minuto, pero el control crítico contar y cortar por usuario/día vive en el backend.</figcaption>
</figure>

Me pueden llamar paranoico o sobreingeniería pero cuando hay un contrato de por medio y que el cliente tiene presupuestos que no pueden subir como espuma, me van a entender.

---

## La moraleja

Y justo ese control es lo que el widget que pegamos en la web no nos da por defecto, por eso, cuando hay clientes de verdad de por medio, ese candado lo tenemos que poner nosotros, y de cómo se construye, hablaremos más adelante.

---

## Recomendaciones

Si nos toca llevar un chatbot de la demo al cliente real, podemos tomar en cuenta lo siguiente:

- **No asumir que nunca nos va a pasar.** No es paranoia, es diseño, si hay una factura de por medio alguien (o algún bot) va a probar nuestro chatbot hasta dónde soporta.
- **No dejamos el widget solo.** Metemos un backend nuestro entre la web y el modelo, ahí es donde podemos contar peticiones, validar sesiones y cortar, el widget nativo no nos da eso.
- **El tope de gasto va primero.** Es nuestro límite de tarjeta, pase lo que pase no se cobra más, es el único control que nos da cierta garantía.
- **Pensamos en capas, no en una bala de plata.** Cloud Armor (perímetro) + reCAPTCHA (puerta) + rate limiting (ritmo) + tope de gasto (techo), cada capa cubre lo que la anterior deja pasar.
- **Que el sistema nos avise.** Activamos presupuestos y alertas de facturación en Google Cloud. Eso sí, ojo, los presupuestos de Google Cloud solo avisan, no cortan el gasto; el freno duro lo pone nuestro backend.

---

## Conclusión

La diferencia entre el chatbot de prueba y el chatbot enterprise no es que uno sea más bonito, es que el de producción tiene puestas las reglas que lo protegen de costar una fortuna. El Denial of Wallet no nos tumba el servicio, nos vacía el bolsillo, y ese candado no viene por defecto, nos toca ponerlo a nosotros.

<div class="video-embed">
  <iframe src="https://www.youtube-nocookie.com/embed/uqQgKR_Lb4s" title="Ataques Denial of Wallet (DoW) en chatbots con IA — DakyLabs" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
<p class="video-caption">📺 <strong>¿Prefieres verlo?</strong> Aquí te explico el tema completo en video.</p>


