// External module import via NPM manager------------------------
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose  = require('mongoose');
var bcrypt = require('bcrypt');
var cors = require('cors');

// import routing files----------------------
var USER =require('./routes/userRout');
var ADMIN =require('./routes/adminRout');
var CONST = require('./config/constant');

var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(bodyparser.urlencoded({ extended : false ,limit: '50mb'}));
app.use(bodyparser.json({limit: '50mb', extended: true}));
app.use(cors());
var port = 3000;
// --------------------------------------MONGODB Connection--------------------------------------
mongoose.connect(CONST.wnsConstant.DBURL, function(data,err){
	if(!err) console.log("Error to connect MONGODB :",err);
	console.log("MONGODB connection successfully: Smart Controls");
});
// --------------------------------------END MONGODB Connection--------------------------------------


// --------------------------------------ROUTING for user module--------------------------------------
app.use('/user',USER);
app.use('/admin',ADMIN);


app.get('/',function(req,res){
  res.send({message :"Welcome World Teach"});
});

// app.listen(process.env.PORT || port);
console.log("*****Node server is starting***");
app.listen(process.env.PORT || 9000,function(req,res){
  console.log("port 9000 is Running......................... ");
})

module.exports = app;