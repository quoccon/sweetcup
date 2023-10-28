var myMD = require('../../Model/Bill.Model');
var objReturn = {
    bill:"",
    status:1,
    msg:"okai",
}


exports.getBill = async (req,res,next) => {
    try {
        var listBill = await myMD.BillModel.find()
        if(listBill.length > 0) {
            objReturn.bill = listBill;
        }else {
            objReturn.status = 0;
            objReturn.msg = "Không có dữ liệu"
        }
    } catch (error) {
        console.log(error);
        console.log("Lỗi rồi");
    }

    res.json(objReturn)
}


exports.addBill = async (req,res,next) => {
    try {
        const { selectedItems, totalCost, paymentMethod, deliveryAddress } = req.body;
        if(!selectedItems || totalCost === undefined || !totalCost || !paymentMethod || !deliveryAddress){
            return res.status(400).json({message :"Dữ liệu không hợp lệ"});

        }

        const newBill = new myMD.BillModel({
            selectedItems,
            totalCost,
            paymentMethod,
            deliveryAddress,
        });

        await newBill.save();
    } catch (error) {
        console.log(error);
        console.log("Lỗi rồi");
    }
}