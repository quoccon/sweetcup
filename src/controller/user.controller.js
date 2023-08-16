const myMD = require('../Model/userModel')

exports.login = async (req,res,next) => {
    let msg = " ";
    if(req.method == "POST"){
        try {
            let objU = await myMD.userModel.findOne({username: req.body.username})
            console.log(objU);
            if (objU != null) {
                if (objU.password==req.body.passwd) {
                    req.session.userLogin = objU;
                    console.log("Đăng Nhập vào tk:" + req.session.userLogin.username);
                    return res.redirect('/home')
                }
                else {
                    msg = "Sai Mật Khẩu"
                    console.log("Đăng Nhập Lỗi" + req.body.passwd + "=" + objU.password)
                }
            }
            else { msg = "Không có thông tin người dùng "}
        } catch (error) {
            msg ='Lỗi : '+error.message;
            console.log(error);
        }
    }

    res.render('auth/login', {msg:msg});
}

exports.reg = async (req,res,next) => {
    let msg = " ";
    if(req.method=='POST'){
        console.log(req.body);
        //kiểm tra hợp lệ
        if(req.body.passwd != req.body.passwd2){
            msg = 'Xác nhận password không đúng';
            return res.render('auth/reg', {msg:msg});
        }
        // nếu có kiểm tra khác thì viết ở đây...

        //lưu CSDL
        try {
            let objU = new myMD.userModel();
            objU.username = req.body.username;
            objU.password = req.body.passwd;
            objU.email = req.body.email;

            await objU.save();
            msg = 'Đăng ký thành công';
            console.log(objU)

        } catch (error) {
            msg = "Lỗi: " + error.message;
        }

    }


    res.render('auth/reg', {msg:msg})
}
exports.getAllUsers = async (req,res,next) => {
    var listU = await myMD.userModel.find();
    res.render('../views/screens/users/list_user.ejs', {listU:listU})
}