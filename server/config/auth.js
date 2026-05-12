const { betterAuth } = require("better-auth");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI || "mongodb://127.0.0.1:27017");

const trustedOrigins = [
  "http://localhost:4200",
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];

const auth = betterAuth({
    basePath:"/api/auth",
    trustedOrigins: (origin) =>
      trustedOrigins.includes(origin) ||
      /^https:\/\/helio[a-z0-9-]*\.vercel\.app$/.test(origin),
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: true
  }
});

module.exports = { auth };