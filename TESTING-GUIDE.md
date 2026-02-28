# 🧪 Guía de Ejecución - Skill de Pruebas Unitarias

## 📋 Resumen

Este skill ejecuta automáticamente:
1. ✅ Lee `script.js` y identifica funciones testeables
2. ✅ Corre **25 pruebas unitarias** (3-5 por función)
3. ✅ Genera reportes de coverage
4. ✅ Guarda todo en la carpeta `tests/`

---

## 🚀 Ejecución Rápida

### Opción 1: Script Automatizado (RECOMENDADO)
```bash
node run-tests.js
```

Este script hace TODO automáticamente:
- Instala Jest y dependencias
- Configura el entorno
- Ejecuta las 25 pruebas
- Genera reportes HTML y Markdown
- Guarda resultados en `tests/`

### Opción 2: Ejecución Manual por Pasos

#### Paso 1: Instalar dependencias
```bash
npm install --save-dev jest @types/jest jest-environment-jsdom
```

#### Paso 2: Ejecutar pruebas
```bash
npm test
```

#### Paso 3: Ver reportes
- **HTML:** Abre `tests/coverage/lcov-report/index.html`
- **Markdown:** Abre `tests/reports/test-report.md`

---

## 📊 Funciones Testeadas

| Función | Tests | Tipo |
|---------|-------|------|
| `formatFileSize()` | 5 | Pure function ✅ |
| `getFileExtension()` | 5 | Pure function ✅ |
| `preventDefaults()` | 3 | Event handler ✅ |
| `handleFiles()` | 4 | Business logic ✅ |
| `removeFile()` | 4 | DOM manipulation ✅ |
| **Edge Cases** | 3 | Integration tests ✅ |
| **TOTAL** | **25** | - |

---

## 📁 Archivos Generados

Después de la ejecución encontrarás:

```
tests/
├── unit/
│   └── script.test.js              # 25 pruebas unitarias
├── coverage/
│   ├── lcov-report/
│   │   └── index.html              # 📊 Reporte visual de coverage
│   ├── coverage-summary.json       # JSON con métricas
│   └── lcov.info                   # Formato estándar LCOV
└── reports/
    └── test-report.md              # 📝 Reporte completo en Markdown
```

---

## 🎯 Cobertura Esperada

| Métrica      | Objetivo | Descripción |
|--------------|----------|-------------|
| Statements   | 70%+     | Declaraciones ejecutadas |
| Branches     | 60%+     | Caminos condicionales |
| Functions    | 75%+     | Funciones llamadas |
| Lines        | 70%+     | Líneas de código ejecutadas |

---

## 💡 Comandos Útiles

```bash
# Ejecutar tests en modo watch (desarrollo)
npm run test:watch

# Ejecutar solo tests sin coverage
npm test -- --coverage=false

# Ejecutar tests con más detalles
npm test -- --verbose

# Ver coverage en terminal
npm test -- --coverage
```

---

## 🔧 Archivos del Skill

| Archivo | Propósito |
|---------|-----------|
| `.github/skills/coverage/skill.md` | 📖 Documentación del skill |
| `tests/unit/script.test.js` | 🧪 25 pruebas unitarias |
| `jest.config.js` | ⚙️ Configuración de Jest |
| `run-tests.js` | 🤖 Script de automatización |

---

## 🐛 Troubleshooting

### Error: "jest command not found"
```bash
npm install --save-dev jest
```

### Error: "Cannot find module 'script.js'"
Asegúrate de ejecutar desde la raíz del proyecto donde está `script.js`

### Coverage al 0%
Verifica que `script.js` exista y tenga las funciones esperadas

---

## 🎓 Ejemplos de Salida

### Terminal Output:
```
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    🧪 UNIT TESTING & COVERAGE SKILL
    Agente Vida MRR - Test Automation
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

STEP 1: Installing Jest and Dependencies
✅ Installing Jest and dependencies - COMPLETED

STEP 2: Configuring NPM Scripts
✅ NPM scripts configured

STEP 3: Creating Test Directory Structure
📁 Created: tests/unit
📁 Created: tests/coverage
📁 Created: tests/reports

STEP 4: Executing Jest Tests with Coverage
 PASS  tests/unit/script.test.js
  ✓ formatFileSize: 0 bytes (2 ms)
  ✓ formatFileSize: KB (1 ms)
  ✓ getFileExtension: PDF
  ... (22 more tests)

Tests:       25 passed, 25 total
Snapshots:   0 total
Time:        2.451 s

Coverage Summary:
  Statements   : 78.5%
  Branches     : 65.2%
  Functions    : 80%
  Lines        : 78.5%

▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    ✅ TESTING SKILL COMPLETED!
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

---

## 🌟 Características del Skill

✅ **Automatizado:** Un solo comando ejecuta todo  
✅ **Completo:** Cubre las 5 funciones principales  
✅ **Detallado:** Reportes en HTML y Markdown  
✅ **Profesional:** Siguiendo mejores prácticas de Jest  
✅ **Mantenible:** Fácil de extender con nuevas pruebas  

---

## 📞 Soporte

**Desarrollador:** Rodrigo Vera Candia  
**Agente:** Vida MRR  
**Fecha:** Febrero 2026  
**Versión:** 1.0.0

---

**¡Listo para ejecutar! 🚀**

Simplemente corre: `node run-tests.js`
