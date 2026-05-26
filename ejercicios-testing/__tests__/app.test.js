// app.test.js - Prueba de integración básica del punto de entrada

describe('app', () => {
  test('se ejecuta sin lanzar errores', () => {
    // Limpiamos la caché de require para que vuelva a ejecutarse
    jest.resetModules();
    expect(() => require('../src/app')).not.toThrow();
  });

  test('los módulos principales se importan correctamente', () => {
    jest.resetModules();
    const numberUtils = require('../src/numberUtils');
    const stringProcessor = require('../src/stringProcessor');
    const TaskManager = require('../src/taskManager');
    const productService = require('../src/productService');

    expect(typeof numberUtils.factorial).toBe('function');
    expect(typeof numberUtils.isPrime).toBe('function');
    expect(typeof numberUtils.clamp).toBe('function');
    expect(typeof stringProcessor.maskEmail).toBe('function');
    expect(typeof stringProcessor.reverseWords).toBe('function');
    expect(typeof stringProcessor.extractHashtags).toBe('function');
    expect(typeof TaskManager).toBe('function');
    expect(typeof productService.getAllProducts).toBe('function');
  });
});
