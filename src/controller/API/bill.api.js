var myMD = require('../../Model/Bill.Model');
var  myMDU = require('../../Model/userModel')
var objReturn = {
    bill:"",
    status:1,
    msg:"okai",
    test: " "
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

    if (req.method == "POST") {
        try {
            
            const {userId, selectedItems, totalCost, paymentMethod, deliveryAddress } = req.body;

            if(!selectedItems || totalCost === undefined || !totalCost || !paymentMethod || !deliveryAddress){
                return res.status(400).json({message :"Dữ liệu không hợp lệ"});
    
            }
            const createdAt = new Date();
            const newBill = new myMD.BillModel({
                userId,
                selectedItems,
                totalCost,
                paymentMethod,
                deliveryAddress,
                createdAt,
            });
    
            await newBill.save();
            objReturn.bill = newBill;

        
           
            
            await myMDU.userModel.findByIdAndUpdate({_id: req.body.userId}, {$push:{bill: newBill._id}});
           


        } catch (error) {
            console.log(error);
            console.log("Lỗi rồi");
        }
    }
    res.json(objReturn);
}