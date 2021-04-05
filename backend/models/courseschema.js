var mongoose=require('mongoose'); 
  
var CourseSchema = new mongoose.Schema({ 
    course:String, 
    university:String, 
    location:String, 
    description:String,
    fee:String, 
    duration:String, 
    degree_type:String, 
    course_type:String 
}); 
  
module.exports = mongoose.model( 'AIT', CourseSchema, 'courses');