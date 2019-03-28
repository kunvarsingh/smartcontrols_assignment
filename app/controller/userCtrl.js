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
var Country = require('../models/Country.js');
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
                      User.findOne({Email :req.body.email},{verifyEmail :0},function(err ,data){
                        if(err) return res.json({message : "Err, unable to get the data",err,status : 400})

                        if(data) {
                                bcrypt.compare(reqObj.Password,data.Password,function(err  ,success){
                                if(err) return res.json({message : "unable to campare the password",status : 400,error:err})
                                
                                else if(success){
                                   var token = jwt.sign({id:data._id},'secret',{ expiresIn: '1h' });
                                   data.Password='';
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
      let confirmpassword = 'admin@123';
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
                                  accountType : req.body.accountType
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
  let userId = req.body.userId;
  let roles = req.body.roles;
  if(userId && roles){
  User.findByIdAndUpdate(req.body.userId,
    {$push: {roles: req.body.roles}},
    {safe: true, upsert: true},
      function(err, doc) {
          if(err){
          return res.send({status:400, message:"Error occured to add new role!"});
          }else{
          //do stuff
          return res.send({status:200, message:"New role added successfully!"});
          }
      }
  );
}else{
  return res.send({status:400, message:"Please send userId and roles!"});
}
}

var addCountryBySuperAdmin = (req, res)=>{
  let userId = req.body.userId;
  let country = req.body.countryName;
  let capital = req.body.capitalName;
  if(userId && country || capital){
      let obj = { country : country, capital :  capital? capital : '', addedBy : userId };
    Country.find({country:country},{},(err,data1)=>{
      // console.log(data1)
      if(data1.length){
        return res.send({status:400, message:"Country already exist!"});
      }else{
      Country.create(obj,(err,data)=>{
        return res.send({status:200, message:"Country added successfully!"});
      }); 
    }
    })

}else{
  return res.send({status:400, message:"Please send userId!"});
}
}

var getCountyList = (req, res)=>{
   let userId = req.body.userId;
    if(userId){
      console.log('i am inside getCountyList ')
          Country.find({},{}).populate('addedBy',{UserName:1}).exec((err,data)=>{
            return res.send({status:200, message:"Country list get successfully!",data : data});
          })
    }else{
    return res.send({status:400, message:"Please send userId!"});
  }  
}

var editCountry = (req, res)=>{
  Country.findByIdAndUpdate(req.body.countryId,
    {country : req.body.country},
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

var updateCapital =  (req, res)=>{
   let countryId = req.body.countryId;
   let capitalName = req.body.capitalName;
   if(countryId){
  Country.findByIdAndUpdate(countryId,
    {capital : capitalName},
      function(err, doc) {
          if(err){
          return res.send({status:400, message:"Error occured to update capital!"});
          }else{
          //do stuff
          return res.send({status:200, message:"Capital update successfully!"});
          }
      }
  );
  }else{
    return res.send({status:400, message:"Please send countryId!"});
  }  
}

var deleteCountry = (req, res)=>{
  let countryId = req.body.countryId;
  if(countryId){
  Country.remove({_id:req.body.countryId},
      function(err, doc) {
          if(err){
          return res.send({status:400, message:"Error to delete country!",error:err});
          }else{
          //do stuff
          return res.send({status:200, message:"deleted country!"});
          }
      }
  );
   }else{
  return res.send({status:400, message:"Please send countryId!"});
}  
}

var deleteUser = (req, res)=>{
   let userId = req.body.userId;
  if(userId){
  User.remove({_id:userId},
      function(err, doc) {
          if(err){
          return res.send({status:400, message:"Error to delete users!",error:err});
          }else{
          //do stuff
          return res.send({status:200, message:"deleted user!"});
          }
      }
  );
   }else{
  return res.send({status:400, message:"Please send userId!"});
}  
}

var getallUsers = (req, res)=>{
    let userId = req.body.userId;
    let type = '';
  if(userId){
    User.find({_id:userId},{Password :0, verifyEmail :0},function(err, doc1) {
      console.log(doc1.length,doc1[0].accountType,doc1.length && doc1[0].accountType=='Super Admin')
      if(doc1.length && doc1[0].accountType=='Super Admin') type ='Admin';
      else type = 'Others';
      User.find({accountType : type},{Password :0, verifyEmail :0},
        // User.find( { $or: [{accountType : 'Admin'},{accountType : 'Others'}]},{Password :0, verifyEmail :0},
            function(err, doc) {
                if(err){
                return res.send({status:400, message:"Error to fetch users!"});
                }else{
                //do stuff
                return res.send({status:200, message:"All users!",data : doc});
                }
            });

});
   }else{
  return res.send({status:400, message:"Please send userId!"});
}  
}

var getuserById = (req, res)=>{
   let userId = req.body.userId;
  if(userId){
  User.find( {_id: userId},{Password :0, verifyEmail :0},
      function(err, doc) {
          if(err){
          return res.send({status:400, message:"Error to fetch users!"});
          }else{
          //do stuff
          return res.send({status:200, message:"All users!",data : doc});
          }
      }
  );
}
 else{
  return res.send({status:400, message:"Please send userId!"});
}  
}


function isSuperAdmin(userId,callback){
  console.log('i am inside isSuperAdmin ')
  User.findByIdAndUpdate({_id:userId},function(err, doc) {
     console.log('not super admin',err,doc);
          if(err){ console.log(err);
          }else{
          if(doc && doc.accountType=='Super Admin'){
            callback(true);
          }else{

            callback(false);
          }
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

  exports.addCountryBySuperAdmin = addCountryBySuperAdmin;
  exports.getCountyList = getCountyList;

  exports.editCountry = editCountry;
  exports.deleteCountry = deleteCountry;

  exports.deleteUser = deleteUser;
  exports.getallUsers =getallUsers;
  exports.getuserById = getuserById;

  exports.updateCapital = updateCapital;