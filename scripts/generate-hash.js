// archivo: generar-hash.js

const bcrypt = require("bcrypt");

// --- CONFIGURACIÓN ---
// Escribe aquí la nueva contraseña que quieres usar.
const nuevaPasswordEnTextoPlano = "";

// Este es el "cost factor" o "rondas". 10 es un valor estándar y seguro.
// Tu hash actual ($2b$10$...) ya usa 10, así que mantenemos la consistencia.
const saltRounds = 10;

// --- EJECUCIÓN ---
console.log(
  `Generando hash para la contraseña: "${nuevaPasswordEnTextoPlano}"...`
);

bcrypt.hash(nuevaPasswordEnTextoPlano, saltRounds, (err, hash) => {
  if (err) {
    console.error("❌ Error al generar el hash:", err);
    return;
  }

  console.log("\n✅ ¡Hash generado con éxito!");
  console.log(
    "Copia la siguiente línea completa y pégala en el campo 'password' de la base de datos:"
  );
  console.log("\n" + hash + "\n");
});
