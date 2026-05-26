// app.js - Punto de entrada de la aplicación

const { factorial, isPrime, clamp } = require('./numberUtils');
const { maskEmail, reverseWords, extractHashtags } = require('./stringProcessor');
const TaskManager = require('./taskManager');
const { getAllProducts, getProductsByMaxPrice } = require('./productService');

function run() {
  console.log('=== Number Utils ===');
  console.log(`factorial(5) = ${factorial(5)}`);
  console.log(`isPrime(7) = ${isPrime(7)}`);
  console.log(`clamp(15, 0, 10) = ${clamp(15, 0, 10)}`);

  console.log('\n=== String Processor ===');
  console.log(`maskEmail("sergio@gmail.com") = ${maskEmail('sergio@gmail.com')}`);
  console.log(`reverseWords("hola mundo node") = ${reverseWords('hola mundo node')}`);
  console.log(`extractHashtags("#node #testing") = ${extractHashtags('#node #testing')}`);

  console.log('\n=== Task Manager ===');
  const manager = new TaskManager();
  manager.addTask('Buy groceries');
  manager.addTask('Write tests');
  manager.completeTask(1);
  console.log('Pending tasks:', manager.getPending());
  console.log('Completed tasks:', manager.getCompleted());

  console.log('\n=== Product Service ===');
  console.log('All products:', getAllProducts());
  console.log('Products under $50:', getProductsByMaxPrice(50));
}

run();
