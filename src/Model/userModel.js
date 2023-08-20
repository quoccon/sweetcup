var db = require("./db");
const userSchema= new db.mongoose.Schema(
    {
        username:{type:String, require:true},
        email:{type:String, require:true},
        password:{type:String, require:true},
        avata:{type:String,required:false}
        

    },
    {
        collection:'user'
    }

);

let userModel= db.mongoose.model('userModel', userSchema);

module.exports={userModel};