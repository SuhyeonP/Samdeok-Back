const express=require('express');
const morgan = require('morgan');
const cors=require('cors')
const mongoose=require('mongoose')
const app=express();
const dotenv=require('dotenv')
const path=require('path')
dotenv.config()

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const MPW=process.env.DB_PASSWORD
const dbAddress = `mongodb+srv://graphqlfirst:${MPW}@cluster0.kc7jm.mongodb.net/<dbname>?retryWrites=true&w=majority`;
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

app.get('/',(req,res,next)=>{
    res.send('hi this is graphql BackServer')
})

app.listen(3050,()=>{
    console.log('service start')
})