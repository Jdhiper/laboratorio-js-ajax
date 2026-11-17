// Ejercicios JavaScript - Laboratorio JS y AJAX

// Quita las tildes y la diéresis para que "á" cuente como "a", "ü" como "u", etc.
// La ñ se conserva porque es una letra distinta de la n.
function normalizar(texto) {
  return texto
    .toLowerCase()
    .replace(/ñ/g, '\u0001')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\u0001/g, 'ñ');
}

// ---------- Ejercicio 1: palíndromo ----------
function esPalindromo(cadena) {
  // Se ignoran mayúsculas, tildes, espacios y signos de puntuación
  var limpia = normalizar(cadena).replace(/[^a-z0-9ñ]/g, '');
  var invertida = limpia.split('').reverse().join('');
  return limpia.length > 0 && limpia === invertida;
}

document.getElementById('btnPalindromo').onclick = function () {
  var texto = document.getElementById('txtPalindromo').value;
  var res = document.getElementById('resPalindromo');

  if (texto.trim() === '') {
    res.className = 'resultado error';
    res.textContent = 'Debes escribir una cadena.';
    return;
  }

  if (esPalindromo(texto)) {
    res.className = 'resultado ok';
    res.textContent = '"' + texto + '" SÍ es un palíndromo.';
  } else {
    res.className = 'resultado error';
    res.textContent = '"' + texto + '" NO es un palíndromo.';
  }
};

// ---------- Ejercicio 2: número mayor ----------
document.getElementById('btnMayor').onclick = function () {
  var valor1 = document.getElementById('numero1').value;
  var valor2 = document.getElementById('numero2').value;
  var res = document.getElementById('resMayor');

  if (valor1 === '' || valor2 === '') {
    res.className = 'resultado error';
    res.textContent = 'Debes escribir los dos números.';
    return;
  }

  var n1 = parseFloat(valor1);
  var n2 = parseFloat(valor2);
  res.className = 'resultado ok';

  if (n1 > n2) {
    res.textContent = 'El mayor es ' + n1;
  } else if (n2 > n1) {
    res.textContent = 'El mayor es ' + n2;
  } else {
    res.textContent = 'Los dos números son iguales (' + n1 + ')';
  }
};

// ---------- Ejercicio 3: vocales que aparecen ----------
function vocalesQueAparecen(frase) {
  var texto = normalizar(frase);
  var vocales = ['a', 'e', 'i', 'o', 'u'];
  var encontradas = [];

  for (var i = 0; i < vocales.length; i++) {
    if (texto.indexOf(vocales[i]) !== -1) {
      encontradas.push(vocales[i]);
    }
  }
  return encontradas;
}

document.getElementById('btnVocales').onclick = function () {
  var frase = document.getElementById('txtVocales').value;
  var res = document.getElementById('resVocales');
  var encontradas = vocalesQueAparecen(frase);

  if (encontradas.length === 0) {
    res.className = 'resultado error';
    res.textContent = 'La frase no contiene vocales.';
  } else {
    res.className = 'resultado ok';
    res.textContent = 'Vocales que aparecen: ' + encontradas.join(', ');
  }
};

// ---------- Ejercicio 4: cuántas veces aparece cada vocal ----------
function contarVocales(frase) {
  var texto = normalizar(frase);
  var conteo = { a: 0, e: 0, i: 0, o: 0, u: 0 };

  for (var i = 0; i < texto.length; i++) {
    var letra = texto.charAt(i);
    if (conteo.hasOwnProperty(letra)) {
      conteo[letra]++;
    }
  }
  return conteo;
}

document.getElementById('btnConteo').onclick = function () {
  var frase = document.getElementById('txtConteo').value;
  var res = document.getElementById('resConteo');
  var conteo = contarVocales(frase);
  var total = 0;

  var tabla = '<table class="vocales"><tr><th>Vocal</th><th>Veces</th></tr>';
  for (var vocal in conteo) {
    tabla += '<tr><td>' + vocal + '</td><td>' + conteo[vocal] + '</td></tr>';
    total += conteo[vocal];
  }
  tabla += '<tr><th>Total</th><th>' + total + '</th></tr></table>';

  res.className = 'resultado';
  res.innerHTML = tabla;
};
