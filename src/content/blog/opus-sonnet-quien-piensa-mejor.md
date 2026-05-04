---
title: "Claude Code, Opus o Sonnet: 100 dólares bien invertidos o mal gastados"
description: "Usé Opus para diseñar y construir toda mi aplicación, ya que sentía que Sonnet era menos listo y podía romper algo"
pubDate: 2026-05-04
category: IA
author: DakyLabs
image: /images/posts/opus-o-sonnet-cuando-usar-cada-modelo.jpg
draft: false
---

Quise ser un departamento de desarrollo entero, el hombre orquesta, y terminé quemando mi cuota semanal en solo cuatro días y consumiendo saldo de tokens adicionales. ¿Mi error? Cometí el pecado del developer moderno, usar Opus 4.7 para absolutamente todo, arquitectura, código, debugging, preguntas tontas. Todo.

Confié en los poderes sobrenaturales de Claude Code. Total, Claude sabe lo que hace, ¿no? (por defecto escoge el modelo Opus 4.7).

Y ahí empezó la pregunta que ahora me hago cada vez que utilizo Claude Code.

## Dos formas de usar Claude Code, dos realidades

Antes de entrar al tema de los modelos, hay algo que al principio me confundía, Claude Code no es una sola cosa.

**Plugin de VS Code** — lo instalas como extensión, funciona dentro del editor, ideal si quieres integración visual. Con una cuenta normal de Claude.ai ya puedes usarlo, pero los límites de uso son los de tu plan.( El plan de 20 dólares se esfuma como arena entre las manos, así que para un uso diario y constante no hay otra opción que contratar el plan de 100 dólares, el precio de vivir esta época de IA)

**CLI (terminal)** — `npm install -g @anthropic/claude-code`, se conecta directo a la API. Aquí el costo lo pagas tú por token, tienes control total del modelo que usas y no hay límites artificiales de plan. Es la versión seria para proyectos grandes.

Mi recomendación: empieza con el plugin para explorar. Cuando el proyecto crezca o los límites te frenen, migra al CLI y controla tú el gasto.

## Muchos modelos poca explicación, ¿cada modelo es más inteligente que otro?

Anthropic tiene tres modelos activos hoy: **Opus**, **Sonnet** y **Haiku**. Suenan a jerarquía y lo son, pero no de la forma en que uno imagina.

La diferencia en rendimiento real de código entre Opus 4.7 y Sonnet 4.6 es de **8 puntos** en SWE-bench — el benchmark que mide bugs reales de GitHub. Opus saca 87.6%, Sonnet 79.6%. Y Sonnet cuesta 40% menos y responde 41% más rápido. (Eso le pregunté a la IA, a la final son el nuevo Google)

Para el trabajo del día a día, esa diferencia no se nota. Pero cuando el problema es real, Opus sí gana pero es un devorador de tokens.

## Lo que Haiku hace

Haiku es el modelo que uno ignora. Y es un error.

Haiku 4.5 cuesta cinco veces menos que Sonnet. No está diseñado para razonar ni para escribir código complejo, pero es perfecto para clasificar intenciones, enrutar mensajes, detectar si un usuario saludó o tiene una pregunta real, validar formatos. Todo lo que en un agente pasa antes de llamar al modelo grande.

Si tienes un chatbot o un agente y cada saludo del usuario te cuesta un request a Sonnet o Opus, Haiku es la respuesta. Lo haces trabajar de portero y reservas el modelo serio para lo que importa.

## Cuándo Opus sí justifica lo que cobra o lo que consume en tokens

Hay casos donde gana con claridad según mi experiencia:

Cuando diseñas arquitectura de un sistema complejo con varias piezas interdependientes, **Opus toma mejores decisiones que no tendrás que rehacer después**. Eso lo comprobé en mi propio proyecto.

Cuando hay un bug que parece complicado o en mi caso, según mi olfato afectaba al rendimiento de mi aplicación, **Opus traza la cadena de causas con más profundidad**.

Y hay algo que casi pasa desapercibido: **Agent Teams** es exclusivo de Opus. Permite lanzar múltiples instancias de Claude trabajando en paralelo en distintas partes del mismo proyecto al mismo tiempo. Un agente escribe los tests mientras otro refactoriza el módulo. Sonnet no puede hacer eso.

## El truco que Claude Code tiene escondido para los que no les gusta leer la documentación

Claude Code tiene un alias que se llama `opusplan` y que hace algo inteligente, usa Opus en modo planning para razonar la arquitectura y cambia automáticamente a Sonnet en modo execution para generar el código. Lo puedes activar con:

```bash
claude --model opusplan
```

Es exactamente lo que yo terminé haciendo a mano sin saber que ya existía. Lastimosamente me costó una semana de mi vida darme cuenta.

## El punto de fondo

Después de todo esto llegué a una regla simple, Sonnet por defecto, Opus solo cuando realmente lo necesito. Y Haiku para todo lo que no requiere pensamiento real.

Lo que sí me llama la atención es otra cosa, Anthropic bajó el precio de Opus en 2026. Eso dice algo sobre hacia dónde va esto, los modelos grandes se van a volver baratos hasta que dejen de ser un lujo y se conviertan en infraestructura. Por ahora son unos devoradores de tokens y lo que se traduce en dinero.

Mientras tanto, si abres Claude Code y no cambias el modelo, desde el 23 de abril de 2026 el default es Opus 4.7 para usuarios Enterprise y API. No porque Anthropic quiera que gastes más. Sino porque ya les salía barato ofrecerlo así (según ellos, pero la verdad es que sí es un devorador de tokens).

Hoy el problema no es elegir el modelo más poderoso.
El problema es saber cuándo ese poder realmente cambia el resultado.
Y eso, para los que pagamos por token o por plan, es la diferencia entre una herramienta y un gasto.
