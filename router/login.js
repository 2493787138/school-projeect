const express=require('express')
const loginCtrl=require('../controller/login')

const router=express.Router()


//注册
router.post('/register',loginCtrl.register)

//登录
router.post('/login',loginCtrl.login)

module.exports=router