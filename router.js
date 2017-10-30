import express from 'express'
import * as db from './db'


const router =express.Router();

router
    .get('/',(req,res)=>{
        res.render('index')
    })
    .get('/comments',(req,res)=>{
        db.query('SELECT * FROM record ORDER BY id DESC')
        .then((rows)=>{
            res.json({
                code:2000,
                list:rows,
                msg:"success"
            })
        })
        .catch((err)=>{
            res.json({
                code:2001,
                msg:err.message
            })
        })
    })
    .post('/',(req,res)=>{
        let name=req.body.username;
        let phone=req.body.phone;
        let comment=req.body.comment;
        db.query('INSERT INTO `record`(`name`,`phone`,`comment`) VALUES (?,?,?);',[name,phone,comment])
        .then((rows)=>{
            console.log(rows);
            if(rows.affectedRows===1){
                res.json({
                    code:1000,
                    msg:'success'
                    //这个时候成功的话就会跳转到另一个页面，返回这个json对象，但我们的要求是他页面自己刷新一下，不跳转，所以这个时候在前台
                    //就得使用AJAX了
                })
            }
            res.json({
                code:1001,
                msg:'failed'
            })
        .catch((err)=>{
            res.json({
                code:1002,
                msg:err.msg
            })
        })    

        })
    })


export default router;