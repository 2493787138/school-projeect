const { json } = require("express")
const db = require('../db/db')
var dbconfig = require('../config/dbconfig')//导入自定义模块
const { search } = require("../router")

//用户登录
exports.login = async (req, res, next) => {
    try {
        let user = req.body
        console.log(user)
        db.search(user, "users", "and", callback)
        function callback(result) {
            //查到了有这个用户
            if (result.length!=0)
            {
                //console.log(result);
                res.send(result)
            }
            else{
            res.send({
                    message:"用户名或密码错误"
                })
            }    
        }

    } catch (err) {
        next(err)
    }
}

//用户注册
exports.register = async (req, res, next) => {
    try {
        let newuser = req.body
        console.log(newuser)

        db.add(newuser, 'users', function(message, result) {
            console.log(message)
            if (result) {
                res.send({ success: true })
            } else {
                res.send({ success: false })
            }
        })
    } catch (err) {
        next(err);
    }
};

