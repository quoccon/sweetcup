const myMD = require('../Model/productModel');


exports.getListProduct = async (req, res, next) => {
    var listSp = await myMD.productModel.find();

    console.log(listSp);
    res.render('../views/products/product.ejs',{listSp:listSp});
}
