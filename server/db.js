// db.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://phillrballn_db_user:jgCYLSkZZuXXlP5R@habit-randomized-db.kab27ms.mongodb.net/?retryWrites=true&w=majority&appName=habit-randomized-db";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db("habitDB");
    console.log("✅ Connected to MongoDB!");
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call connectToDatabase first.");
  }
  return db;
}

module.exports = { connectToDatabase, getDb };
