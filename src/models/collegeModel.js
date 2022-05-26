const mongoose=require('mongoose')

const collegeSchema= new mongoose.Schema({

        name : {
            type:String,
            unique:true,
            lowercase:true,
            required:true
        },
        fullName :{
            type:String,
            required:true
        },
        logoLink: {
            type:String,
            required:true,
           //match:[/^(https:\/\/www\.|http:\/www\.|www\.)[a-zA-Z0-9\-_$]+\.[a-zA-Z]{2,5}$/,'Enter correct url!']
           match:[/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/]
        },
        isDeleted : {
            type:Boolean,
            default:false
        }
},{timestamps:true}
)

module.exports=mongoose.model("college" ,collegeSchema)