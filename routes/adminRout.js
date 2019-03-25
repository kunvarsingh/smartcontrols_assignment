var express = require('express');
var admin = require('../app/controller/adminCtrl');
var router = express.Router();

router.get('/', function(req, res){
  res.send({status : 200, message :"I am default route in admin module."});
})


router.post('/createYoutubeLink',admin.createYoutubeLink);
router.post('/deleteYoutubeLink',admin.deleteYoutubeLink);
router.get('/getAllYoutubeLink',admin.getAllYoutubeLink);
router.post('/getSubjectYoutubeLink',admin.getSubjectYoutubeLink);

router.get('/getAllClasses',admin.getAllClasses);
router.post('/addClass',admin.addClass);
router.post('/deleteClass',admin.deleteClass);

router.post('/getAllSubjectsForClass',admin.getAllSubjectsForClass);
router.post('/addSubjectForClass',admin.addSubjectForClass);
router.post('/deleteSubjectForClass',admin.deleteSubjectForClass);
router.get('/getAllSubjects', admin.getAllSubjects);

router.post('/addBoard', admin.addBoard);
router.post('/deleteBoard', admin.deleteBoard);
router.get('/getAllBoards', admin.getAllBoards);

router.post('/uploadImage', admin.uploadImage);
router.post('/getAllImage', admin.getAllImage);

// route here for user module----------------------
module.exports = router;
