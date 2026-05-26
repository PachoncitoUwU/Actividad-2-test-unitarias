const { factorial, isPrime, clamp } = require('../src/numberUtils');

describe('numberUtils', () => {

  describe('factorial()', () => {
    it('devuelve el factorial de un número positivo', () => {
      // Arrange
      const n = 5;
      // Act
      const result = factorial(n);
      // Assert
      expect(result).toBe(120);
    });

    it('devuelve 1 para factorial(0)', () => {
      expect(factorial(0)).toBe(1);
    });

    it('devuelve 1 para factorial(1)', () => {
      expect(factorial(1)).toBe(1);
    });

    it('lanza RangeError para números negativos', () => {
      expect(() => factorial(-3)).toThrow(RangeError);
    });

    it('lanza TypeError para decimales', () => {
      expect(() => factorial(3.5)).toThrow(TypeError);
    });

    it('lanza TypeError para no números', () => {
      expect(() => factorial('cinco')).toThrow(TypeError);
    });
  });

  describe('isPrime()', () => {
    it('devuelve true para un primo conocido', () => {
      expect(isPrime(7)).toBe(true);
      expect(isPrime(13)).toBe(true);
    });

    it('devuelve true para 2 (el primo más pequeño)', () => {
      expect(isPrime(2)).toBe(true);
    });

    it('devuelve false para un número no primo', () => {
      expect(isPrime(9)).toBe(false);
      expect(isPrime(4)).toBe(false);
    });

    it('devuelve false para 0 y 1', () => {
      expect(isPrime(0)).toBe(false);
      expect(isPrime(1)).toBe(false);
    });

    it('devuelve false para números negativos', () => {
      expect(isPrime(-5)).toBe(false);
    });
  });

  describe('clamp()', () => {
    it('devuelve el valor si está dentro del rango', () => {
      // Arrange
      const value = 5;
      // Act
      const result = clamp(value, 1, 10);
      // Assert
      expect(result).toBe(5);
    });

    it('devuelve min si el valor es menor que min', () => {
      expect(clamp(-3, 0, 10)).toBe(0);
    });

    it('devuelve max si el valor es mayor que max', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('funciona cuando min === max', () => {
      expect(clamp(5, 3, 3)).toBe(3);
    });

    it('funciona en los límites exactos del rango', () => {
      expect(clamp(1, 1, 10)).toBe(1);
      expect(clamp(10, 1, 10)).toBe(10);
    });

    it('lanza RangeError si min > max', () => {
      expect(() => clamp(5, 10, 1)).toThrow(RangeError);
    });
  });

});
