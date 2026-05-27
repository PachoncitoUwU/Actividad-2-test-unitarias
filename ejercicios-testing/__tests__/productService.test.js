const { ProductService } = require('../src/productService');

// Repositorio simulado: objeto con funciones mockeadas
const mockRepo = {
  findAll:  jest.fn(),
  findById: jest.fn(),
  save:     jest.fn(),
};

describe('ProductService', () => {
  let service;

  beforeEach(() => {
    jest.clearAllMocks();              // reset del historial entre tests
    service = new ProductService(mockRepo);
  });

  // ─────────────────────────────────────────────
  describe('getById()', () => {
    it('devuelve el producto cuando existe', async () => {
      const producto = { id: 1, name: 'Laptop', price: 999.99, category: 'electronics' };
      mockRepo.findById.mockResolvedValue(producto);

      const result = await service.getById(1);

      expect(result).toEqual(producto);
      expect(mockRepo.findById).toHaveBeenCalledWith(1);
      expect(mockRepo.findById).toHaveBeenCalledTimes(1);
    });

    it('lanza Error si el producto no existe', async () => {
      mockRepo.findById.mockResolvedValue(null);

      await expect(service.getById(99)).rejects.toThrow('Producto 99 no encontrado.');
    });

    it('verifica que el repositorio fue llamado con el ID correcto', async () => {
      mockRepo.findById.mockResolvedValue({ id: 5, name: 'Monitor', price: 300, category: 'electronics' });

      await service.getById(5);

      expect(mockRepo.findById).toHaveBeenCalledWith(5);
    });
  });

  // ─────────────────────────────────────────────
  describe('getByCategory()', () => {
    const productos = [
      { id: 1, name: 'Laptop',  price: 999.99, category: 'electronics' },
      { id: 2, name: 'Camiseta', price: 19.99, category: 'ropa'        },
      { id: 3, name: 'Monitor', price: 299.99, category: 'electronics' },
    ];

    it('devuelve solo los productos de la categoría indicada', async () => {
      mockRepo.findAll.mockResolvedValue(productos);

      const result = await service.getByCategory('electronics');

      expect(result).toHaveLength(2);
      expect(result.every((p) => p.category === 'electronics')).toBe(true);
    });

    it('devuelve array vacío si no hay productos en esa categoría', async () => {
      mockRepo.findAll.mockResolvedValue(productos);

      const result = await service.getByCategory('deportes');

      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
  });

  // ─────────────────────────────────────────────
  describe('searchByName()', () => {
    const productos = [
      { id: 1, name: 'Laptop Pro',   price: 1200, category: 'electronics' },
      { id: 2, name: 'laptop mini',  price: 600,  category: 'electronics' },
      { id: 3, name: 'Mouse Óptico', price: 25,   category: 'peripherals' },
    ];

    it('devuelve los productos que contienen el query en el nombre', async () => {
      mockRepo.findAll.mockResolvedValue(productos);

      const result = await service.searchByName('Mouse');

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Mouse Óptico');
    });

    it('la búsqueda es case-insensitive', async () => {
      mockRepo.findAll.mockResolvedValue(productos);

      const result = await service.searchByName('laptop');

      expect(result).toHaveLength(2);
      expect(result.every((p) => p.name.toLowerCase().includes('laptop'))).toBe(true);
    });

    it('lanza Error si el query está vacío', async () => {
      await expect(service.searchByName('')).rejects.toThrow(
        'El query de búsqueda no puede estar vacío.'
      );
    });

    it('lanza Error si el query es solo espacios', async () => {
      await expect(service.searchByName('   ')).rejects.toThrow(
        'El query de búsqueda no puede estar vacío.'
      );
    });
  });

  // ─────────────────────────────────────────────
  describe('create()', () => {
    const productoValido = { name: 'Teclado', price: 79.99, category: 'peripherals' };

    it('llama a save() y devuelve el producto guardado cuando los datos son válidos', async () => {
      const guardado = { id: 10, ...productoValido };
      mockRepo.save.mockResolvedValue(guardado);

      const result = await service.create(productoValido);

      expect(result).toEqual(guardado);
      expect(mockRepo.save).toHaveBeenCalledTimes(1);
      expect(mockRepo.save).toHaveBeenCalledWith(productoValido);
    });

    it('lanza Error si el precio es negativo', async () => {
      await expect(
        service.create({ name: 'Teclado', price: -10 })
      ).rejects.toThrow('El precio debe ser mayor que 0.');

      expect(mockRepo.save).not.toHaveBeenCalled();
    });

    it('lanza Error si el precio es cero', async () => {
      await expect(
        service.create({ name: 'Teclado', price: 0 })
      ).rejects.toThrow('El precio debe ser mayor que 0.');

      expect(mockRepo.save).not.toHaveBeenCalled();
    });

    it('lanza Error si falta el nombre', async () => {
      await expect(
        service.create({ price: 50 })
      ).rejects.toThrow('El nombre del producto es obligatorio.');

      expect(mockRepo.save).not.toHaveBeenCalled();
    });

    it('save() solo se llama una vez con datos válidos', async () => {
      mockRepo.save.mockResolvedValue({ id: 11, ...productoValido });

      await service.create(productoValido);

      expect(mockRepo.save).toHaveBeenCalledTimes(1);
    });
  });
});
