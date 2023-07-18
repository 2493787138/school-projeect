const { json } = require("express")
const db = require('../db/db')
var dbconfig = require('../config/dbconfig')//导入自定义模块
const { search } = require("../router")

//用户登录
exports.login = async (req, res, next) => {
    try {
        let user=req.body
        db.search(user,"users","and",callback)
        function callback(result) {
            console.log(result,'callback');
            if(result)
            res.send(result)
            else
            res.send(-1)
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
        db.add(newuser, "users")
        res.send('register')

    } catch (err) {
        next(err)
    }
}



