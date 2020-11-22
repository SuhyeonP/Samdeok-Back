const {makeExecutableSchema}=require('graphql-tools')
const {resolvers}=require('./resolver')
const {PubSub}=require('graphql-subscriptions')
const pubsub = new PubSub();

const typeDefs=`
    type Users{
        _id:ID!
        name:String!
        snsId:String!
        birth:String!
        age:Int!
    }
    type Shops{
        _id:ID!
        shopName:String!
        shopSns:String
        address:String
        part:String
        masterId:ID!
        openTime:Int
        closeTime:Int
    }
    type Reviews{
        _id:ID!
        title:String
        content:String
        rating:Int
        inShop:ID
        writtenBy:ID
    }
    type Reservations{
        _id:ID!
        time:String
        checkShop:ID
        checkUser:ID
    }
   
    type Query{
       allReservation:[Reservations]
    }
    type Mutation{
       checkInShop(checkShop:ID!,checkUser:ID!,time:String!):Reservations
    }
    type Subscription{
        newReservation:Reservations
    }
`;

const schema=makeExecutableSchema({
    typeDefs,
    resolvers,
    //context:{pubsub}
})
module.exports=schema;