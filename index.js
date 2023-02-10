const express = require('express')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require("cookie-parser");

const userRouter = require('./routes/userRoutes');
require('dotenv').config()


mongoose.connect(process.env.MONGO_URI)
const app = express()

app.use(cors({
    origin: process.env.ORIGIN ,
    credentials: true,
  }));

  app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })

  app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/',  userRouter)

app.get('/', (req, res) => {
    res.send('hello');
})
app.listen(process.env.PORT || 8080, () => console.log('Server running'));

