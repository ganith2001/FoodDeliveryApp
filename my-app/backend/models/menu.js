const mongoose=require('mongoose');

var Menus=mongoose.model('Menus',{
    name: {type:String},
    image:{type:String},
    description:{type:String},
    price:{type:Number},
    rating:{type:Number},
    hotel:{type:String},
    nonveg: {type:String}
});

module.exports=Menus;