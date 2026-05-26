// productService.js - Servicio de productos

const products = [
  { id: 1, name: 'Laptop', price: 999.99, stock: 10 },
  { id: 2, name: 'Mouse', price: 29.99, stock: 50 },
  { id: 3, name: 'Keyboard', price: 79.99, stock: 30 },
];

/**
 * Obtiene todos los productos
 */
function getAllProducts() {
  return [...products];
}

/**
 * Busca un producto por id
 */
function getProductById(id) {
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error(`Product with id ${id} not found`);
  return { ...product };
}

/**
 * Filtra productos por precio máximo
 */
function getProductsByMaxPrice(maxPrice) {
  return products.filter((p) => p.price <= maxPrice).map((p) => ({ ...p }));
}

/**
 * Verifica si un producto tiene stock disponible
 */
function isInStock(id) {
  const product = getProductById(id);
  return product.stock > 0;
}

module.exports = { getAllProducts, getProductById, getProductsByMaxPrice, isInStock };
