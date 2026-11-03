import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client;
let clientPromise;

if (!uri) {
  console.warn("MONGODB_URI is not defined in environment variables. Database features will fallback to memory.");
} else {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export default clientPromise;

/**
 * Helper to get the MongoDB database instance.
 * Automatically targets the database defined in the MONGODB_URI connection string
 * (e.g. 'netarhat_tourism') without requiring a separate MONGODB_DB environment variable.
 */
export async function getDatabase(dbName) {
  if (!clientPromise) {
    throw new Error("MongoDB client is not initialized. Please verify MONGODB_URI in .env.local");
  }
  const connectedClient = await clientPromise;
  return dbName ? connectedClient.db(dbName) : connectedClient.db();
}

