// External module import via NPM manager------------------------
var express = require('express');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');


// Modals and custome file import
var User = require('../models/userModel.js');
var CONST = require('../../config/constant');

// ----------------------------Registeration-------------------------------
/* Kunvar singh 24-11-2018
   Description : Register with mongodb using this API*/
// -----------------------------------------------------------

var registration = (req, res)=>{

      let Password = req.body.password;
      let Email = req.body.email;
      let confirmpassword = { confirmpassword : req.body.confirmpassword };
      var token;

      if(confirmpassword.confirmpassword == Password) {

            User.findOne({Email:Email},{},(err,data)=>{
              if(err){  return res.json({ message : "Error occured on server!",status : 400, data : err}) }
                 
                 if(!data){
                   crypto.randomBytes(10,(err,buf)=>{
                     token = buf.toString('hex');
                     req.body.verificationToken = token;
                   });

                    bcrypt.hash(Password, 10, (err, hash)=> {
                      if (err) {
                          return res.json({ message: "unable to bcrypt the password",status: 200 })
                        } 
                        else if (hash){
                              let requestObj = {
                                  UserName: req.body.username,
                                  Email : Email,
                                  Password: hash,
                                  };

                                  if(requestObj.UserName && requestObj.Email){
                                    User.create(requestObj,(err, data)=>{
                                      if (err) {
                                            console.log('errrrrrrrrrrrrrrrrrr', err);
                                             return res.json({ message: "error, There is unable to store record in db",status: 400 })
                                           } else if (data) {
                                            requestObj.savePassword = Password;
                                              return res.json({message :"Your account created successfully!.",status : 200})
                                          }
                                        else return res.json({ message: "There are an error to get the data", status: 400 });
                                    });
                                  }
                                  else return res.json({ message : "Please enter the all required fields",status : 400 })
                        }
                         else return res.json({  message: "Password is unable to bcrypt the password" , status: 400 })
                });
              }
              else return res.json({message : "This email id is already register with us",status : 400});
             });
      }
      else return res.json({ message: "Password and confirmPassword not match", status :400});
    }

// ----------------------------Login-------------------------------
/* Kunvar singh 24-11-2018
   Description : Login with credential usign all the cases*/
// -----------------------------------------------------------
  var login = (req,res)=>{
          var reqObj = {
             Email : req.body.email,
             Password : req.body.password
          };

          if(reqObj.Email && reqObj.Password){
                      User.findOne({Email :req.body.email},{},function(err ,data){
                        if(err) return res.json({message : "Err, unable to get the data",err,status : 400})

                        if(data) {
                                bcrypt.compare(req.body.password,data.Password,function(err  ,success){
                                if(err) return res.json({message : "unable to campare the password",status : 400})
                                
                                else if(success){
                                   var token = jwt.sign({id:data._id},'secret',{ expiresIn: '1h' });
                                   return res.json({status :200, message : "User login successfully",auth : true,token : token , data : data })

                                   var userid =  function(req, res) {
                                                var token = req.headers['token'];
                                                jwt.verify(token, "name", function(err, decoded) {
                                                  if (err) return res.json(err);
                                                  return res.json(decoded);
                                                });
                                            }
                                 }
                                 else return res.json({ message : "Please enter the correct password ",status:400})
                               });
                           }
                           else return res.json({message : "Your email is not register with us, Please signup first!.",status : 400});
                      });
            }
            else return res.json({message : "Please enter email & password!.",status : 400})
   }

  // var login = (req,res)=>{
  //   let username = req.body.username;
  //   let password = req.body.password;
  //   if(username && password){
  //     if(username==='admin' && password==='admin@123'){
  //       return res.json({message : "Successfully login!.",status : 200,data : {id : 1,username : 'Admin'}})
  //     }else{
  //       return res.json({message : "Wrong email & password!.",status : 400})  
  //     }
  //   }else{
  //     return res.json({message : "Please enter email & password!.",status : 400})
  //   }
  // }
 
 var profile = (req, res)=>{
  User.findOne({_id : req.body.id},{Email:1,UserName:1,image:1},(err, data)=>{
    if(err) return res.send({message : "Err, unable to get the data",err,status : 400})
    return res.send({message : "Get Profile",status : 200,data:data})  ;
  });
 }


var updateProfile = (req, res)=>{
  User.updateOne({_id : req.body.id},{UserName:req.body.username,image:req.body.image},(err, data)=>{
    if(err) return res.send({message : "Err, unable to get the data",err,status : 400})
    return res.send({message : "Profile update successfully!.",status : 200})  ;
  });
 }

var createAdmin = (req, res)=>{

      let Password ='admin@123';
      let Email = req.body.email;
      let confirmpassword = { confirmpassword : 'admin@123' };
      var token;

       console.log(req.body) 
      if(confirmpassword == Password) {

            User.findOne({Email:Email},{},(err,data)=>{
              if(err){  return res.json({ message : "Error occured on server!",status : 400, data : err}) }
                 
                 if(!data){
                   crypto.randomBytes(10,(err,buf)=>{
                     token = buf.toString('hex');
                     req.body.verificationToken = token;
                   });

                    bcrypt.hash(Password, 10, (err, hash)=> {
                      if (err) {
                          return res.json({ message: "unable to bcrypt the password",status: 200 })
                        } 
                        else if (hash){
                              let requestObj = {
                                  UserName: req.body.username,
                                  Email : Email,
                                  Password: hash,
                                  roles : req.body.roles,
                                  accountType : 'Admin'
                                  };

                                  if(requestObj.UserName && requestObj.Email){
                                    User.create(requestObj,(err, data)=>{
                                      if (err) {
                                            console.log('errrrrrrrrrrrrrrrrrr', err);
                                             return res.json({ message: "error, There is unable to store record in db",status: 400 })
                                           } else if (data) {
                                            requestObj.savePassword = Password;
                                              return res.json({message :"Your account created successfully!.",status : 200})
                                          }
                                        else return res.json({ message: "There are an error to get the data", status: 400 });
                                    });
                                  }
                                  else return res.json({ message : "Please enter the all required fields",status : 400 })
                        }
                         else return res.json({  message: "Password is unable to bcrypt the password" , status: 400 })
                });
              }
              else return res.json({message : "This email id is already register with us",status : 400});
             });
      }
      else return res.json({ message: "Password and confirmPassword not match", status :400});
}

var addNewRole = (req, res)=>{
  User.findByIdAndUpdate(req.body.userId,
    {$push: {roles: req.body.roles}},
    {safe: true, upsert: true},
      function(err, doc) {
          if(err){
          console.log(err);
          }else{
          //do stuff
          console.log('success');
          }
      }
  );
}
// Export function for access interact with DB
  exports.registration = registration;
  exports.login  = login;
  exports.profile = profile;
  exports.updateProfile = updateProfile;

  exports.createAdmin = createAdmin;
  exports.addNewRole = addNewRole;
