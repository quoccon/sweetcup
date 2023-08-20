var express =  require("express");
var router = express.Router();
var productCtrll = require("../controller/product.controller");


router.get("/listPro",productCtrll.getListProduct);
router.post("/product.create-product",productCtrll.add);
router.post("/product/delete-product:idSp",productCtrll.deleteProduct);