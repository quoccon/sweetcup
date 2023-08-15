import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRouter from "./router/web";
require("dotenv").config();
import bodyParser from "body-parser";



const app = express();
const PORT = 8080;

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));    

//init web router
initWebRouter(app);

app.listen(PORT, ()=>{
    console.log(">>> Server is running on the port :" + PORT);
})