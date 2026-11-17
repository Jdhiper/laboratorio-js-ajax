# Laboratorio: Tecnologías JavaScript y AJAX

Asignatura: Desarrollo de Aplicaciones en Red (UNIR)  
Estudiante: Juan Diego Zambrano Guerrero

## Contenido

| Fichero | Descripción |
|---|---|
| `index.html` | Página de inicio con el menú del laboratorio |
| `javascript.html` | Los cuatro ejercicios de JavaScript |
| `js/ejercicios.js` | Código de los ejercicios JS (palíndromo, mayor, vocales, conteo) |
| `ajax.html` | Página proporcionada para los ejercicios AJAX |
| `js/ajax.js` | Código AJAX con `XMLHttpRequest` |
| `css/estilos.css` | Estilos de las páginas |
| `prueba.txt` | Fichero de texto para probar la descarga con AJAX |

## Cómo probarlo

AJAX necesita que la página se abra desde un servidor web (no con doble clic, porque con `file://` el navegador bloquea las peticiones). En local:

```bash
python3 -m http.server 8000
```

y abrir `http://localhost:8000/`. También se puede ver publicada en GitHub Pages.
