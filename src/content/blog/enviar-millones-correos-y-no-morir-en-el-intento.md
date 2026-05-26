---
title: "Enviar millones de correos y no morir en el intento"
description: "Lo que aprendí tratando de enviar millones de correos al mes, misión imposible o posible si lo hacemos bien"
pubDate: 2026-05-25
category: Herramientas
author: DakyLabs
draft: false
image: /images/posts/enviar-millones-correos-y-no-morir-en-el-intento.jpg
---

Llega el momento en la vida del Developer en el cual nuestras aplicaciones por alguna razón necesitan enviar gran cantidad de correos, es ahí donde las opciones abundan pero funcionan de la misma manera. Exploramos en este relato los puntos más importantes para que nuestros correos no sean baneados.

Como antecedente, cuando me solicitaron una solución para el envío de millones de correos al mes pensé: ¿por qué no lo hago yo mismo? Pero entendí que por alguna razón es muy difícil tener una aplicación de estas características, no por el esfuerzo técnico, más bien porque alguien es dueño de las IPs públicas (Tu IP ingresa en listas negras muy seguido). Una IP es una serie de números que identifica un recurso en internet, algo así como la latitud y longitud donde está tu casa, pero que no se puede repetir. Y creo que a alguien no le interesa que nosotros construyamos ese tipo de herramientas, y peor aún sin pagar. La internet también es un negocio.

Así que decidí no inventar el agua tibia y recurrí a la primera solución enterprise que me vino a la cabeza: **SendGrid**. Y noté que este tipo de aplicaciones ya suponen que uno sabe cómo funciona el correo, pero no siempre es así.

---

## El primer obstáculo: los registros DNS

Cuando SendGrid te pide que "valides tu dominio", en realidad te está pidiendo que demuestres que eres el dueño de ese dominio y que los correos que salen de él son legítimos. Esto se hace agregando unos registros especiales en el DNS, que es básicamente la guía telefónica de internet: le dice a cada computadora del mundo a dónde ir cuando alguien escribe tu dominio.

Los registros que SendGrid te pide configurar son tres tipos principales:

**CNAME de tracking** — le dice a SendGrid dónde redirigir los clics y aperturas de tus correos para medir estadísticas. Si alguna vez notaste que al hacer clic en un enlace de un correo pasas por un dominio raro antes de llegar al destino, eso es exactamente esto.

**DKIM (s1 y s2)** — es una firma digital que va en cada correo que sale. Gmail, Outlook y los demás proveedores la verifican para asegurarse de que el correo realmente viene de quien dice que viene y no de alguien haciéndose pasar por ti. Sin esto, tus correos van directo al spam o simplemente no llegan.

**DMARC** — es la política que le dices al mundo sobre qué hacer cuando un correo dice ser de tu dominio pero no tiene firma válida: monitorear (`p=none`), mandar a spam (`p=quarantine`) o rechazar de plano (`p=reject`). Sin esto, cualquiera puede mandar correos haciéndose pasar por tu dominio. Imagina que alguien hace phishing usando el nombre de tu empresa — DMARC es lo que combate eso. Lo usual es arrancar en `p=none` para recolectar reportes, y subir a `quarantine` o `reject` una vez verificas que tus senders legítimos están alineados.

> 📌 **Tip:** Si ya tienes un registro DMARC propio en tu dominio, mantén el tuyo y cópialo tal cual en SendGrid — no lo dupliques. Si no lo tenías, SendGrid te provee uno por defecto con `p=none` cuando activas Automated Security, que sirve para arrancar.

---

## ¿Cómo valido que mis registros están bien?

Aquí viene la parte que a mí me hubiera ahorrado tiempo, y en esta época tiempo igual a dinero, Dinero igual a gastar tokens, me puse filósofo. Antes de mandar un solo correo, valida el estado de tu dominio desde la terminal con el comando `dig`. Si estás en Mac o Linux ya lo tienes instalado, en Windows puedes usar `nslookup`.

