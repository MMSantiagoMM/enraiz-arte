# Enraiz-Arte - Corporación Cultural

Enraiz-Arte es una plataforma web moderna diseñada para la **Corporación Cultural Enraiz-Arte**, enfocada en la promoción del turismo comunitario, la formación artística y el rescate de tradiciones ancestrales. La aplicación ofrece una experiencia inmersiva, bilingüe y dinámica para conectar a la comunidad con su territorio.

## 🚀 Tecnologías Utilizadas

La plataforma ha sido construida utilizando un stack tecnológico moderno enfocado en el rendimiento y la escalabilidad:

### Frontend
- **React 19**: Biblioteca principal para la construcción de la interfaz de usuario.
- **Vite 6**: Herramienta de construcción (build tool) de última generación para un desarrollo rápido.
- **Tailwind CSS**: Framework de diseño para estilos personalizados y responsivos.
- **React Router DOM v7**: Gestión de navegación y rutas dinámicas.
- **Lucide React**: Set de iconos elegantes y consistentes.
- **Context API**: Gestión de estado global para el sistema de idiomas (ES/EN) y autenticación.

### Backend y Servicios (Firebase)
- **Firebase Auth**: Sistema de autenticación seguro para el panel de administración.
- **Cloud Firestore**: Base de datos NoSQL para la gestión de rutas turísticas, talleres y contenido multimedia.
- **Firebase App Hosting**: Implementación y despliegue continuo de la aplicación.
- **Docker**: Contenerización de la aplicación para entornos de servidor.

---

## 🛠️ Funcionamiento de la Página

La web está estructurada en secciones modulares que permiten una navegación fluida (Single Page Application):

### 1. Secciones Principales
- **Hero**: Introducción visual impactante con la misión de la corporación.
- **Nuestra Esencia (About)**: Detalle de la misión, visión e identidad de la corporación ("Quiénes Somos").
- **Turismo Comunitario**: Catálogo de rutas gestionadas desde la base de datos con sistema de reserva directa.
- **Talleres de Música**: Sección dedicada a la formación artística, con formularios de inscripción integrados.
- **Multimedia**: Galería dinámica que incluye videos, fotos y contenido variado directamente desde Firestore.
- **Donaciones**: Información bancaria y fiscal para apoyar la misión cultural.

### 2. Características Especiales
- **Multilenguaje (i18n)**: Soporte completo para Español e Inglés con cambio instantáneo sin recargar la página.
- **Diseño Premium**: Uso de micro-animaciones, gradientes suaves y tipografía moderna para una experiencia de usuario de alto nivel.
- **Sistema de Reservas**: Los usuarios pueden solicitar cupos en rutas y talleres, cuyos datos se almacenan de forma estructurada.

### 3. Panel de Administración
Acceso restringido para gestores de la corporación que permite:
- Gestionar (Crear, Editar, Eliminar) rutas turísticas.
- Administrar el catálogo de talleres.
- Subir y organizar contenido multimedia.
- Visualizar solicitudes de contacto y reservas.

---

## 📦 Instalación y Desarrollo Local

Para ejecutar este proyecto en tu entorno local:

1. **Clonar el repositorio**
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Configurar Firebase:**
   Crea un archivo `.env` con tus credenciales de Firebase configuradas en `src/firebase/config.js`.
4. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
5. **Construir para producción:**
   ```bash
   npm run build
   ```

---

## 🌐 Despliegue

El proyecto está configurado para desplegarse automáticamente en **Firebase App Hosting**. La configuración de hosts permitidos y puertos está optimizada en `vite.config.js` para asegurar que las vistas previas funcionen correctamente en el entorno de Google Cloud.
