# SENA Parking Mobile

Versión móvil de SENA Parking basada en el backend del proyecto web y en la estructura de referencia App-Movil-SenaParking.

## 1. Backend

```bash
cd Back
npm install
npm start
```

El backend usa el puerto 3000 por defecto.

## 2. Front móvil

Crea `FrontMovil/.env` a partir de `.env.example` y coloca la IP LAN del computador donde corre el backend:

```env
EXPO_PUBLIC_API_URL=http://TU-IP:3000
```

Ejemplo:

```env
EXPO_PUBLIC_API_URL=http://10.233.15.141:3000
```

Luego:

```bash
cd FrontMovil
npm install
npx expo start
```

El teléfono y el computador deben estar en la misma red Wi-Fi cuando se usa una IP local.

## Funcionalidades móviles

### Aprendiz
- Inicio amigable.
- Menú hamburguesa superior.
- Visualización del carnet y QR.
- Petición de carnet con formulario, fotos y documentos.
- Actualización de datos personales o vehículo mediante solicitud.
- Soporte técnico con asunto, descripción y estado.
- Notificaciones con contador y opción para marcarlas como leídas.
- Manual de uso.
- Cerrar sesión.

### Guarda
- Inicio.
- Escaneo de QR con cámara.
- Registro/historial de entradas y salidas con paginación.
- Manual.
- Cerrar sesión.

### Administrador
- Peticiones de carnet: aprobar, rechazar y generar carnet.
- Peticiones de actualización: aprobar y rechazar.
- Vehículos.
- Bloqueos/desbloqueos.
- Reportes.
- Centros de formación con creación, edición y eliminación.
- Tipos de documento con sigla, nombre, edición y eliminación.
- Usuarios.
- Soporte técnico.
- Entradas y salidas.

### Recuperación de contraseña
1. Se solicita el PIN por correo.
2. Se verifica el PIN de 6 dígitos.
3. La app permite crear una nueva contraseña.

> En la configuración actual del backend, el PIN se muestra en la consola del servidor si no hay un proveedor de correo configurado.
