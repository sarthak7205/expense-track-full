const express=require('express')
const sequelize = require('./util/database');
const product = require('./model/product');
const  admin =require('./router/admin')
const app = express()


app.use('/',admin)
sequelize.sync().then(() => {
    console.log('Database synced');
  }).catch(err => {
    console.error('Database sync failed:', err);
  });
  
  app.use("/",(req,res)=>{

    res.send("hello Nigga")
    
    
    })


app.listen(3000);