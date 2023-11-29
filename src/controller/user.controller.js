const myMD = require("../Model/userModel");
const path = require("path");



exports.login = async (req, res, next) => {
  let msg = " ";
  if (req.method == "POST") {
    try {
      let objU = await myMD.userModel.findOne({ username: req.body.username });
      console.log(objU);
      if (objU != null) {
        if (objU.password == req.body.passwd) {
          req.session.userLogin = objU;
          console.log("Đăng Nhập vào tk:" + req.session.userLogin.username);
          return res.redirect("/home");
        } else {
          msg = "Sai Mật Khẩu";
          console.log("Đăng Nhập Lỗi" + req.body.passwd + "=" + objU.password);
        }
      } else {
        msg = "Không có thông tin người dùng ";
        console.log("ko có");
      }
    } catch (error) {
      msg = "Lỗi : " + error.message;
      console.log(error);
    }
  }

  res.render("auth/login", { msg: msg });
};

exports.reg = async (req, res, next) => {
  let msg = " ";
  if (req.method == "POST") {
    console.log(req.body);
    // Kiểm tra tính hợp lệ của mật khẩu
    if (req.body.passwd != req.body.passwd2) {
      msg = "Xác nhận password không đúng";
      return res.render("auth/reg", { msg: msg });
    }

    // Lưu vào CSDL
    try {
      let objU = new myMD.userModel();
      objU.username = req.body.username;
      objU.password = req.body.passwd;
      objU.email = req.body.email;
      objU.balance = "0"

      await objU.save();
      msg = "Đăng ký thành công";
      console.log(objU);
      res.redirect("/");
    } catch (error) {
      msg = "Lỗi: " + error.message;
    }
  }

  res.render("auth/reg", { msg: msg });
};

exports.getAllUsers = async (req, res, next) => {
  var listU = await myMD.userModel.find();
  res.render("../views/screens/users/list_user.ejs", { listU: listU });
};
var fs = require("fs");
exports.addUser = async (req, res, next) => {
  console.log("Hàm chạy");
  var msg = "";
  var user = "";
  if (req.session.userLogin) {
    user = req.session.userLogin.username;
  }
  if (req.method == "POST") {

    if (req.file != null) {
      const destinationPath = path.join(
        __dirname,
        "../public/templates"
      );
      const tempFilePath = req.file.path;

      // Đặt tên tệp và đường dẫn đích
      const fileName = req.file.originalname;
      const fileDestination = path.join(destinationPath, fileName);

      fs.rename(tempFilePath, fileDestination, async (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Tải lên ảnh thành công: ${fileDestination}`);

          // Tạo đường dẫn trên Firebase Storage
          const storagePath = `avatars/${fileName}`;
          const fileRef = storage.bucket().file(storagePath);

          // Tải tệp ảnh lên Firebase Storage
          await fileRef.save(fs.readFileSync(fileDestination));

          var objU = new myMD.userModel();
          objU.username = req.body.username;
          objU.email = req.body.email;
          objU.password = req.body.pwwd1;

          // Lấy đường dẫn URL của ảnh
          const downloadURL = await fileRef.getSignedUrl({
            action: "read",
            expires: "03-09-2100" // Ngày hết hạn URL tải xuống
          });

          objU.avata = downloadURL[0]; // Lấy URL đầu tiên

          try {
            let new_user = await objU.save();
            console.log(new_user);
            msg = "Đã Thêm Người Dùng Mới Thành Công";
            res.redirect("/user");
          } catch (error) {
            console.log(error);
            msg = "Lỗi: " + error.message;
          }
        }
      });
    } else {
      console.log("Chưa tải lên ảnh");
    }
     
    
  }

  res.redirect("/user");
};

exports.editU = async (req, res, next) => {
  var idu = req.params.idu;
  console.log(idu);
  if (req.method == "POST") {
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
    objU.avata = "http://sweetcup.store/templates/" + req.file.originalname;
    objU._id = idu;

    try {
      await myMD.userModel.updateOne({ _id: idu }, objU);
      console.log("Update thành công");
      res.redirect("/user");
    } catch (error) {
      console.log(error);
    }
  }
};

exports.deleteU = async (req, res, next) => {
  var idu = req.params.idu;
  console.log(idu);

  try {
    await myMD.userModel.deleteOne({ _id: idu });
    res.redirect("/user");
  } catch (error) {
    console.log(error);
  }
};

exports.logUot = async (req, res, next) => {
  req.session.userLogin = null;
  res.redirect("/");
};
