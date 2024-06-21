const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();
const jwt =require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const salt = bcrypt.genSaltSync(10);
const secret = 'sfjgjjlk';

app.use(cors({credentials:true,origin:'*'}));
app.use(express.json());
app.use(cookieParser());
async function start(){
try {
    await mongoose.connect('mongodb://0.0.0.0:27017/blog-db')
} catch (error) {
    console.log(error.message);
}
}
start();
app.post('/register',async(req,res)=>{
    const{username,password} = req.body;
    try{

        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password,salt),});
        res.json(userDoc);
    } catch(e){
        console.log(e);
     res.status(400).json(e);
    }
    

});


app.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password,userDoc.password);
    if(passOk){
        //logged in
        jwt.sign({username,id:userDoc._id},secret,{},(err,token)=>{
         if(err) throw err;
         res.cookie('token',token).json('ok');
        });
    }else{
        res.status(400).json('wrong credentials');
    }
    res.json(passOk);
});
app.get('/profile',(req,res)=>{
    const{token}=req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
     if(err) throw err;
     res.json(info);
    });
  res.json(req.cookies);  
})
app.listen(4000); //localhost:4000/test
// sahushruti510
// 1mpf5SibqU0UK9Xv
// mongodb+srv://sahushruti510:<1mpf5SibqU0UK9Xv>@first.e5c8gvd.mongodb.net/