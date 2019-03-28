var express = require('express');
var usered = require('../app/controller/userCtrl');
var router = express.Router();

router.get('/', function(req, res){
  res.send({status : 200, message :"I am default route in user module."});
})


// route here for user module----------------------
router.post('/registration', usered.registration);
router.post('/login',usered.login);
router.post('/profile',usered.profile);
router.post('/updateProfile',usered.updateProfile);

router.post('/createAdmin', usered.createAdmin);
router.post('/addNewRole', usered.addNewRole);

router.post('/addCountryBySuperAdmin', usered.addCountryBySuperAdmin);
router.post('/getCountyList', usered.getCountyList);

router.post('/editCountry', usered.editCountry);
router.post('/deleteCountry', usered.deleteCountry);

router.post('/deleteUser', usered.deleteUser);
router.post('/getallUsers', usered.getallUsers);
router.post('/getuserById', usered.getuserById);

router.post('/updateCapital', usered.updateCapital);
module.exports = router;
