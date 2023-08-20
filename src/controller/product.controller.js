// const { method } = require('bluebird');
const myMD = require('../Model/productModel');


exports.getListProduct = async (req, res, next) => {
    var listSp = await myMD.productModel.find();

    console.log(listSp);
    res.render('../views/products/product.ejs',{listSp:listSp});
}

var fs = require('fs');
exports.add= async(req, res, next)=>{
    let msg='';
    console.log(req.file, req.body);
    // let listCat = await myMD.catModel.find();
    if(req.method=='POST'){

        // fs.rename(req.file.path,
        //     './public/templates/'+ req.file.originalname,
        //     (err)=>{
        //        if(err)
        //            console.log(err);
        //        else{
        //            // không có lỗi, tạo url, bỏ chữ public/
        //        console.log("Url: http://localhost:3000/templates/" +req.file.originalname );
        //        }
        //     }) 

            let objSP= new myMD.productModel();
            objSP.nameproduct= req.body.name;
            objSP.price= req.body.price;
            // objSP.description= req.body.description;
            // objSP.image= "http://localhost:3000/templates/"+req.file.originalname ;
            // objSP.id_cat= req.body.category;
            
            try {
                let new_sp= await objSP.save();
                console.log(new_sp);
                msg="Đã thêm thành công";
                
            } catch (error) {
                msg="Lỗi :"+error.message;
                console.log(error);
            }
        }

    

    res.render('products/product', {msg:msg});
};


exports.deleteProduct = async (req, res, next) => {
    var idPro = req.params.idPro;
    console.log(idPro);


    try {
        await myMD.productModel.findOne({_id:idPro})
        res.redirect('/product')
    } catch (error) {
        console.log(error);
    }
}
