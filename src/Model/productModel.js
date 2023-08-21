var db = require('./db');

const productSchema = new db.mongoose.Schema(
    {
        nameproduct :{type:String, require:true},
        image:{type:String,require:false},
        price:{type:Number, require:true},
        description:{type:String, require:true},

    },{
        collection:"product"
    }
);

let productModel = db.mongoose.model("productModel", productSchema);

module.exports = { productModel }