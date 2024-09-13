const { signup, login } = require('../Controllers/AuthController');
const { signUpValidate, logInValidate } = require('../Middlewares/ValidateSchema');

const router=require('express').Router();

router.get('/login',(req,res)=>{
res.send('router running...')
})

router.post('/signup',signUpValidate,signup)
router.post('/login',logInValidate,login)

module.exports=router