var db = require('./db');

const CartSchema = new db.mongoose.Schema(
    {
        nameproduct:{type:String, require:true},
        image:{type:String,require:false},
        price:{type:Number,require:true},
        quantity:{type:Number,require:true}
    },{
        collection:"Cart"
    }
)

let CartModel = db.mongoose.model("CartModel",CartSchema);
module.exports = {CartModel}