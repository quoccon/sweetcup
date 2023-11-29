const { default: mongoose } = require("mongoose");
var db = require("./db");
const AddressSchema= new db.mongoose.Schema(
    {
        tag:{type:String, require:true},
        location:{type:String, require:true},
        id_user:{type:String, require:true},
        

        

    },
    {
        collection:'Address',
    }

);

let AddressModel= db.mongoose.model('AddressModel', AddressSchema);

module.exports={AddressModel};