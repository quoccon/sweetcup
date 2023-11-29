var myMD = require('../../Model/productModel');
var objReturn ={
    product:"",
    status :1,
    msg :'okai'
}

exports.api_ListProduct = async (req,res,next) => {
    // let listProduct = []
    try {
        var listProduct = await myMD.productModel.find()
        if(listProduct.length > 0){
            objReturn.product = listProduct;
        }else{
            objReturn.status = 0;
            objReturn.msg = "Khong co du lieu"
        }
    } catch (error) {
        console.log(error);
    }

    res.json(objReturn)
}

exports.api_ListCat = async (req,res,next) =>{
    let listCat = []
    try {
        listCat = await myMD.catModel.find();
        if(listCat.length > 0){
            objReturn.data = listCat;
        }else{
            objReturn.status = 0;
            objReturn.msg = "Khong co du lieu"
        }
    } catch (error) {
        console.log(error);
    }

    res.json(objReturn);
}

exports.api_createProduct = (req,res,next) => {
    
}



exports.findProduct = async (req, res) => {
    const query =  req.query.q;
    try {
      const pro = await myMD.productModel.find({
        $or: [
          {nameproduct: {$regex: query,$options:'i'}},
          {description: {$regex: query,$options:'i'}},
        ],
      });
      res.json(pro);
    } catch (error) {
      console.log("Lỗi tìm kiếm");
      console.log(error);
    }
  }