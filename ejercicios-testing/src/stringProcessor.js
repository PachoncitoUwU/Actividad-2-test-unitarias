// stringProcessor.js — Ejercicio 2

/**
 * Oculta el usuario del email dejando solo el primer y último carácter visibles.
 * Ejemplo: "sergio@gmail.com" → "s*****o@gmail.com"
 * Si el usuario tiene solo 1 carácter, devuelve el email sin cambios.
 * Si el email no contiene @, lanza un Error.
 */
function maskEmail(email) {
  if (!email.includes('@')) {
    throw new Error('El email no contiene @.');
  }
  const [user, domain] = email.split('@');
  if (user.length <= 1) {
    return email;
  }
  const masked = user[0] + '*'.repeat(user.length - 2) + user[user.length - 1];
  return `${masked}@${domain}`;
}

/**
 * Invierte el orden de las palabras en la oración.
 * Ejemplo: "hola mundo node" → "node mundo hola"
 * Maneja espacios múltiples. Devuelve "" si el texto está vacío o es solo espacios.
 */
function reverseWords(sentence) {
  if (!sentence || sentence.trim() === '') return '';
  return sentence.trim().split(/\s+/).reverse().join(' ');
}

/**
 * Devuelve un array con todos los hashtags encontrados en el texto.
 * Ejemplo: "Me gusta #node y #testing" → ["#node", "#testing"]
 * Devuelve [] si no hay hashtags.
 */
function extractHashtags(text) {
  const matches = text.match(/#\w+/g);
  return matches || [];
}

module.exports = { maskEmail, reverseWords, extractHashtags };
