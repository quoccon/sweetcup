const path = require("path");
const myMD = require("../Model/productModel");
const fs = require("fs");

// Hiển thị danh sách sản phẩm
exports.getListProduct = async (req, res, next) => {
  try {
    const listSp = await myMD.productModel.find();
    console.log(listSp);
    res.render("../views/products/product.ejs", { listSp: listSp });
  } catch (error) {
    console.error(error);
    res.status(500).send("Đã xảy ra lỗi trong quá trình lấy danh sách sản phẩm.");
  }
};

// Thêm mới sản phẩm
exports.add = async (req, res, next) => {
  console.log("Thêm Sản Phẩm");
  let msg = "";

  if (req.method === "POST") {
    try {
      let image = "";
      if (req.file != null) {
        const destinationPath = path.join(__dirname, "../public/templates");
        const tempFilePath = req.file.path;
        const originalName = req.file.originalname;

        fs.renameSync(tempFilePath, path.join(destinationPath, originalName));
        console.log("Url: http://localhost:8080/templates/" + originalName + "success");
        
        image = "/templates/" + originalName;
      }

      const objSP = new myMD.productModel({
        nameproduct: req.body.nameproduct,
        price: req.body.price,
        description: req.body.description,
        image: image,
        id_cat: req.body.category,
      });

      const new_sp = await objSP.save();
      console.log(new_sp);
      msg = "Đã thêm thành công";
    } catch (error) {
      msg = "Lỗi: " + error.message;
      console.error(error);
    }
  }

  res.redirect("/product");
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res, next) => {
  const idPro = req.params.idSp;
  console.log(idPro);

  try {
    await myMD.productModel.deleteOne({ _id: idPro });
    res.redirect("/product");
  } catch (error) {
    console.error(error);
    res.status(500).send("Đã xảy ra lỗi trong quá trình xóa sản phẩm.");
  }
};

// Sửa sản phẩm
exports.editPro = async (req, res, next) => {
  const idSp = req.params.idSp;
  console.log(idSp);

  if (req.method === 'POST') {
    try {
      const destinationPath = path.join(__dirname, "../public/templates");
      const tempFilePath = req.file.path;
      const originalName = req.file.originalname;

      fs.renameSync(tempFilePath, path.join(destinationPath, originalName));
      console.log("Url: http://localhost:8080/templates/" + originalName + "Chuyển OKe");

      const updatedProduct = {
        nameproduct: req.body.nameproduct,
        price: req.body.price,
        description: req.body.description,
        image: "/templates/" + originalName,
      };

      await myMD.productModel.updateOne({ _id: idSp }, updatedProduct);
      console.log('Update thành công');
      res.redirect('/product');
    } catch (error) {
      console.error(error);
      res.status(500).send("Đã xảy ra lỗi trong quá trình cập nhật sản phẩm.");
    }
  }
};
