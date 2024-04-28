const sequelize=require('../util/database')
const Sequelize=require('sequelize')

const Product=sequelize.define('product',
 {
     amount:{
        type:Sequelize.INTEGER,
        allowNull:false
     },
     description:{
        type:Sequelize.STRING,
        allowNull:false
     },
     catogary:{
        type:Sequelize.STRING,
        allowNull:false
     }
})
module.exports=Product
