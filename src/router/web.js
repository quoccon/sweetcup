import express from "express";
import homeCtroll from "../controller/home.controller"; 

const router = express.Router();

/**
 * 
 * @param {*} app : express app 
 */

const handelHelloWorld = (req, res) =>{
        return res.send("Hello World");
}


const initWebRouter = (app) =>{
    router.get("/", homeCtroll.handelHelloWorld);
    router.get("/user",homeCtroll.handelUserPage);
    router.post("/users.create-user",homeCtroll.handelCreateUser);
    router.post("/dele-user/:id",homeCtroll.handelDeleleUser);

    return app.use("/",router);
}

export default initWebRouter;