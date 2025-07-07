const crypto = require("crypto");

// Generate a secure random session secret
const sessionSecret = crypto.randomBytes(64).toString("hex");

console.log("🔐 Generated SESSION_SECRET:");
console.log("Copy this to your .env file:");
console.log(`SESSION_SECRET=${sessionSecret}`);
console.log("");
console.log("⚠️  IMPORTANT:");
console.log("- Keep this secret safe");
console.log("- Never commit it to version control");
console.log("- Use different secrets for development/production");
console.log("- This will invalidate all existing sessions");
