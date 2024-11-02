var express = require('express')
require('dotenv').config();
const mongoose= require('mongoose')
const cors = require('cors')
const bodyParser=require('body-parser')
const app = express()
const port = 8000
const uri = "mongodb://127.0.0.1:27017/StudyFinder";

const postRoutes = require('./router/postRoutes')
require('dotenv').config();
app.use(cors())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
})
app.use(express.json());
app.use(postRoutes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.use('/img',express.static(__dirname+'public/img'))
app.use('/video',express.static(__dirname+'public/video'))
mongoose.connect(uri)
app.listen(port,()=>console.log(`listen on http://localhost:${port}`))