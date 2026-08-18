# Cotizador — Taller Láser

Sistema propio, no depende de Claude.ai. Corre en tu PC o en cualquier servidor con Node.js.

## 1) Requisito único: Node.js

Si no lo tenés instalado: bajalo de https://nodejs.org (elegí la versión "LTS") e instalalo como cualquier programa.

## 2) Correrlo en tu PC (para tu taller, misma wifi)

Abrí una terminal / símbolo del sistema dentro de esta carpeta y ejecutá, una sola vez:

```
npm install
```

Después, cada vez que quieras usar el sistema:

```
npm start
```

Vas a ver un mensaje como:

```
✅ Taller Láser corriendo.
   En esta PC:        http://localhost:4000
   En la red local:   http://<IP-de-esta-PC>:4000
```

- **En tu propia PC**: abrí ese link `http://localhost:4000` en el navegador.
- **En las PC de tus empleados (misma wifi del taller)**: necesitás la IP de la PC donde corre el servidor.
  - Windows: abrí `cmd` y escribí `ipconfig`, buscá "Dirección IPv4" (ej: 192.168.0.15).
  - Mac: `Preferencias del Sistema → Red`, ahí ves la IP.
  - Después, en las otras PCs, entrar a `http://192.168.0.15:4000` (con la IP que te dio a vos).
- Dejá la terminal abierta mientras lo estén usando. Si la cerrás, el servidor se apaga (podés volver a abrirlo con `npm start` cuando quieras).

Tus datos (materiales, clientes, presupuestos) quedan guardados en el archivo `data/store.json`. **Hacé una copia de ese archivo de vez en cuando** como respaldo (o entrá a `http://localhost:4000/api/backup` para descargar todo en un archivo).

## 3) Subirlo a internet (para acceder desde cualquier lado)

La forma más simple y gratuita para empezar es **Render.com**:

1. Creá una cuenta gratis en https://render.com
2. Subí esta carpeta a un repositorio de GitHub (si no sabés cómo, contame y te guío paso a paso, o pedime que te lo suba yo).
3. En Render: "New +" → "Web Service" → conectá tu repositorio de GitHub.
4. Configuración:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Creá el servicio. Render te da una URL pública (algo como `https://tu-taller.onrender.com`) a la que vos y tus empleados pueden entrar desde cualquier lugar con internet.

⚠️ Importante sobre el plan gratuito de Render: el servidor "se duerme" tras 15 minutos sin uso y tarda ~30 segundos en despertar la próxima vez que alguien entra. Para un taller chico está bien. Si en el futuro se vuelve molesto, hay planes pagos desde ~7 USD/mes que lo mantienen siempre activo.

⚠️ Los datos en el plan gratuito de Render **no son permanentes** (se puede perder el archivo `data/store.json` si el servicio se reinicia). Para uso serio en producción, cuando estés listo, conviene sumar un "disco persistente" (Render lo ofrece, tiene un costo bajo) o migrar a una base de datos real. Avisame cuando llegues a esa etapa y lo resolvemos juntos.

## Si algo no arranca

Mandame el mensaje de error que te aparece en la terminal y lo resolvemos.
