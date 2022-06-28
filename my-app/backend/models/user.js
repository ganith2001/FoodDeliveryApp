const mongoose= require('mongoose');

var Users=mongoose.model('users',{
    name:{type:String,require: true},
    email:{type:String,require: true,unique: true},
    password:{type:String,require: true},
    phone:{type:String},
    address:{type:String},
    menu:[{item:{type:String},quantity:{type:Number}}]

});

module.exports=Users;