```bash
# Validar DKIM key 1
dig CNAME s1._domainkey.tudominio.com +short

# Validar DKIM key 2
dig CNAME s2._domainkey.tudominio.com +short

# Validar DMARC
dig TXT _dmarc.tudominio.com +short

# Validar CNAME de tracking
dig CNAME em94.tudominio.com +short
```

Si los registros están bien, cada comando te devuelve algo así:

```
s1.domainkey.u61394970.wl221.sendgrid.net.
s2.domainkey.u61394970.wl221.sendgrid.net.
"v=DMARC1; p=none; rua=mailto:tucorreo@tudominio.com"
u61394970.wl221.sendgrid.net.
```

Si el comando no devuelve nada o devuelve un valor diferente, el registro no está bien publicado. En ese caso hay que hablar con quien administra el DNS del dominio, porque de nada sirve tener SendGrid configurado si los registros no existen.

> ⚠️ **Importante:** Los cambios en DNS pueden tardar hasta 48 horas en propagarse por todo internet. Si acabas de hacer el cambio y no aparece nada, espera unas horas, esto siempre lo dicen la verdad es que el cambio hasta la fecha me ha reflejado en poco tiempo.

---

## Prueba tu configuración SMTP antes de salir a producción

Validar los registros DNS es solo una parte. El otro punto crítico es confirmar que tu API Key de SendGrid realmente puede enviar correos vía SMTP antes de integrarlo en tu aplicación real.

