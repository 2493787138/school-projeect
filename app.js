const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
const cors=require('cors')
const router=require('./router')
const errorHandler=require('./middleware/error-handler')
const db=require('./db/db')

const app = express()
const PORT=3000 //端口号

//日志
app.use(morgan('dev'))

//配置解析表单请求体
app.use(express.json())//json
app.use(express.urlencoded())//x-www-form

//跨域资源处理
app.use(cors())

//挂载路由
app.use('/api',router)

//测试用
// app.post('/api/user/add',(req,res,next)=>{
//     console.log(req.body)
//     res.send("ok")
// })

//在所有路由之后处理404
app.use((req,res,next)=>{
    res.status(404).send('404 找不到该路径')
})

//在所有中间件后配置错误处理中间件
app.use(errorHandler())

app.listen(PORT, () => {
    //db.establish()
    console.log('server running')
})