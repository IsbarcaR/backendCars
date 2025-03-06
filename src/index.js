const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "*", // O usa un dominio específico si lo necesitas
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type,Authorization",
};

// Middleware de CORS y body-parser
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Rutas principales
const v1CarRoutes = require("./v1/routes/carsRoutes");

// 🔹 Configurar el proxy inverso (redirige peticiones desde '/api/proxy' hacia Render)
app.use(
  "/api/proxy",
  createProxyMiddleware({
    target: "https://backendcars-fmut.onrender.com", // URL de tu backend en Render
    changeOrigin: true,
    pathRewrite: { "^/api/proxy": "/api/v1/cars" }, // Reescribe la ruta si es necesario
  })
);

// Ruta de prueba
app.get("/", (request, response) => {
  response.send("<h1>HOLA CHURROS</h1>");
});

// Rutas de tu API
app.use("/api/v1/cars", v1CarRoutes);

app.listen(PORT, () => console.log(`Funcionando en el puerto ${PORT}`));
