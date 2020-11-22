const Users=require('../schemas/user')
const Shops=require('../schemas/shop')
const Reviews=require('../schemas/review')
const Reservations=require('../schemas/reservation')
const {PubSub}=require('graphql-subscriptions')
const pubsub = new PubSub();
const NEW_RESERVATION='NEW_RESERVATION';

const resolvers={
    Query:{
        allReservation:()=>{
            return Reservations.find();
        }
    },
    Mutation:{
        checkInShop(root,args,context){
            Reservations.create(args)
            pubsub.publish(NEW_RESERVATION,{newReservation:args});
            return Reservations
        }
    },
    Subscription:{
        newReservation:{
            subscribe:()=>pubsub.asyncIterator([NEW_RESERVATION]),
        }
    }
}

module.exports = {resolvers}