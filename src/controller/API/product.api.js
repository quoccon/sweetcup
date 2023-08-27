var myMD = require('../../Model/productModel');
var objReturn ={
    status :1,
    mgs :'okai'
}

exports.api_ListProduct = async (req,res,next) => {
    let listProduct = []
    try {
        listProduct = await myMD.productModel.find()
        if(listProduct.length > 0){
            objReturn.data = listProduct;
        }else{
            objReturn.status = 0;
            objReturn.mgs = "Khong co du lieu"
        }
    } catch (error) {
        console.log(error);
    }

    res.json(objReturn)
}