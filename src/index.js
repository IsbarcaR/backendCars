const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const v1CarRoutes = require('./v1/routes/carsRoutes'); 
const { connectDB } = require('./database/cars'); // función de conexion desde cars.js

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

//  verificar que el servidor funciona
app.get("/", (req, res) => {
    res.send('<h1>HOLA CHURROS</h1>');
});

//  verificar la conexión con MongoDB
app.get("/test-db", async (req, res) => {
    try {
       
        await connectDB(); 
        res.json({ message: "Conexión exitosa a MongoDB" });
    } catch (error) {
        res.status(500).json({ message: "Error al conectar con MongoDB", error: error.message });
    }
});

// Rutas principales de la API
app.use('/api/v1/cars', v1CarRoutes);

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});