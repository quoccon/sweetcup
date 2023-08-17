var express =  require("express");
var router = express.Router();
var productCtrll = require("../controller/product.controller");


router.get("/listPro",productCtrll.getListProduct);