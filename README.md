# 📤 Sistema de Drag & Drop para Subida de Archivos

Una aplicación web moderna y elegante que permite subir archivos mediante drag & drop (arrastrar y soltar) o selección manual, con animaciones fluidas y feedback visual en tiempo real.

## ✨ Características

- **🎯 Drag & Drop Intuitivo**: Arrastra archivos directamente a la zona de carga
- **📁 Selección Manual**: Botón para explorar y seleccionar archivos del sistema
- **👁️ Preview de Archivos**: Visualiza nombre, tamaño y extensión de cada archivo
- **📊 Barra de Progreso**: Animación de carga en tiempo real
- **🗑️ Gestión de Archivos**: Elimina archivos individualmente con animaciones suaves
- **📱 Diseño Responsive**: Se adapta perfectamente a cualquier dispositivo
- **🎨 Interfaz Moderna**: Gradientes, sombras y animaciones CSS elegantes

## 🚀 Inicio Rápido

### Usar directamente en el navegador

1. Clona este repositorio:
```bash
git clone https://github.com/tu-usuario/drag-drop-upload.git
cd drag-drop-upload
```

2. Abre `index.html` en tu navegador favorito

### Usar con servidor local

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server
```

Luego abre http://localhost:8000 en tu navegador.

## 📂 Estructura del Proyecto

```
/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos y animaciones CSS
├── script.js           # Lógica JavaScript para drag & drop
├── agents.md           # Documentación para agentes/colaboradores
└── README.md           # Este archivo
```

## 🔧 Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Animaciones, gradientes, flexbox
- **JavaScript Vanilla**: Sin dependencias externas

## 🎯 Uso

1. **Arrastra archivos** a la zona central de carga
2. **O haz clic** en "Seleccionar archivos" para elegir manualmente
3. **Visualiza el progreso** de cada archivo
4. **Elimina archivos** si es necesario con el botón "Eliminar"

## 🔌 Integración con Backend

Para conectar con un servidor backend, descomenta y modifica la función `uploadToServer()` en `script.js` (líneas 127-143):

```javascript
async function uploadToServer(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await fetch('/tu-endpoint', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            console.log('Archivo subido correctamente:', file.name);
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}
```

## 📋 Próximas Mejoras

- [ ] Validación de tipos de archivo
- [ ] Límite de tamaño de archivo
- [ ] Preview de imágenes en miniatura
- [ ] Drag & drop de carpetas completas
- [ ] Modo oscuro
- [ ] Integración con servicios de almacenamiento en la nube

## 📄 Licencia

MIT License - Siéntete libre de usar este proyecto como desees.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Siéntete libre de abrir issues o pull requests.

---

Hecho con ❤️ usando JavaScript Vanilla
