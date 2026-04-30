---
title: "Tienes Google Workspace Business Plus (Un ferrari) y lo administras como si fuera Hotmail 2003 (Una bicicleta)"
description: "Pagas una licencia empresarial y la usas para mandar correos. Apps Script, AppSheet y la seguridad básica están ahí esperando que las actives."
pubDate: 2025-06-18
category: Workspace
author: DakyLabs
image: /images/posts/workspace-ferrarri-0-bicicleta.jpg
draft: false
---

La semana pasada revisé el entorno de una empresa que paga Google Workspace Business Plus, y lo usaban solo para correo y Drive.

Voy a decirte algo que tal vez ya sabes: Google Workspace tiene herramientas empresariales de primer nivel (por algo pagas la licencia). El problema es que muchas organizaciones lo administran como si fuera un servicio de correo gratuito: lo usan para Gmail, Drive y poco más.

Lo que sigue es lo que normalmente encuentro y lo que vale la pena activar.

## Lo que ya pagaste y no estás usando

### 1. Apps Script: automatización incluida en la licencia

Apps Script es JavaScript corriendo dentro de Workspace, con acceso directo a Gmail, Drive, Calendar, Sheets y Docs. Sin servidor, sin despliegue, sin costo adicional.

Casos reales que veo todas las semanas hechos a mano:

- Reportes mensuales que alguien copia y pega de Sheets a un Doc y envía por correo.
- Facturas que llegan a Gmail y alguien las descarga, las renombra y las guarda en una carpeta de Drive.
- Aprobaciones que viajan en hilos de correo sin trazabilidad.

Todo eso son entre 30 y 80 líneas de código que se escriben una vez y corren para siempre.

```javascript
// Guarda adjuntos PDF de un remitente en una carpeta de Drive
function archivarFacturas() {
  const hilos = GmailApp.search('from:facturas@proveedor.com has:attachment newer_than:7d');
  const carpeta = DriveApp.getFolderById('ID_CARPETA');
  hilos.forEach(h => h.getMessages().forEach(m =>
    m.getAttachments().filter(a => a.getContentType() === 'application/pdf')
      .forEach(a => carpeta.createFile(a))
  ));
}
```

### 2. AppSheet: apps internas sin programar

AppSheet viene incluido en Business Plus. Convierte una hoja de Sheets en una app móvil/web con formularios, fotos, escaneo de código de barras, notificaciones y flujos de aprobación.

Lo que normalmente se construye con tres reuniones, una cotización a un proveedor y dos meses de espera, lo arma una persona en una tarde:

- Inventario en bodega con captura desde el celular.
- Solicitudes de vacaciones o gastos con flujo de aprobación.
- Levantamiento en campo (visitas, mantenimientos, auditorías).
- Tickets internos para soporte de TI.

### 3. ¿No sabes por dónde empezar? Para eso pagaste la IA

Si tienes Gemini en tu licencia (o Workspace con IA), úsalo. Le describes el problema "necesito un script que cada lunes me arme un resumen de los correos sin responder y me lo envíe" y te entrega un primer borrador funcional. Lo mismo con AppSheet: le pasas el contexto y te ayuda a definir tablas, vistas y reglas.

No tienes que ser desarrollador. Tienes que saber qué quieres automatizar.

## La parte aburrida pero crítica: seguridad

Mientras estás abriendo Admin Console, aprovecha y arregla lo que viene apagado por defecto:

- **2FA obligatorio**: Seguridad → Verificación en 2 pasos → Obligatorio. Dos clics.
- **Drive sin compartir al mundo**: el default permite "cualquiera con el enlace". Cámbialo a interno.
- **OAuth de terceros**: Seguridad → Controles de API. Vas a encontrar apps que un empleado autorizó hace cuatro años y siguen con acceso a su correo.
- **Phishing y malware avanzado en Gmail**: Apps → Gmail → Seguridad. Gratis, desactivado por defecto.
- **Sesiones con expiración**: 8 horas en web, reautenticación mensual en móvil.
- **Alertas de auditoría**: login desde país inusual, descarga masiva, cambios en permisos de admin.

Google tiene una herramienta integrada que audita esto: **Security Health Advisor** en Admin Console → Seguridad. 

## El argumento que siempre escucho

"Los usuarios se van a quejar si activamos restricciones o cambiamos cómo trabajan."

Sí. Una semana. Después se olvidan, siguen trabajando, y ahora la organización tiene 40% menos superficie de ataque y procesos que antes tomaban horas corriendo solos.

La alternativa es esperar al incidente.

El problema no es la herramienta. Es no saber qué ya tienes disponible.
Y en muchos casos, las empresas ya pagaron por soluciones que podrían ahorrarles horas de trabajo, pero nadie las está usando.
