const schema =require("./graphql/schema");
const express=require('express');
const morgan = require('morgan');
const cors=require('cors')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const path=require('path')
const http=require('http')
const bodyParser=require('body-parser')
const {createServer}=require('http')
const {SubscriptionServer}=require('subscriptions-transport-ws')
const {PubSub}=require('graphql-subscriptions')
const {ApolloServer}=require('apollo-server-express')
const {execute,subscribe} =require('graphql')

dotenv.config()
const PORT=3050
const app=express();
app.use(morgan('dev'));
const MPW=process.env.DB_PASSWORD
const dbAddress = `mongodb+srv://graphqlfirst:${MPW}@cluster0.kc7jm.mongodb.net/Reservation?retryWrites=true&w=majority`;
mongoose
    .connect(dbAddress, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("mongodb 연결성공"))
    .catch((err) => console.log(err));
if(process.env.NODE_ENV==='production'){
    app.use(cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    }))
    mongoose.set('debug',true);
}else{
    app.use(cors({
        origin: true,
        credentials: true,
    }))
}

const server=new ApolloServer({
    schema
})
server.applyMiddleware({app})

const httpServer=http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT,()=>{
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})

// app.get('/',(req,res,next)=>{
//     res.send('hi this is graphql BackServer')
// })

// app.use('/graphql',graphqlHTTP({
//     schema:schema,
//     graphiql:true
// }))
//
// app.listen(3050,()=>{
//     console.log('service start')
// })

// server.listen(3050,()=>{
//     new SubscriptionServer({
//         execute,
//         subscribe,
//         schema:schema,
//     },{
//         server:server,
//         path:'/subscriptions'
//     })
// })

