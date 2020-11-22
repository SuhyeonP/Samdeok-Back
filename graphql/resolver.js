const Users=require('../schemas/user')
const Shops=require('../schemas/shop')
const Reviews=require('../schemas/review')
const Reservations=require('../schemas/reservation')
const {PubSub}=require('graphql-subscriptions')
const pubsub = new PubSub();

const resolvers={
    Query:{
        allReservation:()=>{
            return Reservations.find();
        }
    },
    Mutation:{
        checkInShop:(_,{checkShop,checkUser,time})=>{
            Reservations.create({checkShop,checkUser,time});
            return "Success"
        }
    },
    // Subscription:{
    //
    // }
}

module.exports = {resolvers}