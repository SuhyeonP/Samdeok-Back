const mongoose=require('mongoose')

const {Schema}=mongoose;
const {Types:{ObjectId}}=Schema;
const ReservationSchema=new Schema({
    time:{
      type:Date,
      required:true
    },
    checkShop:{
        type:ObjectId,
        required:true,
        ref:'Shops'
    },
    checkUser:{
        type:ObjectId,
        required:true,
        ref:'Users'
    }
})

module.exports = mongoose.model('Reservations', ReservationSchema);