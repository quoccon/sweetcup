var db = require('./db');

const productSchema = new db.mongoose.Schema(
    {
        nameproduct :{type:String, required:true},
        image:{type:String,required:false},
        price:{type:Number, required:true},
        description:{type:String, required:true},

    },{
        collection:"product"
    }
);

let productModel = db.mongoose.model("productModel", productSchema);

module.exports = { productModel }