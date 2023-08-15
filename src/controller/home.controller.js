import userService from "../service/userService";



const handelHelloWorld = (req, res) =>{
    return res.render("home.ejs");
}

const handelUserPage =  async (req,res) => {
    //model => get data from database
    let userList =  await userService.getUserList();
    await userService.deleUser();

    return res.render("user.ejs",{userList});
}

const handelCreateUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.createNewUser(email,password,username);
    
    return res.redirect("/user");

}

const handelDeleleUser = async (req,res) => {
   
    await userService.deleUser(req.params.id);
    return res.redirect("/user");

}



module.exports = {
    handelHelloWorld,
    handelUserPage,
    handelCreateUser,
    handelDeleleUser
}