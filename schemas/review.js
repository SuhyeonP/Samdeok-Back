const mongoose=require('mongoose')

const {Schema}=mongoose;
const {Types:{ObjectId}}=Schema;
const ReviewsSchema=new Schema({
    title:{
        type:String
    },
    content:{
        type:String,
        required: true
    },
    rating:{
        type:Number,
        required:true
    },
    inShop:{
        type:ObjectId,
        required:true,
        ref:'Shops'
    },
    writtenBy:{
        type:ObjectId,
        required:true,
        ref:'Users'
    }
})

module.exports = mongoose.model('Reviews', ReviewsSchema);