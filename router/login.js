const express=require('express')
const loginCtrl=require('../controller/login')

const router=express.Router()


//用户注册
router.post('/register',loginCtrl.register)

module.exports=router