Para eso construí una herramienta open source que puedes levantar en un solo comando: **[SendGrid SMTP Tester](https://github.com/DakyLabs/SendGrid-SMTP-Tester)**. La idea es simple: tú ingresas tus propias credenciales, seleccionas el puerto y pruebas si todo funciona antes de tocar código de producción.

Para levantarla solo necesitas Docker:

```bash
git clone https://github.com/DakyLabs/SendGrid-SMTP-Tester.git
cd SendGrid-SMTP-Tester
docker compose up --build
```

Luego abres `http://localhost:8888` y tienes una interfaz donde puedes:

- **Probar la conexión** — verifica que tu API Key es válida sin mandar ningún correo
- **Enviar un correo de prueba** — confirma que el flujo completo funciona antes de salir al aire

Los puertos que soporta SendGrid son:

| Puerto | Protocolo | ¿Lo uso?                                            |
| ------ | --------- | --------------------------------------------------- |
| 587    | STARTTLS  | ✅ Sí, el más recomendado                           |
| 2525   | STARTTLS  | ✅ Fallback cuando 587 está bloqueado por la red    |
| 465    | SSL/TLS   | ✅ Sí                                               |
| 25     | Plain     | ⚠️ Casi siempre bloqueado por los ISPs              |

> 🔒 **Nota de seguridad:** La herramienta corre completamente local en tu máquina. Tu API Key viaja solo a `smtp.sendgrid.net` y no se almacena en ningún lado. Nunca subas tu API Key a Git.

---

## El error que casi nadie menciona: compartir dominio con Microsoft 365

Aquí viene uno de los problemas que más duele cuando no lo sabes de antemano. Si el cliente ya tiene Microsoft 365 (Outlook, Teams, Exchange) funcionando con su dominio, el DNS ya tiene registros MX, SPF y DKIM propios de Microsoft.

El problema es que **SPF tiene un límite de 10 consultas DNS** (definido por la RFC 7208). Si ya tienes Microsoft 365 y agregas SendGrid encima sin revisarlo, puedes superar ese límite y tus correos empiezan a fallar de formas muy raras e intermitentes, difíciles de diagnosticar porque a veces llegan y a veces no. Cuando se supera, el SPF retorna un `permerror` y los proveedores tratan el correo como no autenticado.

La solución es consolidar los registros SPF en uno solo:

```
v=spf1 include:spf.protection.outlook.com include:sendgrid.net ~all
```

Un solo registro, dos servicios incluidos. Nunca dos registros SPF separados en el mismo dominio porque eso también rompe todo y es igual de difícil de debuggear.

---

## El warmup de IPs: el paso que todos saltan y todos pagan caro

Imagina que eres nuevo en un barrio y de un día para otro empiezas a repartir miles de volantes en cada veci. Los vecis van a pensar que eres ladrón o el cuentero de Muisne. Lo mismo pasa con el correo electrónico.

Cuando tienes una IP nueva o dedicada en SendGrid, los servidores de Gmail, Outlook y Yahoo no te conocen. Si el primer día mandas 500.000 correos, te bloquean sin pensarlo dos veces. A eso se le llama **warmup** o calentamiento de IPs, y es el proceso de ir aumentando el volumen gradualmente para que los proveedores aprendan que eres legítimo.

Un esquema básico se ve así:

| Días    | Volumen máximo recomendado |
| ------- | -------------------------- |
| 1 - 3   | 200 correos                |
| 4 - 7   | 1.000 correos              |
| 8 - 14  | 10.000 correos             |
| 15 - 21 | 100.000 correos            |
| 22 - 30 | Volumen real               |

> 💡 **Aclaración:** Esta tabla es una referencia general. El esquema exacto depende de tu volumen real y del tipo de envío que estés haciendo.

> ⚠️ **El error que yo cometí:** confiar en que el warmup no necesita un monitoreo. Para volúmenes grandes. Monitorea las métricas de entrega todos los días durante las primeras semanas.

---

## Las métricas que tienes que vigilar sí o sí

Una vez que estás enviando, SendGrid te da un dashboard con todo lo que necesitas. Las métricas críticas son:

**Bounce rate (tasa de rebote)** — si supera el 5% estás en problemas. Significa que estás enviando a correos que no existen o que te están rechazando activamente. Google y Microsoft penalizan los dominios con bounce rate alto y eventualmente te mandan directo al spam de forma permanente.

**Spam reports** — si la gente marca tus correos como spam, SendGrid puede suspenderte la cuenta. La meta es mantenerlo por debajo del 0.1% (Gmail empieza a penalizar a partir del 0.3%).

**Delivered vs Bounced** — la diferencia entre estos dos números te dice la salud real de tu lista de correos. Una lista limpia y actualizada es tan importante como la configuración técnica.

---

## ¿Y si todavía no soy una empresa grande? Existe Resend

No todo proyecto nace con millones de correos al mes. Si estás construyendo tu startup, tu SaaS personal o simplemente quieres una solución más económica mientras creces, vale la pena conocer **[Resend](https://resend.com)**.

Resend es una alternativa moderna a SendGrid, pensada especialmente para developers. La diferencia más notable es su modelo de precios: tiene un plan gratuito generoso de 3.000 correos al mes y 100 al día, y sus planes de pago arrancan mucho más baratos que SendGrid para volúmenes bajos.

Lo que me gusta de Resend es que su integración es muy limpia. En vez de lidiar con configuraciones complejas, tienes una API REST simple y SDKs para casi cualquier lenguaje. Si estás en Node.js, Python o Laravel, estás en casa en minutos.

La configuración de DNS es prácticamente la misma que en SendGrid — DKIM, DMARC, SPF — así que todo lo que aprendiste en este artículo aplica igual.

Mi recomendación: si estás empezando, arranca con Resend. Cuando tu volumen justifique el salto, ya sabes que SendGrid está ahí.

---

## Conclusión

Enviar millones de correos al mes no es una misión imposible, pero tampoco es instalar y listo como uno quisiera. Los puntos más importantes antes de arrancar son: tener los registros DNS correctamente configurados y validados, tener cuidado con SPF si compartes dominio con otros servicios de correo, probar tu configuración SMTP antes de salir a producción, y respetar el proceso de warmup de IPs como si tu reputación dependiera de ello, porque literalmente depende.

La buena noticia es que una vez que está bien configurado, funciona solo. Y cuando funciona bien, es realmente poderoso.

Bueno, un reto más superado, hasta la próxima.
