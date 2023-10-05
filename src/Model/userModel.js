var db = require("./db");
const userSchema= new db.mongoose.Schema(
    {
        username:{type:String, require:true},
        email:{type:String, require:true},
        phone:{type:String, require:true},
        password:{type:String, require:true},
        name:{type:String,require:true},
        avata:{type:String,required:false},
        balance: {type:String, require:true},
        status:{type:String,require: true},///0 là đang khóa, 1 là kích hoạt
        role:{type:String,require: true},//0 là admin, 1 là users

        

    },
    {
        collection:'user'
    }

);

let userModel= db.mongoose.model('userModel', userSchema);

module.exports={userModel};