var myMD = require("../../Model/userModel");
var myMDA = require("../../Model/Address");
var objReturn = {
  status: 1,
  msg: " ",
  info_user: " ",
};

exports.api_Login = async (req, res, next) => {
  if (req.method == "POST") {
    const cleanedPassword = req.body.passwd.trim();
    try {
      let objU = await myMD.userModel.findOne({ username: req.body.username }).populate('wishlist');
      console.log(objU);
      if (objU !== null) {
        if (objU.password == cleanedPassword) {
          req.session.userLogin = objU;
          console.log("Đăng Nhập vào tk:" + req.session.userLogin.username);
          objReturn.status = 0;
          objReturn.msg = "Đăng nhập thành công";
          objReturn.info_user = objU;
        } else {
          objReturn.msg = "Sai Mật Khẩu" + req.body.passwd;
          objReturn.status = 1;
          console.log("Sai mật khẩu" + req.body.passwd + "=" + objU.password);
          console.log(objU);
        }
      } else {
        objReturn.msg =
          "Không có thông tin người dùng " +
          req.body.passwd +
          req.body.username;
        objReturn.info_user = "";
        objReturn.status = 1;
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

    //lưu CSDL

    if (
      req.body.username != null &&
      req.body.email != null &&
      req.body.passwd != null
    ) {
      if (objU != null) {
        objReturn.msg = "Tài Khoản này đã được đăng ký";
        objReturn.status = 3;
        console.log("Tài khoản trùng");
      } else {
        try {
          let objU = new myMD.userModel();
          objU.username = req.body.username;
          objU.phone = req.body.phone;
          objU.password = req.body.passwd;
          objU.email = req.body.email;
          objU.status = 1; // Người dùng đang kích hoạt
          objU.role = 1; /// User
          objU.balance = "0";

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

exports.recharge = async (req, res) => {
  if (req.method == "POST") {
    let idu = req.body._id;
    let objU = await myMD.userModel.findOne({ _id: idu });
    console.log(idu);

    const newBalance = parseFloat(req.body.balance) + parseFloat(objU.balance);

    try {
      await myMD.userModel.updateOne({ _id: idu }, { balance: newBalance });
      let objUpdate = await myMD.userModel.findOne({ _id: idu });
      objReturn.status = 0;
      objReturn.msg = "Deposit successful";

      objReturn.info_user = objUpdate;
    } catch (error) {
      console.log(error);
    }
  }
  res.json(objReturn);
};

exports.pay = async (req, res) => {
  if (req.method == "POST") {
    let idu = req.body._id;
    let objU = await myMD.userModel.findOne({ _id: idu });
    console.log(idu);

    const newBalance = parseFloat(objU.balance) - parseFloat(req.body.balance);

    if (newBalance > 0 ) {
      
    }

    try {
      await myMD.userModel.updateOne({ _id: idu }, { balance: newBalance });
      let objUpdate = await myMD.userModel.findOne({ _id: idu });
      objReturn.status = 0;
      objReturn.msg = "Deposit successful";

      objReturn.info_user = objUpdate;
    } catch (error) {
      console.log(error);
    }
  }
  res.json(objReturn);
};

exports.addToWishlist = async (req, res) => {
  const id = req.body._id;
  const prodctID = req.body.prodctID;
  try {
    const user = await myMD.userModel.findOne({ _id: id });
    const prodctAdded = user.wishlist.find(
      (idp) => idp.toString() === prodctID
    );
    if (prodctAdded) {
      let Upuser = await myMD.userModel.findByIdAndUpdate(
        { _id: id },
        { $pull: { wishlist: prodctID } },
        {new: true }
      );
      res.json(Upuser)
      
    }else{
      let Upuser = await myMD.userModel.findByIdAndUpdate(
        { _id: id },
        { $push: { wishlist: prodctID } },
        {new: true }
      );
      res.json(Upuser)
      console.log(Upuser);
    }
  } catch (error) {console.log(error)}
};

exports.getWishlist = async (req, res) => {
  const idu = req.query._id;
  console.log(idu)
  try {
    const findUser = await myMD.userModel.findById(idu).populate("wishlist")
    
    res.json(findUser.wishlist)
  } catch (error) {
  console.log(error)  
  res.status(500).json({ error: 'Có lỗi xảy ra trong quá trình populate wishlist.' });  
  }
};

exports.addAddress = async (req, res) => {
    if (req.method == "POST") {
      try {
        const {userId, location, tag} = req.body;
        
      let objA =  new myMDA.AddressModel({id_user : userId , tag: tag, location: location})
      await objA.save()

      console.log("Lưu ngon")
      objReturn.info_user = objA

      } catch (error) {
        console.log(error);
        console.log("Lỗi");
      }

    }

res.json(objReturn)
}

exports.getAddress = async (req, res) => {
  const idu = req.query.userId;
  console.log(idu)
  try {
    const findUser = await myMDA.AddressModel.find({id_user: idu});
    console.log(findUser);
    res.json(findUser)
  } catch (error) {
  console.log(error)  
  res.status(500).json({ error: 'Có lỗi xảy ra trong quá trình populate wishlist.' });  
  }
}
