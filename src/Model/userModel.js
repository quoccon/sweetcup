var db = require("./db");
const userSchema= new db.mongoose.Schema(
    {
        username:{type:String, require:true},
        email:{type:String, require:true},
        phone:{type:String, require:true},
        password:{type:String, require:true},
        name:{type:String,require:true},
        avata:{type:String,required:false},
        status:{type:String,require: true},
        role:{type:String,require: true},

        

    },
    {
        collection:'user'
    }

);

let userModel= db.mongoose.model('userModel', userSchema);

module.exports={userModel};