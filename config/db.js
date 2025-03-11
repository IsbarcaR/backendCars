const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://ismaelbarranco2402:Vnw7rSEfsfuzObQi@cars.vffov.mongodb.net/?retryWrites=true&w=majority&appName=Cars";
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
  }
}

connectDB(); // Conectar a la base de datos al iniciar la aplicación

module.exports = client;
