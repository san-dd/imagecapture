var express = require('express');
const mongoose =require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {MONGO_URI,MONGO_DB_NAME,PORT} =require('./config/appConfig')
 
const cors=require('cors')

var indexRouter = require('./routes/upload');
var authroute = require('./routes/auth');

var app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Connect to Mongo
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


//route
app.use('/', indexRouter);
app.use('/',authroute)


app.listen(PORT,()=>console.log(`Server started on PORT ${PORT}`))
