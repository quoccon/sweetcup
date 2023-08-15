import bcrypt, { hash } from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

const salt = bcrypt.genSaltSync(10);


const hashUserPassword = (userpassword) => {
    let hashPassword = bcrypt.hashSync(userpassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    const connection = await mysql.createConnection({ host: "localhost", user: "root", database: "server_duan", Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('INSERT INTO users(email,password,username) VALUES(?,?,?)',[email, hashPass, username]);
    } catch (error) {
        console.log(">>check :",error);
    }

}


const getUserList = async () => {
    const connection = await mysql.createConnection({ host: "localhost", user: "root", database: "server_duan", Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('SELECT * from users');
        return rows;
    } catch (error) {
        console.log(">>check rows", error);
    }


}

const deleUser = async (id) => {
    // DELETE FROM users WHERE id ='Alfreds Futterkiste';
    const connection = await mysql.createConnection({ host: "localhost", user: "root", database: "server_duan", Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id =?',[id]);
        return rows;
    } catch (error) {
        console.log(">>check rows", error);
    }
}
module.exports = {
    createNewUser,
    getUserList,
    deleUser
}