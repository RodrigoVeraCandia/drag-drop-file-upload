# Agents

# Description

Antes de cada solicitud quiero que digas "Hola, jefazo"

---

## Proyecto: Sistema de Drag & Drop para Subida de Archivos

### 📋 Descripción General
Este proyecto es una aplicación web completa que permite a los usuarios subir archivos mediante drag & drop (arrastrar y soltar) o selección manual. Cuenta con una interfaz moderna, animaciones fluidas y feedback visual en tiempo real.

### 🏗️ Arquitectura del Proyecto

#### Estructura de Archivos
```
/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos y animaciones CSS
├── script.js           # Lógica JavaScript para drag & drop
└── agents.md           # Este archivo (contexto para agentes)
```

### 📁 Archivos del Proyecto

#### **index.html**
- Estructura HTML5 semántica
- Zona de carga interactiva con SVG
- Input file oculto para selección manual
- Contenedor para preview de archivos
- Enlaces a archivos CSS y JavaScript externos

#### **styles.css**
- Diseño responsive y moderno
- Gradientes lineales (púrpura/azul)
- Animaciones CSS:
  - `slideIn`: Para items de archivo
  - Transiciones hover y drag-over
  - Transformaciones scale
- Sistema de badges de estado (uploading, success, error)
- Barra de progreso animada
- Media queries para responsive design

#### **script.js**
Funcionalidades principales:
- **Event Listeners**:
  - Drag & drop events (dragenter, dragover, dragleave, drop)
  - Click handlers para zona de carga y botón
  - Change handler para input file
  
- **Funciones Core**:
  - `handleFiles()`: Procesa archivos seleccionados/arrastrados
  - `previewFile()`: Genera preview visual del archivo
  - `uploadFile()`: Simula carga con barra de progreso
  - `uploadToServer()`: Función comentada para integración con backend
  - `removeFile()`: Elimina archivos de la lista
  - `formatFileSize()`: Formatea bytes a KB/MB/GB
  - `getFileExtension()`: Extrae extensión del archivo

- **Variables Globales**:
  - `uploadedFiles`: Array para almacenar archivos
  - Referencias DOM cacheadas

### 🎨 Características

1. **Drag & Drop**
   - Zona de drop visual con feedback
   - Prevención de comportamiento default del navegador
   - Efectos visuales al arrastrar sobre la zona

2. **Selección Manual**
   - Botón estilizado para explorar archivos
   - Soporte para selección múltiple
   - Input file oculto accesible

3. **Preview de Archivos**
   - Icono con extensión del archivo
   - Nombre completo del archivo
   - Tamaño formateado (Bytes, KB, MB, GB)
   - Barra de progreso animada
   - Badge de estado (Subiendo/Completado/Error)

4. **Gestión de Archivos**
   - Botón de eliminación individual
   - Animación de salida suave
   - IDs únicos por archivo

5. **Diseño Visual**
   - Gradiente de fondo púrpura/azul
   - Cards blancas con sombras
   - Iconos SVG escalables
   - Animaciones smooth
   - Tooltips y feedback visual

### 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: 
  - Flexbox para layouts
  - CSS Grid potencial
  - Animaciones y transiciones
  - Gradientes lineales
  - Box shadows
  
- **JavaScript (Vanilla)**:
  - ES6+ (arrow functions, spread operator, template literals)
  - DOM manipulation
  - Event handling
  - File API
  - Fetch API (preparado para backend)

### 🚀 Funcionalidades Futuras/Pendientes

1. **Integración Backend**
   - Descomentar función `uploadToServer()` en script.js
   - Configurar endpoint de servidor
   - Manejar respuestas y errores del servidor
   - Implementar retry logic

2. **Validaciones**
   - Tamaño máximo de archivo
   - Tipos de archivo permitidos
   - Cantidad máxima de archivos

3. **Mejoras UX**
   - Drag & drop de carpetas completas
   - Preview de imágenes en miniatura
   - Indicador de archivos duplicados
   - Modo oscuro

4. **Seguridad**
   - Validación de tipos MIME
   - Sanitización de nombres de archivo
   - Límites de rate

### 💡 Uso del Proyecto

**Para desarrollo local:**
1. Abrir `index.html` directamente en el navegador
2. Arrastrar archivos a la zona central
3. O hacer click en "Seleccionar archivos"

**Para integración con backend:**
1. Descomentar líneas 127-143 en `script.js`
2. Configurar la URL del endpoint
3. Ajustar el FormData según necesidades del servidor
4. Implementar manejo de errores

### 🎯 Estado Actual

- ✅ Frontend completamente funcional
- ✅ Drag & drop operativo
- ✅ Preview de archivos
- ✅ Animaciones y UI pulida
- ⏳ Backend (simulado pero listo para integrar)
- ⏳ Validaciones de archivo
- ⏳ Manejo de errores robusto

### 📝 Notas para Agentes

- El sistema usa simulación de carga (no hay backend real)
- La barra de progreso es animada con setInterval
- Los archivos se almacenan en array `uploadedFiles` pero no se envían
- El código está listo para agregar un endpoint real
- Todas las funciones son vanilla JS (sin frameworks)
- IDs de archivo se generan con timestamp + random
- El diseño es mobile-first y responsive