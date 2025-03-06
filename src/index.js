const express= require ('express');

const cors= require('cors')
/* const corsOptions = {
    origin: "*", 
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
  }; */
const app = express()
const PORT= process.env.PORT || 3000;
const v1CarRoutes= require("./v1/routes/carsRoutes");

const bodyParser = require('body-parser');


app.get("/",(request,response)=>{
    response.send('<h1>HOLA CHURROS</h1>')
})
app.use(cors({
    origin: 'https://cars-fw4uia7pz-ismaels-projects-2bab6c89.vercel.app/'
  }));
/* app.use(cors(corsOptions)); */
app.use(bodyParser.json());
app.use('/api/v1/cars',v1CarRoutes)

app.listen(PORT,()=>console.log(`Funcionando puerto ${PORT}`))

