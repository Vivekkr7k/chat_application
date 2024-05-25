const express = require("express");
const connectDb = require("./src/config/dbConnection");
const dotenv =require("dotenv").config();
const cors = require("cors");




connectDb() ; //calls from config/dbConnection file

const app = express();

app.use(cors())

const port = process.env.PORT||5000;

app.use(express.json())

app.use("/api/adminRegistration",require("./src/routes/adminRegRoutes"));

app.use("/api/employeeRegistration",require("./src/routes/employeeRegRoutes"));






//app.use(errorHandler);

    


app.listen(port,()=>{
    console.log(`Server runiinrng port no ${port}`);
})