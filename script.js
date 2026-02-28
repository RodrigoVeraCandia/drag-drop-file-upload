// Configuración del sistema
const CONFIG = {
    maxFileSize: 10 * 1024 * 1024, // 10 MB
    allowedExtensions: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'txt', 'zip', 'rar'],
    maxFiles: 10
};

// Elementos del DOM (Se inicializan solo si no estamos en modo test)
const uploadArea = typeof document !== 'undefined' ? document.getElementById('uploadArea') : null;
const fileInput = typeof document !== 'undefined' ? document.getElementById('fileInput') : null;
const browseBtn = typeof document !== 'undefined' ? document.getElementById('browseBtn') : null;
const filesPreview = typeof document !== 'undefined' ? document.getElementById('filesPreview') : null;

// Array para almacenar archivos
let uploadedFiles = [];

// Función para prevenir comportamiento predeterminado
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Inicialización de event listeners (solo en navegador, no en tests)
if (typeof document !== 'undefined' && uploadArea && fileInput && browseBtn) {
    // Prevenir comportamiento predeterminado para drag & drop en toda la página
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Efectos visuales para la zona de carga
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });

    // Manejar el drop de archivos
    uploadArea.addEventListener('drop', handleDrop, false);

    // Click en el área de carga o botón
    uploadArea.addEventListener('click', () => fileInput.click());
    browseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    // Selección de archivos mediante input
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
}

// Funciones auxiliares
function highlight(e) {
    if (uploadArea) uploadArea.classList.add('drag-over');
}

function unhighlight(e) {
    if (uploadArea) uploadArea.classList.remove('drag-over');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

// Procesar archivos
function handleFiles(files) {
    [...files].forEach(file => {
        // Validar archivo antes de procesar
        if (!validateFile(file)) {
            return; // Skip archivo inválido
        }
        
        // Verificar límite de archivos
        if (uploadedFiles.length >= CONFIG.maxFiles) {
            showNotification(`Máximo ${CONFIG.maxFiles} archivos permitidos`, 'error');
            return;
        }
        
        uploadedFiles.push(file);
        previewFile(file);
        uploadFile(file);
    });
}

// Validar archivo
function validateFile(file) {
    // Validar tamaño
    if (file.size > CONFIG.maxFileSize) {
        showNotification(
            `Archivo "${file.name}" excede el tamaño máximo de ${formatFileSize(CONFIG.maxFileSize)}`,
            'error'
        );
        return false;
    }
    
    // Validar extensión
    const extension = getFileExtension(file.name).toLowerCase();
    if (!CONFIG.allowedExtensions.includes(extension)) {
        showNotification(
            `Tipo de archivo "${extension.toUpperCase()}" no permitido`,
            'error'
        );
        return false;
    }
    
    return true;
}

// Mostrar notificación (puede implementarse con un toast o alert)
function showNotification(message, type = 'info') {
    if (typeof console !== 'undefined') {
        console[type === 'error' ? 'error' : 'log'](message);
    }
    
    // Si estás en el navegador, podrías agregar un toast visual:
    if (typeof document !== 'undefined' && !document.getElementById('notifications')) {
        // Crear contenedor de notificaciones si no existe
        const notifContainer = document.createElement('div');
        notifContainer.id = 'notifications';
        notifContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
        `;
        document.body.appendChild(notifContainer);
    }
    
    if (typeof document !== 'undefined') {
        const notifContainer = document.getElementById('notifications');
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            padding: 12px 20px;
            margin-bottom: 10px;
            border-radius: 8px;
            background: ${type === 'error' ? '#ff4444' : '#4CAF50'};
            color: white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            animation: slideInRight 0.3s ease;
        `;
        
        notifContainer.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Mostrar preview del archivo
function previewFile(file) {
    if (!filesPreview) return; // Guard para tests
    
    const fileId = Date.now() + Math.random();
    const fileSize = formatFileSize(file.size);
    const fileExtension = getFileExtension(file.name);
    
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.setAttribute('data-file-id', fileId);
    
    fileItem.innerHTML = `
        <div class="file-info-container">
            <div class="file-icon">${fileExtension}</div>
            <div class="file-details">
                <div class="file-name">${file.name}</div>
                <div class="file-size">${fileSize}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
            </div>
        </div>
        <div class="file-actions">
            <span class="status-badge status-uploading">Subiendo...</span>
            <button class="remove-btn" onclick="removeFile('${fileId}')">Eliminar</button>
        </div>
    `;
    
    filesPreview.appendChild(fileItem);
}

// Simular carga de archivo
function uploadFile(file) {
    if (!filesPreview) return; // Guard para tests
    
    const fileId = Array.from(filesPreview.children)
        .find(item => item.querySelector('.file-name').textContent === file.name)
        ?.getAttribute('data-file-id');
    
    if (!fileId) return;
    
    const progressFill = filesPreview.querySelector(`[data-file-id="${fileId}"] .progress-fill`);
    const statusBadge = filesPreview.querySelector(`[data-file-id="${fileId}"] .status-badge`);
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Marcar como completado
            statusBadge.textContent = 'Completado';
            statusBadge.className = 'status-badge status-success';
            
            // Aquí puedes agregar la lógica real de carga
            // Por ejemplo, usando FormData y fetch:
            // uploadToServer(file);
        }
        
        progressFill.style.width = progress + '%';
    }, 200);
}

// Función para cargar archivo al servidor (ejemplo)
async function uploadToServer(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            console.log('Archivo subido correctamente:', file.name);
        } else {
            console.error('Error al subir archivo:', file.name);
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}

// Eliminar archivo
function removeFile(fileId) {
    if (!filesPreview) return; // Guard para tests
    
    const fileItem = filesPreview.querySelector(`[data-file-id="${fileId}"]`);
    if (fileItem) {
        fileItem.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            fileItem.remove();
        }, 300);
    }
}

// Formatear tamaño del archivo
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Obtener extensión del archivo
function getFileExtension(filename) {
    const ext = filename.split('.').pop().toUpperCase();
    return ext.length > 4 ? ext.substring(0, 4) : ext;
}

// Exportar funciones para testing (solo en entorno Node.js/Jest)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        formatFileSize,
        getFileExtension,
        preventDefaults,
        handleFiles,
        previewFile,
        uploadFile,
        removeFile,
        highlight,
        unhighlight,
        handleDrop,
        uploadToServer,
        validateFile,
        showNotification,
        uploadedFiles
    };
}
