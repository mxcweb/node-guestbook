import mysql from 'mysql'


const pool=mysql.createPool({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'123456',
    database:'meixincheng'
})

export function query(sql,params=[]){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                return reject(err)
            }
            connection.query(sql,params,(err,rows)=>{
                connection.release()
                if(err){
                    return reject(err)
                }
                resolve(rows);
            })
        })
    })
}

