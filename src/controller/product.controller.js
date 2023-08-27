// const { method } = require('bluebird');
const path = require("path");
const myMD = require("../Model/productModel");

//Hiển thị danh sách sản phẩm

exports.getListProduct = async (req, res, next) => {
  var listSp = await myMD.productModel.find();

  console.log(listSp);
  res.render("../views/products/product.ejs", { listSp: listSp });
};



//Thêm mới sản phẩm
var fs = require("fs");
exports.add = async (req, res, next) => {
    console.log("Thêm Sản Phẩm");
  let msg = "";
  
  // let listCat = await myMD.catModel.find();
  if (req.method == "POST") {
    console.log(req.body.nameproduct);
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
            console.log(
              "Url: http://localhost:8080/templates/" +
                req.file.originalname +
                "success"
            );
          }
        }
      );
    }
    var objSP = new myMD.productModel();
    objSP.nameproduct = req.body.nameproduct;
    objSP.price = req.body.price;
    objSP.description = req.body.description;
    if (req.body.image != null) {
      objSP.image = "http://localhost:8080/templates/" + req.file.originalname;
    }
    // objSP.id_cat= req.body.category;

    
      try {
        let new_sp = await objSP.save();
        console.log(new_sp);
        msg = "Đã thêm thành công";
      } catch (error) {
        msg = "Lỗi :" + error.message;
        console.log(error);
      }
    
  }

  res.redirect("/product");
};


//Xóa sản phẩm
exports.deleteProduct = async (req, res, next) => {
  var idPro = req.params.idSp;
  console.log(idPro);

  try {
    await myMD.productModel.deleteOne({ _id: idPro });
    res.redirect("/product");
  } catch (error) {
    console.log(error);
  }
};


//Sửa sản phẩm
exports.editPro = async (req,res,next)=>{
  var idSp = req.params.idSp;
  console.log(idSp);
  if (req.method == 'POST') {
    const destinationPath = path.join(
      __dirname,
      "../public/templates"
    );
    const tempFilePath = req.file.path;

    fs.rename(
      tempFilePath,
      path.join(destinationPath, req.file.originalname),
      (err) => {
        if (err) {
          console.log(err);
        } else
          console.log(
            "Url: http://localhost:8080/templates/" +
              req.file.originalname +
              "Chuyển OKe"
          );
      }
    );
    var objPro = new myMD.productModel();
    objPro.nameproduct = req.body.nameproduct;
    objPro.price = req.body.price;
    objPro.description = req.body.description;
    objPro.avata = "http://localhost:8080/templates/" + req.file.originalname;
    objPro._id= idSp;

    try {
      await myMD.productModel.updateOne({_id: idSp},objPro)
      console.log('Update thành công')
      res.redirect('/product')
    } catch (error) {
      console.log(error)
    }

  }

}
