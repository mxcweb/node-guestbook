import  express from 'express'
import path from 'path'
import bodyParser from 'body-parser'


import router from './router.js'


const app=express();

//设置静态资源
app.use('/node_modules',express.static(path.join(__dirname,'node_modules')));

//设置表单提交处理方式
app.use(bodyParser.urlencoded({extended:false}))

//设置模板引擎
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')


//挂载路由
app.use(router);


app.listen(7000,(err)=>{
    if(err) {
        throw err
    }
    console.log('server is on port 3000')
})







