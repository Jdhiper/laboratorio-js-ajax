// Ejercicios AJAX - Laboratorio JS y AJAX

// Nombre de cada valor de readyState
var ESTADOS = [
  'No iniciada',   // 0 - UNSENT: el objeto existe pero no se ha llamado a open()
  'Cargando',      // 1 - OPENED: se llamó a open()
  'Cargado',       // 2 - HEADERS_RECEIVED: llegaron las cabeceras
  'Interactivo',   // 3 - LOADING: se está descargando el contenido
  'Completada'     // 4 - DONE: la respuesta llegó completa
];

var peticion = null;
var inicio = 0;

// Escribe una línea en la zona "Estados de la petición" con el tiempo transcurrido
function mostrarEstado(texto) {
  var ms = inicio ? (Date.now() - inicio) : 0;
  document.getElementById('estados').textContent += '[' + ms + ' ms] ' + texto + '\n';
}

// Se llama cada vez que cambia readyState
function procesarRespuesta() {
  mostrarEstado(peticion.readyState + ' - ' + ESTADOS[peticion.readyState]);

  // Ejercicio 4: las cabeceras ya están disponibles desde el estado 2
  if (peticion.readyState === 2) {
    document.getElementById('cabeceras').textContent = peticion.getAllResponseHeaders();
  }

  if (peticion.readyState === 4) {
    // Ejercicio 5: código y texto de estado
    document.getElementById('codigo').textContent = peticion.status + ' ' + peticion.statusText;

    // Ejercicio 2: contenido de la respuesta
    // Se usa textContent para mostrar el código tal cual y no interpretarlo como HTML
    document.getElementById('contenidos').textContent = peticion.responseText;

    // Si hubo error de red o CORS, el status es 0 y no hay cabeceras
    if (peticion.status === 0) {
      document.getElementById('codigo').textContent = '0 (sin respuesta: error de red o bloqueo CORS)';
      document.getElementById('cabeceras').textContent = '(no se recibieron cabeceras)';
    }
  }
}

// Ejercicio 2: descarga mediante AJAX la URL escrita por el usuario
function cargarContenido() {
  var url = document.getElementById('recurso').value.trim();

  // Se limpian las zonas antes de cada nueva petición
  document.getElementById('contenidos').textContent = '';
  document.getElementById('estados').textContent = '';
  document.getElementById('cabeceras').textContent = '';
  document.getElementById('codigo').textContent = '';

  if (url === '') {
    document.getElementById('estados').textContent = 'Escribe una URL.';
    return;
  }

  inicio = Date.now();
  peticion = new XMLHttpRequest();

  // Ejercicio 3: estado inicial, antes de llamar a open()
  mostrarEstado(peticion.readyState + ' - ' + ESTADOS[peticion.readyState]);

  peticion.onreadystatechange = procesarRespuesta;
  peticion.onerror = function () {
    mostrarEstado('Error: no se pudo completar la petición (red o CORS)');
  };

  try {
    peticion.open('GET', url, true);
    peticion.send(null);
  } catch (e) {
    mostrarEstado('Error al abrir la petición: ' + e.message);
  }
}

// Ejercicio 1: al cargar la página se muestra su propia URL en el cuadro de texto
window.onload = function () {
  document.getElementById('recurso').value = window.location.href;
  document.getElementById('enviar').onclick = cargarContenido;
};
