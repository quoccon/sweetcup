var myMD =require('../Model/productModel');

exports.getListCat = (req,res,next) => {
    var listCatPro = myMD.productModel.find();

    console.log(listCatPro);

    res.render('../views/products/product.ejs');
}