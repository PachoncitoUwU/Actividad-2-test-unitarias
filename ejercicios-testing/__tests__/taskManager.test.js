const TaskManager = require('../src/taskManager');

describe('TaskManager', () => {
  let manager;

  // Cada test empieza con un TaskManager limpio
  beforeEach(() => {
    manager = new TaskManager();
  });

  describe('addTask()', () => {
    it('una tarea recién creada tiene completed: false', () => {
      // Arrange & Act
      const task = manager.addTask('Estudiar Jest');
      // Assert
      expect(task.completed).toBe(false);
    });

    it('después de addTask el total de tareas aumenta en 1', () => {
      manager.addTask('Tarea A');
      manager.addTask('Tarea B');
      expect(manager.getAll()).toHaveLength(2);
    });

    it('la tarea creada tiene las propiedades correctas', () => {
      const task = manager.addTask('Revisar PR');
      expect(task).toMatchObject({
        id: expect.any(Number),
        title: 'Revisar PR',
        completed: false,
        createdAt: expect.any(Date),
      });
    });

    it('lanza Error si el título está vacío', () => {
      expect(() => manager.addTask('')).toThrow(Error);
    });

    it('lanza Error si el título es solo espacios', () => {
      expect(() => manager.addTask('   ')).toThrow(Error);
    });
  });

  describe('completeTask()', () => {
    it('cambia completed a true en la tarea indicada', () => {
      // Arrange
      const task = manager.addTask('Hacer ejercicio');
      // Act
      manager.completeTask(task.id);
      // Assert
      expect(manager.getAll()[0].completed).toBe(true);
    });

    it('no afecta a otras tareas al completar una', () => {
      const t1 = manager.addTask('Tarea 1');
      const t2 = manager.addTask('Tarea 2');

      manager.completeTask(t1.id);

      expect(manager.getAll().find((t) => t.id === t2.id).completed).toBe(false);
    });

    it('lanza Error si el id no existe', () => {
      expect(() => manager.completeTask(999)).toThrow(Error);
    });
  });

  describe('removeTask()', () => {
    it('disminuye el total de tareas en 1', () => {
      const task = manager.addTask('Borrar esto');
      manager.removeTask(task.id);
      expect(manager.getAll()).toHaveLength(0);
    });

    it('lanza Error si el id no existe', () => {
      expect(() => manager.removeTask(999)).toThrow(Error);
    });
  });

  describe('getPending()', () => {
    it('no incluye tareas completadas', () => {
      // Arrange
      const t1 = manager.addTask('Pendiente');
      const t2 = manager.addTask('Completada');
      // Act
      manager.completeTask(t2.id);
      // Assert
      const pending = manager.getPending();
      expect(pending).toHaveLength(1);
      expect(pending[0].id).toBe(t1.id);
    });

    it('devuelve array vacío si todas están completadas', () => {
      const task = manager.addTask('Única');
      manager.completeTask(task.id);
      expect(manager.getPending()).toHaveLength(0);
    });
  });

  describe('getCompleted()', () => {
    it('no incluye tareas pendientes', () => {
      // Arrange
      manager.addTask('Pendiente');
      const t2 = manager.addTask('Completada');
      // Act
      manager.completeTask(t2.id);
      // Assert
      const completed = manager.getCompleted();
      expect(completed).toHaveLength(1);
      expect(completed[0].id).toBe(t2.id);
    });

    it('devuelve array vacío si no hay tareas completadas', () => {
      manager.addTask('Sin completar');
      expect(manager.getCompleted()).toHaveLength(0);
    });
  });

  describe('getAll()', () => {
    it('devuelve todas las tareas sin importar su estado', () => {
      const t1 = manager.addTask('Tarea 1');
      const t2 = manager.addTask('Tarea 2');
      manager.completeTask(t1.id);

      expect(manager.getAll()).toHaveLength(2);
    });
  });
});
