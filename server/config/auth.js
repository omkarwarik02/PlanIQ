const { betterAuth } = require("better-auth");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI || "mongodb://127.0.0.1:27017");

const auth = betterAuth({
    basePath:"/api/auth",
    trustedOrigins: ["http://localhost:4200"],
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: true
  }
});

module.exports = { auth };