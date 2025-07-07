require("dotenv/config");

// Define all required environment variables
const requiredEnvVars = [
  {
    name: "MONGODB_URI",
    description: "🗄️  Database connection URI",
    required: true,
    example: "mongodb://localhost:27017/yapic",
    usedIn: ["db/index.js", "config/index.js"],
  },
  {
    name: "SESSION_SECRET",
    description: "🔐 Secret key for session encryption (64+ chars)",
    required: true,
    example: "your-super-secret-session-key-here-64-characters-long",
    usedIn: ["config/index.js"],
  },
  {
    name: "SALT",
    description: "🔒 BCrypt salt rounds for password hashing",
    required: false,
    example: "10",
    default: "10",
    usedIn: ["routes/auth-routes.js", "routes/private-routes.js"],
  },
  {
    name: "CLOUDINARY_NAME",
    description: "☁️  Cloudinary account name for image uploads",
    required: true,
    example: "your-cloudinary-name",
    usedIn: ["config/cloudinary.js"],
  },
  {
    name: "CLOUDINARY_KEY",
    description: "🔑 Cloudinary API key",
    required: true,
    example: "your-cloudinary-api-key",
    usedIn: ["config/cloudinary.js"],
  },
  {
    name: "CLOUDINARY_SECRET",
    description: "🔐 Cloudinary API secret",
    required: true,
    example: "your-cloudinary-api-secret",
    usedIn: ["config/cloudinary.js"],
  },
  {
    name: "PORT",
    description: "🚀 Server port number",
    required: false,
    example: "3001",
    default: "3001",
    usedIn: ["server.js"],
  },
  {
    name: "NODE_ENV",
    description: "🛠️  Environment mode (development/production)",
    required: false,
    example: "development",
    default: "development",
    usedIn: ["General Node.js best practice"],
  },
];

console.log("🔍 YAPIC - Environment Variables Status\n");
console.log("=".repeat(50));

let allConfigured = true;
let criticalMissing = false;

requiredEnvVars.forEach((envVar) => {
  const value = process.env[envVar.name];
  const isSet = !!value;
  const status = isSet ? "✅" : envVar.required ? "❌" : "⚠️ ";

  console.log(`${status} ${envVar.name}`);
  console.log(`   ${envVar.description}`);

  if (isSet) {
    const displayValue =
      envVar.name.includes("SECRET") ||
      envVar.name.includes("KEY") ||
      envVar.name.includes("CLOUDINARY")
        ? "*".repeat(value.length)
        : value;
    console.log(`   Current: ${displayValue}`);
  } else {
    console.log(`   Example: ${envVar.example}`);
    if (envVar.default) {
      console.log(`   Default: ${envVar.default}`);
    }
    if (envVar.required) {
      criticalMissing = true;
    }
    allConfigured = false;
  }

  console.log(`   Used in: ${envVar.usedIn.join(", ")}`);
  console.log("");
});

console.log("=".repeat(50));

if (allConfigured) {
  console.log("🎉 All environment variables are configured!");
} else if (criticalMissing) {
  console.log("❌ CRITICAL: Some required environment variables are missing!");
  console.log("   The application may not work properly.");
} else {
  console.log("⚠️  Some optional environment variables are missing.");
  console.log("   The application will use default values.");
}

console.log("\n📝 To create your .env file, copy these lines:");
console.log("=".repeat(50));
requiredEnvVars.forEach((envVar) => {
  const value = process.env[envVar.name] || envVar.example;
  console.log(`${envVar.name}=${value}`);
});
console.log("=".repeat(50));
