var mongoose=require('mongoose'); 
  
var UserSchema = new mongoose.Schema({ 
    name:String, 
    username:{type:String, required:true,unique:true},
    age:Number, 
    password:{type:String,required:true}, 
    address: String,
    imagepath:String
}); 
const uniqueValidator = require('mongoose-unique-validator');  
UserSchema.plugin(uniqueValidator); 
  
module.exports = mongoose.model( 
    'user', UserSchema, 'Users');