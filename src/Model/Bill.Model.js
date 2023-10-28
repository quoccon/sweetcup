var db = require('./db');

const billSchema = new db.mongoose.Schema(
    {
        selectedItems:{type:String, require:true},
        totalCost:{type:Number, require:true},
        paymentMethod:{type:String, require:true},
        deliveryAddress:{type:String, require:true},
        userId:{type:String, require:true}
    },{
        collection:"Bill"
    }
);

let BillModel = db.mongoose.model("BillModel",billSchema);

module.exports = {BillModel}