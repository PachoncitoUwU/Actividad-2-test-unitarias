// taskManager.js — Ejercicio 3

class TaskManager {
  constructor() {
    this._tasks = [];
    this._nextId = 1;
  }

  /**
   * Agrega una tarea con { id, title, completed: false, createdAt: Date }.
   * Lanza Error si title está vacío.
   * Devuelve la tarea creada.
   */
  addTask(title) {
    if (!title || !title.trim()) {
      throw new Error('El título de la tarea no puede estar vacío.');
    }
    const task = {
      id: this._nextId++,
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
    };
    this._tasks.push(task);
    return task;
  }

  /**
   * Marca la tarea con ese id como completed: true.
   * Lanza Error si el id no existe.
   */
  completeTask(id) {
    const task = this._tasks.find((t) => t.id === id);
    if (!task) throw new Error(`No existe una tarea con id ${id}.`);
    task.completed = true;
    return task;
  }

  /**
   * Elimina la tarea con ese id.
   * Lanza Error si no existe.
   */
  removeTask(id) {
    const index = this._tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new Error(`No existe una tarea con id ${id}.`);
    return this._tasks.splice(index, 1)[0];
  }

  /** Devuelve solo las tareas pendientes (completed: false). */
  getPending() {
    return this._tasks.filter((t) => !t.completed);
  }

  /** Devuelve solo las tareas completadas (completed: true). */
  getCompleted() {
    return this._tasks.filter((t) => t.completed);
  }

  /** Devuelve todas las tareas. */
  getAll() {
    return [...this._tasks];
  }
}

module.exports = TaskManager;
