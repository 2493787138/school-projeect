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
    console.log(obj)
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