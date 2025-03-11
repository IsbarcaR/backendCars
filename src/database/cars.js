const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb+srv://ismaelbarranco2402:Vnw7rSEfsfuzObQi@cars.vffov.mongodb.net/?retryWrites=true&w=majority&appName=Cars";
const client = new MongoClient(uri);

let db; 

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db("CarsDB");
    console.log("🔗 Conectado a MongoDB");
  }
  return db;
}

async function getAllCars() {
  const db = await connectDB();
  return await db.collection("cars").find().toArray();
}

async function getCar(carId) {
  const db = await connectDB();
  try {
    
    return await db.collection("cars").findOne({ id: carId });
  } catch (error) {
    console.error("Error buscando coche por id:", error);
    throw error;
  }
}

async function createCar(newCar) {
  const db = await connectDB();
  const result = await db.collection("cars").insertOne(newCar);
  return { _id: result.insertedId, ...newCar };
}

async function updateCar(carId, changes) {
  const db = await connectDB();
  await db.collection("cars").updateOne({ id: carId }, { $set: changes });
  return await getCar(carId);
}

async function deleteCar(carId) {
  const db = await connectDB();
  return await db.collection("cars").deleteOne({ id: carId });
}

async function getUser() {
  const db = await connectDB();
  return await db.collection("users").findOne();
}

module.exports = {
  getAllCars,
  createCar,
  getCar,
  updateCar,
  deleteCar,
  getUser,
  connectDB
};