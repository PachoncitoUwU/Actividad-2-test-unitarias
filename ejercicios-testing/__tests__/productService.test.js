const {
  getAllProducts,
  getProductById,
  getProductsByMaxPrice,
  isInStock,
} = require('../src/productService');

describe('productService', () => {
  describe('getAllProducts', () => {
    test('retorna todos los productos', () => {
      const products = getAllProducts();
      expect(products).toHaveLength(3);
    });
  });

  describe('getProductById', () => {
    test('retorna el producto correcto', () => {
      const product = getProductById(1);
      expect(product.name).toBe('Laptop');
    });

    test('lanza error si el producto no existe', () => {
      expect(() => getProductById(999)).toThrow('Product with id 999 not found');
    });
  });

  describe('getProductsByMaxPrice', () => {
    test('filtra productos por precio máximo', () => {
      const products = getProductsByMaxPrice(50);
      expect(products.every((p) => p.price <= 50)).toBe(true);
    });

    test('retorna array vacío si ninguno cumple el filtro', () => {
      const products = getProductsByMaxPrice(1);
      expect(products).toHaveLength(0);
    });
  });

  describe('isInStock', () => {
    test('retorna true si hay stock', () => {
      expect(isInStock(1)).toBe(true);
    });

    test('lanza error si el producto no existe', () => {
      expect(() => isInStock(999)).toThrow();
    });
  });
});
