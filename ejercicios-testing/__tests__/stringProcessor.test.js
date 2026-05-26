const { maskEmail, reverseWords, extractHashtags } = require('../src/stringProcessor');

describe('stringProcessor', () => {

  describe('maskEmail()', () => {
    it('oculta los caracteres intermedios del usuario', () => {
      // Arrange
      const email = 'sergio@gmail.com';
      // Act
      const result = maskEmail(email);
      // Assert
      expect(result).toBe('s****o@gmail.com');
    });

    it('devuelve el email sin cambios si el usuario tiene 1 carácter', () => {
      expect(maskEmail('a@gmail.com')).toBe('a@gmail.com');
    });

    it('funciona con usuario de 2 caracteres (sin asteriscos intermedios)', () => {
      expect(maskEmail('ab@gmail.com')).toBe('ab@gmail.com');
    });

    it('lanza Error si el email no contiene @', () => {
      expect(() => maskEmail('emailsinarroba.com')).toThrow(Error);
      expect(() => maskEmail('emailsinarroba.com')).toThrow('@');
    });
  });

  describe('reverseWords()', () => {
    it('invierte el orden de las palabras', () => {
      // Arrange
      const sentence = 'hola mundo node';
      // Act
      const result = reverseWords(sentence);
      // Assert
      expect(result).toBe('node mundo hola');
    });

    it('maneja espacios múltiples entre palabras', () => {
      expect(reverseWords('hola   mundo')).toBe('mundo hola');
    });

    it('devuelve "" para texto vacío', () => {
      expect(reverseWords('')).toBe('');
    });

    it('devuelve "" para texto con solo espacios', () => {
      expect(reverseWords('   ')).toBe('');
    });

    it('devuelve la misma palabra si solo hay una', () => {
      expect(reverseWords('hola')).toBe('hola');
    });
  });

  describe('extractHashtags()', () => {
    it('extrae múltiples hashtags del texto', () => {
      // Arrange
      const text = 'Me gusta #node y #testing';
      // Act
      const result = extractHashtags(text);
      // Assert
      expect(result).toEqual(['#node', '#testing']);
    });

    it('devuelve array vacío si no hay hashtags', () => {
      expect(extractHashtags('sin etiquetas aquí')).toEqual([]);
    });

    it('devuelve array vacío si # aparece solo sin texto después', () => {
      expect(extractHashtags('esto es un # solo')).toEqual([]);
    });

    it('no cuenta # al final de la cadena sin caracteres después', () => {
      expect(extractHashtags('texto#')).toEqual([]);
    });
  });

});
