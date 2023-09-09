var myMD = require("../../Model/CartModel");

var objReturn = {
    cart :"",
    status:1,
    msg:"oki"
}

exports.api_listCart = async(req,res,next) => {
    try {
        var listCart = await myMD.CartModel.find();
        if(listCart.length > 0) {
            objReturn.cart = listCart;
        }else{
            objReturn.status = 0;
            objReturn.msg = "Không có dữ liệu";
        }
    } catch (error) {
        console.log(error);
    }
    
    res.json(objReturn)
}