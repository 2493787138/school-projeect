const { json } = require("express")
const db=require('../db/db')
var dbconfig = require('../config/dbconfig')//导入自定义模块

//用户登录

//用户注册
exports.register=async(req,res,next)=>{
    try{
        let newuser=req.body
        console.log(newuser)
        db.add(newuser,"users")
        res.send('register')
        
    }catch(err){
        next(err)
    }
}