const express = require('express')
var mysql = require('mysql')//导模块
var dbconfig = require('../config/dbconfig')//导入自定义模块

//服务器连接建表
exports.establish = () => {
    let conn = mysql.createConnection(dbconfig)
    var str = [
        "CREATE TABLE users (username varchar(20) NOT NULL,password varchar(20) NOT NULL,PRIMARY KEY (username))",
        //将建表语句写在这里

    ]
    str.forEach(element => {
        conn.query(element, '', function (err, result) {

            if (err) {
                throw err
            }
        })
        conn.end((err) => {
            if (err) {
                console.log(err)
                return
            }
        })
    });


}

//增加数据
exports.add = (obj, tablename) => {
    //console.log(obj)
    let conn = mysql.createConnection(dbconfig)
    conn.query(`insert into ${tablename} Set ?`, obj, function (err, result) {

        if (err) {
            throw err
        }
    })
    conn.end((err) => {
        if (err) {
            console.log(err)
            return
        }
    })
}

//查询数据
exports.search = (obj, tablename, method,callback) => {
    let conn = mysql.createConnection(dbconfig)
    const keys = Object.keys(obj) //获取键名数组
    const values = Object.values(obj)//获取值数组
    var str = ''
    if (keys.length > 1) {
        for (var i = 0; i < keys.length; i++) {
            if (i != 0 && method === 'and') str += ' and'
            else if (i != 0 && method === 'or') str += ' or'

            if (typeof (values[i] === 'string'))
                str += ` ${keys[i]}='${values[i]}'`
            else
                str += ` ${keys[i]}=${values[i]}`
        }
    }
    conn.query(`select * from ${tablename} where ${str}`, function (err, result) {
        if (err) {
            throw err
        }
        callback(result)
    })
    conn.end((err) => {
        
        if (err) {
            console.log(err)
            return
        }
        
    })

}

//模糊查询
exports.like_search=(column,keyword, tablename,callback)=>{
    conn.query(`select * from ${tablename} where ${column} LIKE '%${keyword}%'`, function (err, result) {
        if (err) {
            throw err
        }
        callback(result)
    })
    conn.end((err) => {
        
        if (err) {
            console.log(err)
            return
        }
        
    })

}

//更新数据
exports.update = (newobj, obj, tablename, method) => {
    let conn = mysql.createConnection(dbconfig)
    const keys = Object.keys(obj) //获取键名数组
    const values = Object.values(obj)//获取值数组
    var str = ''
    if (keys.length > 1) {
        for (var i = 0; i < keys.length; i++) {
            if (i != 0 && method === 'and') str += ' and'
            else if (i != 0 && method === 'or') str += ' or'

            if (typeof (values[i] === 'string'))
                str += ` ${keys[i]}='${values[i]}'`
            else
                str += ` ${keys[i]}=${values[i]}`
        }
    }
    conn.query(`update ${tablename} set? where ${str}`,newobj, function (err, result) {
        if (err) {
            throw err
        }
    })
    conn.end((err) => {
        if (err) {
            console.log(err)
            return
        }
    })

}

//删除数据
exports.delete = (obj, tablename, method) => {
    let conn = mysql.createConnection(dbconfig)
    const keys = Object.keys(obj) //获取键名数组
    const values = Object.values(obj)//获取值数组
    var str = ''
    if (keys.length > 1) {
        for (var i = 0; i < keys.length; i++) {
            if (i != 0 && method === 'and') str += ' and'
            else if (i != 0 && method === 'or') str += ' or'

            if (typeof (values[i] === 'string'))
                str += ` ${keys[i]}='${values[i]}'`
            else
                str += ` ${keys[i]}=${values[i]}`
        }
    }
    conn.query(`delete from ${tablename} where ${str}`, function (err, result) {
        if (err) {
            throw err
        }
        console.log(result,'result')
        return 1
    })
    conn.end((err) => {
        if (err) {
            console.log(err)
            return
        }
    })

}
