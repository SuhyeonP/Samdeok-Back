const mongoose=require('mongoose')

const {Schema}=mongoose;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    snsId:{
        type:String
    },
    age:{
        type:Number,
        required: true
    },
    gender:{
        type:String,
        required:true
    },
    birth:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Users', UserSchema);