---
title: "Optimizando Costos en GCP: proformar no es lo mismo que estimar consumo"
description: "Descubre cómo reducir tu factura de Google Cloud Platform sin sacrificar rendimiento. Estrategias del día a día."
pubDate: 2026-03-15
category: GCP
author: DakyLabs
image: /images/posts/optimizando-costos-gcp.jpg
---

He visto facturas de GCP crecer sin control no porque la arquitectura esté mal… sino porque nadie revisa lo que ya está corriendo.

## El problema real del costo en la nube

Cuando una empresa, startup, institución o persona decide llevar su infraestructura a la nube (eso sería lo ideal para todos los proveedores de nube pública), lo primero que se debería realizar es : ingresar a la calculadora de GCP y estimar el costo de los servicios que necesita. Pero no deja de ser una estimación.

En la emoción del momento se puede cometer pequeños errores: **provisionar en exceso por miedo a quedarse sin recursos**. El resultado es una factura mensual que puede ser mayor de lo necesario y no es fácil volver atrás.


## Las 5 fuentes principales de desperdicio

### 1. Instancias siempre encendidas sin necesidad

El gasto más común: instancias de Compute Engine corriendo 24/7 cuando solo se usan 8 horas al día.

**Solución**: Usar Cloud Scheduler para detener y reiniciar instancias automáticamente:

```bash
# Detener instancias de dev a las 8pm
gcloud scheduler jobs create http stop-dev-instances \
  --schedule="0 20 * * 1-5" \
  --uri="https://compute.googleapis.com/compute/v1/projects/PROJECT/zones/ZONE/instances/INSTANCE/stop"
```

O se puede utilizar instancias tipo spot (lo malo, se pueden apagar en cualquier momento, justo cuando ya estás solucionando un Bug, pero son mucho más baratas).

Esto solo ya puede representar un **40-60% de ahorro** en entornos de desarrollo.

### 2. Storage sin lifecycle policies

Datos que nadie accede después de 90 días permaneciendo en Standard Storage a $0.020/GB cuando podrían estar en Coldline a $0.004/GB.

```json
{
  "lifecycle": {
    "rule": [
      {
        "action": { "type": "SetStorageClass", "storageClass": "NEARLINE" },
        "condition": { "age": 30 }
      },
      {
        "action": { "type": "SetStorageClass", "storageClass": "COLDLINE" },
        "condition": { "age": 90 }
      }
    ]
  }
}
```

Porque 30 días, hay que tener en consideración los tiempos mínimos de permanencia en cada clase de almacenamiento, si no se cumple con ese tiempo, se cobrará una penalización por el tiempo restante. (bienvenidos a la nube)

### 3. BigQuery sin control de queries

Una sola query mal escrita puede procesar terabytes innecesarios y generar costos inesperados.

### 4. Egress de datos ignorado

El costo de salida de datos entre regiones puede ser invisible hasta que explota. Revisar la arquitectura

### 5. Cloud SQL sobreaprovisionado

Una base de datos MySQL con 64GB de RAM para una app que usa 4GB en promedio.

## La herramienta más subestimada: Recomendaciones o Recommender API

En la consola de GCP se puede ver en la sección de costos, recomendaciones de optimización, que muchas veces no tomamos en cuenta, pues hay que analizar esos datos.

Google Cloud también tiene una API nativa que identifica recursos subutilizados:

```bash
gcloud recommender recommendations list \
  --recommender=google.compute.instance.MachineTypeRecommender \
  --location=us-central1-a \
  --project=mi-proyecto
```

Actívala. Es gratuita y puede encontrar ahorros que no verías manualmente.

## El resultado de aplicar esto

Los ahorros se notan en la factura mensual. No porque se sacrifique rendimiento, sino porque gran parte del gasto viene de recursos que nadie está usando activamente.

Optimizar costos en la nube no es un tema financiero.
Es un tema de disciplina técnica.
Y la mayoría del ahorro no viene de hacer algo complejo, sino, de dejar de pagar por lo que nadie usa.


