# PRINT BOX — Guía rápida (ndk_dev)

Sitio Next.js 15 (App Router) + Payload CMS 3 + PostgreSQL + Tailwind v4.

---

## 1. Cambiar el logo de la empresa

El logo se carga **desde el panel admin** y aparece automáticamente en el header y en todos los lugares que lo consuman.

1. Iniciá sesión en [http://localhost:3000/admin](http://localhost:3000/admin).
2. Andá a **Globals → Header**.
3. Subí tu imagen en el campo **Logo** (PNG/SVG, idealmente con fondo transparente, altura ≈ 36px renderizada).
4. Opcionalmente cambiá el **logoText** (placeholder cuando no hay imagen).
5. Guardá. El cambio se ve al recargar.

### ¿Dónde está el código que pinta el logo?

| Archivo | Qué hace |
|---|---|
| [src/globals/Header.ts](src/globals/Header.ts) | Define los campos del header en Payload (logo, logoText, navItems). |
| [src/components/Header.tsx](src/components/Header.tsx) | Componente UI que renderiza el `<img>` cuando hay `logoUrl`, o el texto si no. |
| [src/app/(frontend)/layout.tsx](src/app/(frontend)/layout.tsx) | Lee el global `header` de Payload y pasa `logoUrl` al componente `<Header>`. |

Si querés un logo **fijo en el código** (sin pasar por el CMS) reemplazá el `<Image>` de [src/components/Header.tsx](src/components/Header.tsx#L19-L27) por tu archivo importado de `public/`.

---

## 2. Agregar una página nueva al navbar

El menú se arma desde el global **Header → navItems** (admin) o, si está vacío, desde la lista por defecto en [src/app/(frontend)/layout.tsx](src/app/(frontend)/layout.tsx) (`DEFAULT_NAV`).

### Opción A — Sólo desde el admin (no requiere código)

1. Andá a **Globals → Header → navItems** en `/admin`.
2. Agregá un item con `label` y `href` (ej.: `Servicios` → `/servicios`).
3. Guardá.

> ⚠️ Si el `href` apunta a una ruta inexistente, el link va a dar 404. Tenés que crear la página (paso B).

### Opción B — Crear la ruta en código

1. Creá la carpeta y archivo:

   ```
   src/app/(frontend)/<slug>/page.tsx
   ```

   Ejemplo para `/servicios`: `src/app/(frontend)/servicios/page.tsx`.

2. Plantilla mínima reutilizable (copiable):

   ```tsx
   import Container from '@/components/Container'
   import SectionHeader from '@/components/SectionHeader'

   export const metadata = {
     title: 'Servicios — PRINT BOX',
     description: 'Servicios de impresión 3D ofrecidos por PRINT BOX en La Paz, Bolivia.',
   }

   export default function ServiciosPage() {
     return (
       <section className="py-20">
         <Container>
           <SectionHeader
             eyebrow="Qué ofrecemos"
             title="Nuestros servicios"
             description="Descripción corta de la página."
           />
           {/* Tu contenido acá */}
         </Container>
       </section>
     )
   }
   ```

3. Sumá el link al navbar de una de estas dos formas:

   - **Recomendado (sin redeploy):** agregalo en `/admin → Globals → Header → navItems`.
   - **Por defecto en código:** editá el array `DEFAULT_NAV` en [src/app/(frontend)/layout.tsx](src/app/(frontend)/layout.tsx) y sumá `{ label: 'Servicios', href: '/servicios' }`.

4. Listo: refresh y aparece tanto en el navbar como en el footer (si lo agregás también ahí en [src/components/Footer.tsx](src/components/Footer.tsx)).

---

## 3. Tema claro / oscuro

- El usuario puede alternar tema con el botón redondo (sol/luna) a la derecha del navbar.
- Se guarda en `localStorage` (`printbox-theme`) y respeta `prefers-color-scheme` la primera vez.
- Todos los colores salen de variables CSS en [src/app/(frontend)/styles.css](src/app/(frontend)/styles.css):
  - `--bg-base`, `--bg-elevated`, `--bg-muted`
  - `--fg-base`, `--fg-muted`, `--fg-subtle`
  - `--border-base`, `--border-strong`
  - `--accent` (verde en claro, neón en oscuro), `--accent-contrast`
- Para mantener consistencia, **usá las variables** en los nuevos componentes:
  `className="bg-[var(--bg-elevated)] text-[var(--fg-base)]"`.

---

## 4. Redes sociales (habilitar / deshabilitar)

En `/admin → Globals → Footer & Contacto → Redes sociales`. Cada plataforma tiene su propio checkbox **activo** y URL:

- Facebook
- Instagram
- TikTok

Si destildás el checkbox, el botón desaparece del footer.

---

## 5. Datos de contacto

Editables en `/admin → Globals → Footer & Contacto → Datos de contacto`:

- Dirección — *Pasaje 27 de Noviembre, Adolfo Borda, 0000 El Alto, La Paz — Bolivia*
- Teléfono — *+591 65696932*
- WhatsApp (formato internacional, ej.: `+59165696932`)
- Email
- Número de referencia / NIT

Se muestran en:
- La **franja debajo del header** ([ContactStrip](src/components/ContactStrip.tsx)) — visible en todas las páginas.
- La **columna “Contacto” del footer** ([Footer](src/components/Footer.tsx)).
- La página **Acerca de** ([src/app/(frontend)/acerca-de/page.tsx](src/app/(frontend)/acerca-de/page.tsx)).

---

## 6. Comandos útiles

```bash
npm run dev                # arranca Next.js (http://localhost:3000)
npm run generate:types     # regenera src/payload-types.ts
npm run build && npm start # producción
```

---

Desarrollado por **ndk_dev**.
