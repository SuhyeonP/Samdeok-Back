const {makeExecutableSchema}=require('graphql-tools')
const {resolvers}=require('./resolver')

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
    
    input shopInput{
        shopName:String!
        shopSns:String
        address:String!
        part:String!
        masterId:ID!
        openTime:Int!
        closeTime:Int!
    }
    input userInput{
        name:String!
        snsId:String!
        birth:String!
        age:Int!
    }
    input userReview{
        title:String!
        content:String!
        rating:Int
        inShop:ID!
        writtenBy:ID!
    }
    input checkReservation{
        time:String!
        checkShop:ID!
        checkUser:ID!
    }
    type Query{
       allReservation:[Reservations]
    }
    type Mutation{
       checkInShop(checkShop:ID!,checkUser:ID!,time:String!):String!
    }
`;

const schema=makeExecutableSchema({
    typeDefs,
    resolvers
})
module.exports=schema;