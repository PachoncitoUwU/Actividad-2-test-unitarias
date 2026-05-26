// numberUtils.js — Ejercicio 1

/**
 * Devuelve el factorial de n.
 * factorial(0) = 1 por definición matemática.
 * Lanza RangeError si n es negativo.
 * Lanza TypeError si n no es un entero.
 */
function factorial(n) {
  if (typeof n !== 'number' || !Number.isInteger(n)) {
    throw new TypeError('Se esperaba un entero.');
  }
  if (n < 0) {
    throw new RangeError('No se puede calcular el factorial de un número negativo.');
  }
  if (n === 0) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Devuelve true si n es un número primo, false en caso contrario.
 * Los números menores a 2 no son primos.
 */
function isPrime(n) {
  if (!Number.isInteger(n) || n < 2) return false;
  for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

/**
 * Devuelve value ajustado al rango [min, max].
 * Lanza RangeError si min > max.
 */
function clamp(value, min, max) {
  if (min > max) {
    throw new RangeError('min no puede ser mayor que max.');
  }
  return Math.min(Math.max(value, min), max);
}

module.exports = { factorial, isPrime, clamp };
