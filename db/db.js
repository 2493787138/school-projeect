const express = require('express')
var mysql = require('mysql')//导模块
var dbconfig = require('../config/dbconfig')//导入自定义模块

//服务器连接建表
exports.establish = () => {
    let conn = mysql.createConnection(dbconfig);
    var str = [
        "CREATE TABLE users (username varchar(20) NOT NULL, password varchar(20) NOT NULL, role int, birthdate date, gender int, PRIMARY KEY (username))",
        // 将建表语句写在这里
        "INSERT INTO users (username, password, role, birthdate, gender) VALUES ('admin', 'admin', 0, '2023-08-20', 0)",
        "INSERT INTO users (username, password, role, birthdate, gender) VALUES ('user', 'user', 1, '2023-08-20', 1)"
    ];

    function executeQuery(index) {
        if (index >= str.length) {
            conn.end(err => {
                if (err) {
                    console.log(err);
                }
            });
            return;
        }

        conn.query(str[index], '', function (err, result) {
            if (err) {
                throw err;
            }
            executeQuery(index + 1); // 递归调用下一个查询
        });
    }

    executeQuery(0); // 开始执行查询操作

};

//增加数据
exports.add = (obj, tablename, callback) => {
    obj.role = "1"; // 将 role 属性设置为 "1"
    let conn = mysql.createConnection(dbconfig)
    conn.query(`insert into ${tablename} Set ?`, obj, function (err, result) {
        if (err) {
            throw err
        }
        // 如果没有错误，则调用回调函数返回布尔值
        callback(`成功添加用户 ${obj.username}`, result && result.affectedRows > 0)
    })
    conn.end((err) => {
        if (err) {
            console.log(err)
            return
        }
    })
}
//查询特定用户
exports.find = (username, tableName, callback) => {
    let conn = mysql.createConnection(dbconfig);
    const keys = Object.keys(username); //获取键名数组
    const values = Object.values(username); //获取值数组
    var str = '';

    if (keys.length > 0) {
        for (var i = 0; i < keys.length; i++) {
            if (typeof values[i] === 'string') {
                if (i !== 0) str += ' AND';
                str += ` ${keys[i]}='${values[i]}'`;
            } else {
                if (i !== 0) str += ' AND';
                str += ` ${keys[i]}=${values[i]}`;
            }
        }
    }

    // 执行查询
    const query = `SELECT * FROM ${tableName} WHERE ${str}`;
    conn.query(query, function(err, rows) {
        if (err) {
            console.error('Error executing query:', err);
            callback('Error executing query', null);
            return;
        }

        conn.end(); // 关闭数据库连接
        callback('Query executed successfully', rows);
    });
};

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
