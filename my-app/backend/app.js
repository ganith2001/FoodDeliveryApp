const mongoose = require('mongoose');
const express = require('express');
const app = express();
const menus=require('./models/menu');
const User=require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

mongoose.connect('mongodb+srv://Ganith:ganith2001@cluster0.wz8tp.mongodb.net/myMongoDb',(err)=>{
    if(!err){
        console.log("Succesfull");
    }
    else{
        console.log("Failed");
    }
})


const bodyParser = require('body-parser');
const { RSA_NO_PADDING } = require('constants');
const { ConsoleReporter } = require('jasmine');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();

});


app.get("/api/posts",(req,res,next)=>{
    menus.find( ).then(documents => { 
        res.send(documents);
    })
}); 

app.get("/api/posts/nonveg",(req,res,next)=>{   
    menus.find( { nonveg: "yes" } ).then(documents => {
        res.send(documents);    
    })
}); 

app.get("/api/posts/veg",(req,res,next)=>{  
    menus.find( { nonveg: "no" } ).then(documents => {
       res.send(documents);     
    })
}); 
 
app.post("/signup",(req,res,next)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash =>{ 
        const user = new User({ 
            name:req.body.name,
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(result =>{
                res.status(201).json({
                message: 'User created',
                result: result
            });

        })
        .catch(err =>{
            res.status(500).json({
                error:err
            });
        });
    })

}); 

app.post('/login',(req,res,next) => {
    let fetcheduser;
    User.findOne({email:req.body.email}).then(user =>
    {
        fetcheduser=user;
        return bcrypt.compare(req.body.password,user.password);
        })
        .then(result => {
       
        if(result){
        const token = jwt.sign(
            {email:fetcheduser.email,userId:fetcheduser._id},
            "secret_this_should_be_longer",
            {expiresIn:"1h"}
            );
       
            res.status(200).json({
                token:token,
                expiresIn: 3600
    
            })
        }
        })
        .catch(err => {
            
            return res.status(401).json({
            message:"Auth failed"
        });
        });
    });

app.post('/token',(req,res,next)=>{        
    const user=jwt.verify(req.body.token,"secret_this_should_be_longer");
    User.findOne({email:user.email}).then(user =>
    {
        res.send(user);
    })
})

app.post('/addcart',(req,res,next)=>{
    const filter={_id:req.body.name}
    const update={item:req.body.item,quantity:1}
    User.findOneAndUpdate(filter,{$push:{menu:update}}).then(result=>
    {
        res.send(result);
    })
})

app.post('/findItem',(req,res,next)=>{
    const user=jwt.verify(req.body.token,"secret_this_should_be_longer"); 
    User.find({email:user.email},{menu:1,_id:0}).then(result=>
    {
            res.send(result);
    })
})

app.post('/findDetails',(req,res,next)=>{    
    menus.find({_id:req.body.id}).then(result=>
    {
        res.send(result);
    })
})

app.post('/update',(req,res,next)=>{      
    User.updateOne({_id:req.body.userid,'menu.item':req.body.menuid},{$set:{
       'menu.$.quantity':req.body.quan}})
    .then(result=>{
            res.send(result);
     })
})

app.post('/removeItem',(req,res,next)=>{       
    User.updateOne({_id:req.body.userid },{ $pull: { menu: { item:req.body.menuid } } })
    .then(result=>{       
        res.send(result);
    })
})
 
app.post('/profile',(req,res,next)=>{
    const user=jwt.verify(req.body.token,"secret_this_should_be_longer"); 
    User.findOne({email:user.email})
    .then(user =>   
    {
        res.send(user);
    })
})

    
app.post('/phone',(req,res,next)=>{      
    User.updateOne({_id:req.body.id },{phone:req.body.phone}).then(result=>{        
        res.send(result);    
    })
})

app.post('/ad',(req,res,next)=>{      
    User.updateOne({_id:req.body.id },{address:req.body.add}).then(result=>{
        res.send(result);   
    })
})

app.post('/passw',(req,res,next)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash =>{ 
        User.updateOne({_id:req.body.id },{password:hash})
        .then(result=>{    
            res.send(result);
        })
    })
})


app.listen(3000);

module.exports = app;
