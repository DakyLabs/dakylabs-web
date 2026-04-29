---
title: "Utilizo Claude Code o Antigravity, no los dos juntos"
description: "Si utilizo Claude Code no puedo usar Antigravity, Gemini no contesta ni hace nada."
pubDate: 2026-04-15
category: IA
author: DakyLabs
image: /images/posts/Utilizo-claude-code-o-Antigravity-no-los-dos.jpg
draft: false
---

La IA está de moda. Por eso me lancé a construir una aplicación con agentes desde Antigravity, "sin escribir nada" (eso decía la promesa). Hasta que se me acabaron los tokens.

Como necesitaba seguir, abrí Claude Code desde la app de escritorio. Y ahí empezó el problema.

## El síntoma

Después de empezar a usar Claude Code, Antigravity dejó de responder en su IDE. Gemini no contesta, los agentes quedan en silencio, los prompts se envían y nunca vuelven. No es un error  es peor: es un IDE que abre, carga, y no hace absolutamente nada.

## Lo que probé (y no funcionó)

- Cerrar y reabrir Antigravity.
- Reinstalar la extensión.
- Cerrar Claude Code completo, no solo minimizarlo.
- Limpiar caché y sesiones de Google.
- Cambiar de cuenta.
- Reiniciar la máquina.
- Esperar (a veces los servicios se recuperan solos).

Nada. Antigravity sigue muerto en mi setup y no logré que volviera a funcionar.

## Lo que probé (y si funcionó)

Al crear un nuevo proyecto en una nueva carpeta ya todo regresó a la normalidad , y cuando volvi nuevamente al proyecto no valió, entonces algo se daño en ese proyecto y murio la IA solo para ese proyecto.

## La hipótesis

Mi sospecha es que hay un conflicto a nivel de sesión, tokens o procesos en background entre las dos herramientas. Algo que Claude Code "agarra" y Antigravity ya no logra recuperar o alguna sesión de Google que cambia y deja a Antigravity sin acceso a su backend.

No tengo evidencia técnica para afirmarlo. Y honestamente no tengo el tiempo para analizar punto a punto más pistas, lo unico que se es que en ese proyecto ya no responde la Ia de antigravity.

## El punto de fondo

Este pequeño inconveniente dejó algo claro: a futuro las IA van a tener que aprender a convivir. Hoy ya tenemos Claude, Gemini, Copilot, Cursor, Antigravity, Windsurf, ChatGPT como agente y la lista crece cada mes. Si cada herramienta asume que es la única instalada en mi máquina, vamos a vivir saltando entre IDEs y cerrando procesos para que no se peleen.

Soy un soñador, lo sé. Pero es algo que las empresas que están construyendo estos productos deberían tomar en cuenta: el desarrollador real no usa una sola IA, usa la que mejor funcione para cada cosa.

Mientras tanto: si vas a usar Claude Code y Antigravity en la misma máquina, elige uno por sesión y cierra todo lo demás. Y si encuentras la solución para que coexistan, escríbeme.