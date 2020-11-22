const schema =require("./graphql/schema");
const express=require('express');
const morgan = require('morgan');
const cors=require('cors')
const mongoose=require('mongoose')
const app=express();
const dotenv=require('dotenv')
const path=require('path')
const graphqlHTTP=require('express-graphql').graphqlHTTP;
const bodyParser=require('body-parser')
const {createServer}=require('http')
const {SubscriptionServer}=require('subscriptions-transport-ws')
const {PubSub}=require('graphql-subscriptions')
const {ApolloServer}=require('apollo-server-express')
const {execute,subscribe} =require('graphql')

dotenv.config()

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use('/graphql', bodyParser.json());
app.use(express.urlencoded({extended:false}))
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


const apolloServer=new ApolloServer({schema:schema})
apolloServer.applyMiddleware({app})

const pubsub=new PubSub();
const server=createServer(app);

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

app.get('/',(req,res,next)=>{
    res.send('hi this is graphql BackServer')
})

// app.use('/graphql',graphqlHTTP({
//     schema:schema,
//     graphiql:true
// }))
//
// app.listen(3050,()=>{
//     console.log('service start')
// })

server.listen(3050,()=>{
    new SubscriptionServer({
        execute,
        subscribe,
        schema:schema,
    },{
        server:server,
        path:'/subscriptions'
    })
})

