const express = require('express') 
var userCtro = require('../controller/user.controller')
var productCtroll = require('../controller/product.controller');
var homeCtroll = require('../controller/home.controller')
var checkLogin = require('../middleware/checkLogin')
var apiU = require('../controller/API/use.api')
var apiProduct = require('../controller/API/product.api')
var apiCart = require("../controller/API/cart.api");
var apiBill = require('../controller/API/bill.api');
// var catPro = require('../controller/catPro.controller');
var cartCtroll = require("../controller/Cart.controller")
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
    router.get("/reg",userCtro.reg)
    router.post("/reg",userCtro.reg)
    router.get("/home",checkLogin.ycLogin, homeCtroll.handelHelloWorld);
    router.get("/user",checkLogin.ycLogin,userCtro.getAllUsers);
    router.post("/user/submit-form",checkLogin.ycLogin,objUpload.single("avat"),userCtro.addUser);
    router.post("/user/dele-user/:idu",checkLogin.ycLogin,userCtro.deleteU);
    router.post("/user/edit-user/:idu",checkLogin.ycLogin,objUpload.single("avata"),userCtro.editU);
    router.post("/user/sreach",checkLogin.ycLogin,userCtro.getAllUsers);
     // ==============auth Router API===========================
    router.get("/api/user",apiU.api_listU);
    router.post("/api/reg",apiU.api_Reg);
    router.post("/api/editU/:idu",apiU.api_edit);
    router.post("/api/login",apiU.api_Login);
    router.get("/api/login",apiU.api_Login);
    //=================================Nạp tiền================================
    router.post("/api/recharge",apiU.recharge)
    router.post("/api/addwishlist",apiU.addToWishlist)
    router.get("/api/getWishlist",apiU.getWishlist)
    router.post("/api/pay",apiU.pay);




    //product
    router.get("/product",productCtroll.getListProduct);
    router.post("/product/edit-product/:idSp",objUpload.single("imageproduct"),productCtroll.editPro);
    router.post("/product/create-product",objUpload.single("imageproduct"),productCtroll.add);
    router.post("/product/delete-product/:idSp",productCtroll.deleteProduct);
    router.get('/api/product',apiProduct.api_ListProduct)
    // router.get('/api/search-products',apiProduct.findProductSearch);
    // router.get('/api/getbill',apiProduct.getBill);
    // router.post('/api/addbill',apiProduct.addBill);
    router.post('/api/addbill',apiBill.addBill)

    // thể loại
    // router.get("/catPro",catPro.getListCat);
    // router.get('/api/listCat',apiProduct.api_ListCat);
    //Cart
    router.get("/cart",cartCtroll.getListCart);
    router.post("/cart/create-cart",objUpload.single("imagecart"),cartCtroll.addCart);
    router.post("/cart/delete-cart/:idC",cartCtroll.deleteCart);
    router.get("/api/cart",apiCart.api_listCart)

    return app.use("/",router);
}

module.exports = initWebRouter;