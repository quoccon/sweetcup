var db = require('./db');

const productSchema = new db.mongoose.Schema(
    {
        nameproduct :{type:String, require:true},
        image:{type:String,require:false},
        price:{type:Number, require:true},
        description:{type:String, require:true},
        id_cat:{type:db.mongoose.Schema.Types.ObjectId, ref:'catModel'}

    },{
        //kết nối đến bảng product
        collection:"product"
    }
);

// Thể loại
const catSchema = new db.mongoose.Schema({
    nameCat:{type:String, require:true}
},
{
    //kết nối đến bảng thể loại
    collection:"catProduct"
});

let productModel = db.mongoose.model("productModel", productSchema);
let catModel = db.mongoose.model('catProduct',catSchema);

module.exports = { productModel, catModel }