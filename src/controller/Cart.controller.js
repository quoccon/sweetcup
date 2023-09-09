const path = require("path");
const myMD = require("../Model/CartModel")

exports.getListCart = async (req, res, next) => {
    var listCart = await myMD.CartModel.find();

    console.log(listCart);
    res.render("../views/products/Cart.ejs", { listCart });
};


var fs = require("fs")
exports.addCart = async (req, res, next) => {
    console.log("Add cart");

    let msg = "";

    if (req.method == "POST") {
        console.log(req.body.image);
        if (req.body.image != null) {
            const destinationPath = path.join(__dirname, "../public/templates");
            const tempFilePath = req.file.path;

            fs.rename(
                tempFilePath,
                path.join(destinationPath, req.file.originalname),
                (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log((
                            "Url: http://localhost:8080/templates/" +
                            req.file.originalname + "success"));
                    }
                }
            );
        }else{
            console.log("đéo được");
        }
        var objCart = new myMD.CartModel();
        objCart.nameproduct = req.body.nameproduct;
        objCart.quantity = req.body.quantity;
        objCart.price = req.body.price;
        if(req.body.image != null){
            objCart.image = "http://localhost:8080/templates/" + req.file.originalname;
        }else{
            console.log("không có ảnh");
        }

        try {
            let newcart = await objCart.save();
        } catch (error) {
            msg = "Lỗi" + error.message;
            console.log(error);
        }
    }
    res.redirect("/cart");
}


exports.deleteCart = async (req, res, next) => {
    var idCart = req.params.idC;
    console.log(idCart);

    try {
        await myMD.CartModel.deleteOne({_id: idCart});
        res.redirect("/cart");
    } catch (error) {
        console.log(error);
    }
} 
