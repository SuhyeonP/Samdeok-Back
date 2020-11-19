const {makeExecutableSchema}=require('graphql-tools')
const {resolvers}=require('./resolver')

const typeDefs=`
    type Users{
        _id:ID!
        name:String!
        snsId:String!
        gender:String!
        birth:String!
        age:Int!
    }
    type Shops{
        _id:ID!
        shopName:String
        shopSns:String
        address:String
        part:String
        masterId:ID
    }
    
    type Query{
        allUsers:[Users]
        getUser(_id:ID!):Users
        allStores:[Shops]
        getStore(_id:ID!):Shops
        getStoreMaster(masterId:ID!):Shops
    }
    input shopInput{
        shopName:String!
        shopSns:String
        address:String!
        part:String!
        masterId:ID!
    }
    input userInput{
        name:String!
        snsId:String!
        gender:String!
        birth:String!
        age:Int!
    }
    type Mutation{
        createUser(input:userInput):Users
        updateUser(_id:ID!,input:userInput):Users
        deleteUser(_id:ID!):Users
        createShop(input:shopInput):Shops
        updateShop(_id:ID!,input:shopInput):Shops
        deleteShop(_id:ID!):Shops
    }
`;

const schema=makeExecutableSchema({
    typeDefs,
    resolvers
})
module.exports=schema;