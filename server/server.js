require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoute = require("./route/auth-route");
const contactRoute = require("./route/contact-route")
const productRoute = require("./route/product-route")
const orderRoute = require("./route/order-route");
const connnectDb = require('./utils/db');
const errorMiddleware = require("./middlewares/error-middleware");

const corsOption = {
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, PATCH, DELETE, HEAD',   
    credentials: true,
};

app.use(cors(corsOption));

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form",contactRoute);
app.use("/api/products",productRoute);
app.use("/api/order", orderRoute);

app.use(errorMiddleware);

app.get('/', (req,res) => {
    res.status(200).send("Welcome cutuu...");
})

app.get('/register', (req,res) => {
    res.status(200).send("Registeration Page :-");
})

const PORT = 5000;

connnectDb().then(() => {
app.listen(PORT , () => {
    console.log(`Server is running on : ${PORT}`)
})  
});