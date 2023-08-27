import express from "express";
var userCtro = require('../controller/user.controller')
var productCtroll = require('../controller/product.controller');
var homeCtroll = require('../controller/home.controller')
var checkLogin = require('../middleware/checkLogin')
var apiU = require('../controller/API/use.api')
var apiProduct = require('../controller/API/product.api')
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
    router.get("/api/user",apiU.api_listU);
    router.post("/api/reg",apiU.api_Reg);
    router.post("/api/editU/:idu",apiU.api_edit);
    router.post("/api/login",apiU.api_Login);
    router.get("/api/login",apiU.api_Login);
    


    
    
    
    



    //product
    router.get("/product",productCtroll.getListProduct);
    router.post("/product/edit-product/:idSp",objUpload.single("avata"),productCtroll.editPro);
    router.post("/product/create-product",objUpload.single("avata"),productCtroll.add);
    router.post("/product/delete-product/:idSp",productCtroll.deleteProduct);
    router.get('/api/product',apiProduct.api_ListProduct)
    return app.use("/",router);
}

export default initWebRouter;