var myMD = require('../../Model/userModel');
var objReturn = {

    status : 1,
    msg : 'oke'

}

exports.api_listU = async (req,res,next) => {
    let listU =[]
    try {
        listU = await myMD.userModel.find()
        if (listU.length > 0) {
            objReturn.data = listU;
        }
        else {
            objReturn.status = 0;
            objReturn.msg ="Không có dữ liệu"
        }
    } catch (error) {
        console.log(error);
    }

    res.json(objReturn)
}

exports.api_Reg = async (req,res,next) =>{
    if (req.method == "POST") {
        console.log(req.body);
        //kiểm tra hợp lệ
        if (req.body.passwd != req.body.passwd2) {
          console.log("Xác nhận password không đúng");
          
        }
        
    
        //lưu CSDL
          
          if (req.body.username != null && req.body.email!= null && req.body.passwd!= null ) {
            try {
                let objU = new myMD.userModel();
                objU.username = req.body.username;
                objU.password = req.body.passwd;
                objU.email = req.body.email;
          
          
                await objU.save();
                console.log("Oke");
                console.log(objU);
                
              } catch (error) {
                  console.log(error);
              }
        }
       
      }

      res.json(objReturn)

}

exports.api_edit = async (req,res,next) =>{
    var idu = req.params.idu;
    var msg = " "
    console.log(idu);
    if (req.method == 'POST') {
        if (req.body.username != null && req.body.email!= null && req.body.passwd!= null ){
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
      var objU = new myMD.userModel();
      objU.username = req.body.username;
      objU.email = req.body.email;
      objU.password = req.body.pwwd1;
      objU.avata = "http://localhost:8080/templates/" + req.file.originalname;
      objU._id= idu;
  
      try {
        await myMD.userModel.updateOne({_id: idu},objU)
        console.log('Update thành công')
        
      } catch (error) {
        console.log(error)
      }
  
    }
        else{objReturn.status = 0 
            objReturn.msg = "Chưa đủ thông tin"}
}
    res.json(objReturn)
}
