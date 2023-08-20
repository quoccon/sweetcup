import express from "express";
var userCtro = require('../controller/user.controller')
var productCtroll = require('../controller/product.controller');
var checkLogin = require('../middleware/checkLogin')
const router = express.Router();
var multer = require('multer');
var objUpload = multer({ dest: './tmp' });

/**
 * 
 * @param {*} app : express app 
 */

const handelHelloWorld = (req, res) =>{
        return res.send("Hello World");
}


const initWebRouter = (app) =>{
    // ==============auth Router===========================
    router.get("/",userCtro.login);
    router.post("/", userCtro.login);
    router.get("/home",checkLogin.ycLogin, homeCtroll.handelHelloWorld);
    router.get("/home-tam",homeCtroll.handelUserPage);
    router.get("/user",userCtro.getAllUsers);
    router.post("/user/submit-form",objUpload.single("avata"),userCtro.addUser);
    router.post("/user/dele-user/:idu",userCtro.deleteU);
    router.post("/user/edit-user/:idu",objUpload.single("avata"),userCtro.editU);
    router.post("/user/sreach",userCtro.getAllUsers);
    
    
    
    



    //product
    router.get("/product",productCtroll.getListProduct);
    router.get('/addProduct',productCtroll.add);
    router.post("/product.create-product",productCtroll.add)
    router.post("/product/delete-product:idSp",productCtroll.deleteProduct);

    return app.use("/",router);
}

export default initWebRouter;