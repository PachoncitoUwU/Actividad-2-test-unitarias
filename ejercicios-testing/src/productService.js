// productService.js - Servicio de productos

// ─── Funciones originales (usadas por app.js) ───────────────────────────────

const products = [
  { id: 1, name: 'Laptop',   price: 999.99, stock: 10 },
  { id: 2, name: 'Mouse',    price: 29.99,  stock: 50 },
  { id: 3, name: 'Keyboard', price: 79.99,  stock: 30 },
];

function getAllProducts() {
  return [...products];
}

function getProductById(id) {
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error(`Product with id ${id} not found`);
  return { ...product };
}

function getProductsByMaxPrice(maxPrice) {
  return products.filter((p) => p.price <= maxPrice).map((p) => ({ ...p }));
}

function isInStock(id) {
  const product = getProductById(id);
  return product.stock > 0;
}

// ─── Clase asíncrona con inyección de dependencias (Ejercicio 4) ─────────────

class ProductService {
  constructor(productRepository) {
    this.repo = productRepository;
  }

  async getById(id) {
    const product = await this.repo.findById(id);
    if (!product) throw new Error(`Producto ${id} no encontrado.`);
    return product;
  }

  async getByCategory(category) {
    const all = await this.repo.findAll();
    return all.filter((p) => p.category === category);
  }

  async searchByName(query) {
    if (!query || query.trim() === '') {
      throw new Error('El query de búsqueda no puede estar vacío.');
    }
    const all = await this.repo.findAll();
    return all.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  async create(productData) {
    if (!productData.name) {
      throw new Error('El nombre del producto es obligatorio.');
    }
    if (productData.price === undefined || productData.price === null) {
      throw new Error('El precio del producto es obligatorio.');
    }
    if (productData.price <= 0) {
      throw new Error('El precio debe ser mayor que 0.');
    }
    return await this.repo.save(productData);
  }
}

module.exports = { getAllProducts, getProductById, getProductsByMaxPrice, isInStock, ProductService };
