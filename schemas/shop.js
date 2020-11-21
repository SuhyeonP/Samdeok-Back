const mongoose=require('mongoose')

const {Schema}=mongoose;
const {Types:{ObjectId}}=Schema;
const ShopSchema=new Schema({
    shopName:{
        type:String,
        required:true
    },
    shopSns:{
        type:String
    },
    address:{
        type:String,
        required: true
    },
    part:{
        type:String,
        required:true
    },
    masterId:{
        type:ObjectId,
        required:true,
        ref:'Users'
    },
    openTime:{
        type:Number,
        required:true
    },
    closeTime:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('Shops', ShopSchema);