const express = require('express');
const bp=require('body-parser')
const router = express.Router();
const product=require("../model/product.js")

router.use(bp.json());
router.get('/products', async(req, res) => {

    const pro = await product.findAll();

    
    res.json(pro);
  
});


router.post('/products', (req, res) => {

    product.create({
        amount: req.body.amount,
        description:req.body.description,
        catogary:req.body.catogary
    }).then
 console.log(req.body)
  res.json({  'data':req.body,'mes':"message is here" });
});


router.put('/products/:id', async(req, res) => {
    const { id } = req.params; 
    const { amount, description,catogary } = req.body; 
     
    try {
      
      const pro = await product.findByPk(id);
  
      if (!pro) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      
      await pro.update({ amount, description,catogary });
  
    
      res.json({ message: 'User updated successfully', data: pro});
    } catch (error) {
    
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.delete('/products/:id', async (req, res) => {
  
    const id  = req.params.id; 


    try {
    
      const pro = await product.findByPk(id);
  
      if (!pro) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      await pro.destroy();
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
