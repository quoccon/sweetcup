const myMD = require('../Model/userModel')

exports.login = async (req,res,next) => {
    let msg = " ";
    if(req.method == "POST"){
        try {
            let objU = await myMD.userModel.findOne({username: req.body.username})
            console.log(objU);
        } catch (error) {
            
        }
    }
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
            objU.passwd = req.body.passwd;
            objU.email = req.body.email;

            await objU.save();
            msg = 'Đăng ký thành công';

        } catch (error) {
            msg = "Lỗi: " + error.message;
        }

    }


    res.render('auth/reg', {msg:msg})
}