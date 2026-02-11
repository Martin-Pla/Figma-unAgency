# Configuración de Resend para el Formulario de Contacto

## Instalación

El paquete `resend` ya está agregado a `package.json`. Para instalarlo, ejecuta:

```bash
npm install
```

## Configuración de Variables de Entorno

### Para Vercel (Producción)

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Navega a **Settings** > **Environment Variables**
3. Agrega la variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Tu API key de Resend (obtén una en [resend.com/api-keys](https://resend.com/api-keys))

### Para Desarrollo Local

Si estás usando Vercel CLI para desarrollo local:

```bash
vercel env add RESEND_API_KEY
```

O crea un archivo `.env.local` en la raíz del proyecto:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Estructura de Archivos

El proyecto incluye dos implementaciones:

1. **`api/send.js`** - Función serverless de Vercel (funciona con React)
2. **`app/api/send/route.ts`** - API Route de Next.js (si migras a Next.js)

## Uso

El componente `Contact.jsx` ya está configurado para usar la API. El formulario enviará automáticamente a `/api/send` cuando se despliegue en Vercel.

## Verificar Dominio en Resend

**Importante**: Para enviar emails desde tu dominio personalizado:

1. Ve a [Resend Dashboard](https://resend.com/domains)
2. Agrega y verifica tu dominio
3. Actualiza el campo `from` en `api/send.js` o `app/api/send/route.ts`:

```javascript
from: 'The unAgency Contact <contacto@theunagencyco.com>',
```

Por ahora, el email se envía desde `onboarding@resend.dev` (dominio de prueba de Resend).

## Testing

Para probar localmente con Vercel:

```bash
vercel dev
```

Esto iniciará el servidor de desarrollo con las funciones serverless funcionando.

## Troubleshooting

- **Error 500**: Verifica que `RESEND_API_KEY` esté configurada correctamente
- **Error 400**: Verifica que los campos del formulario estén completos
- **Emails no llegan**: Revisa la consola de Resend para ver los logs de envío
