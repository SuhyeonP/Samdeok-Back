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
    
    
    type Query{
        allUsers:[Users]
        getUser(_id:ID!):Users
        loginUser(snsId:String!,name:String!):Users
        allStores:[Shops]
        getStore(storeId:ID!):Shops
        getStoreMaster(masterId:ID!):Shops
        allReviews:[Reviews]
        getStoreReviews(inShop:ID):Reviews
        getUserReviews(writtenBy:ID):Reviews
        allReservation:[Reservations]
        getUserReservation(checkUser:ID):Reservations
        getShopReservation(checkShop:ID):Reservations
        
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
    
    type Mutation{
        createUser(input:userInput):Users
        updateUser(_id:ID!,input:userInput):Users
        deleteUser(_id:ID!):Users
        createShop(input:shopInput):Shops
        updateShop(_id:ID!,input:shopInput):Shops
        deleteShop(_id:ID!):Shops
        createReview(input:userReview):Reviews
        updateReview(_id:ID!,input:userReview):Reviews
        deleteReview(_id:ID!):Reviews
        createReservation(input:checkReservation):Reservations
        updateReservation(_id:ID!,input:checkReservation):Reservations
        deleteReservation(_id:ID!):Reservations
    }
`;

const schema=makeExecutableSchema({
    typeDefs,
    resolvers
})
module.exports=schema;