var myMD = require("../../Model/userModel");
var objReturn = {
  status: 1,
  msg: " ",
  info_user: " ",
};
exports.api_Login = async (req, res, next) => {
  if (req.method == "POST") {
    try {
      let objU = await myMD.userModel.findOne({ username: req.body.username });
      console.log(objU);
      if (objU != null) {
        if (objU.password == req.body.passwd) {
          req.session.userLogin = objU;
          console.log("Đăng Nhập vào tk:" + req.session.userLogin.username);
          objReturn.status = 0;
          objReturn.msg = "Đăng nhập thành công";
          objReturn.info_user = objU;
        } else {
          objReturn.msg = "Sai Mật Khẩu";
          objReturn.status = 1;
          console.log("Đăng Nhập Lỗi" + req.body.passwd + "=" + objU.password);
        }
      } else {
        objReturn.msg = "Không có thông tin người dùng ";
      }
    } catch (error) {
      objReturn.msg = "Lỗi : " + error.message;
      console.log(error);
    }
  }
  res.json(objReturn);
};
exports.api_listU = async (req, res, next) => {
  let listU = [];
  try {
    listU = await myMD.userModel.find();
    if (listU.length > 0) {
      objReturn.data = listU;
    } else {
      objReturn.status = 0;
      objReturn.msg = "Không có dữ liệu";
    }
  } catch (error) {
    console.log(error);
  }

  res.json(objReturn);
};

exports.api_Reg = async (req, res, next) => {
  if (req.method == "POST") {
    console.log(req.body);
    let objU = await myMD.userModel.findOne({ username: req.body.username });
    if (objU.username == req.body.username) {
      objReturn.msg = "Tài Khoản này đã được đăng ký";
      console.log("Tài khoản trùng");
    }

    //lưu CSDL

    if (
      req.body.username != null &&
      req.body.email != null &&
      req.body.passwd != null
    ) {
      if (objU.username == req.body.username) {
        objReturn.msg = "Tài Khoản này đã được đăng ký";
        objReturn.status = 3
        console.log("Tài khoản trùng");
      } else {
        try {
          let objU = new myMD.userModel();
          objU.username = req.body.username;
          objU.phone = req.body.phone;
          objU.password = req.body.passwd;
          objU.email = req.body.email;

          await objU.save();
          console.log("Oke");
          console.log(objU);
          objReturn.msg = "Đăng Ký thành Công";
          objReturn.status = 0;
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      console.log("Chưa dk đc");
    }
  }

  res.json(objReturn);
};

exports.api_edit = async (req, res, next) => {
  var idu = req.params.idu;
  var msg = " ";
  console.log(idu);
  if (req.method == "POST") {
    if (
      req.body.username != null &&
      req.body.email != null &&
      req.body.passwd != null
    ) {
      const destinationPath = path.join(__dirname, "../public/templates");
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
      var objU = new myMD.userModel();
      objU.username = req.body.username;
      objU.email = req.body.email;
      objU.password = req.body.pwwd1;
      objU.avata = "http://localhost:8080/templates/" + req.file.originalname;
      objU._id = idu;

      try {
        await myMD.userModel.updateOne({ _id: idu }, objU);
        console.log("Update thành công");
      } catch (error) {
        console.log(error);
      }
    } else {
      objReturn.status = 0;
      objReturn.msg = "Chưa đủ thông tin";
    }
  }
  res.json(objReturn);
};
