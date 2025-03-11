const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const v1CarRoutes = require('./v1/routes/carsRoutes');
const { connectDB } = require('./database/cars'); // Ajusta la ruta según tu estructura

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Ruta de prueba para verificar que el servidor funciona
app.get("/", (req, res) => {
    res.send('<h1>HOLA CHURROS - API de Coches</h1>');
});

// Ruta para verificar estado
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "API funcionando correctamente" });
});

// Rutas principales de la API
app.use('/api/v1/cars', v1CarRoutes);

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: "ERROR",
        message: "Ha ocurrido un error en el servidor"
    });
});

// Inicia el servidor
const startServer = async () => {
    try {
        // Intenta conectar a la base de datos antes de iniciar el servidor
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Servidor funcionando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    }
};

startServer();