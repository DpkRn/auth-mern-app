const express=require('express')
const app=express();
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()
require('./Models/db')
const AuthRouter=require('./Router/AuthRouter')
const ProductRouter=require('./Router/Product.js')

const PORT=process.env.PORT||8080


//middle wares
app.use(bodyParser.json())
app.use(cors());

app.use('/auth',AuthRouter)
app.use('/products',ProductRouter)

app.get('/',(req,res)=>{
    return res.send("working")
})
app.listen(PORT,()=>{
    console.log("connect to the port:",PORT)
})