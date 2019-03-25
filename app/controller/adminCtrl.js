var Image = require('../models/image.js');
var Video = require('../models/video.js');
var Class = require('../models/class.js');
var Board = require('../models/board.js');
var Subject = require('../models/subject.js');


var cloudinary = require('cloudinary');
const fs = require('fs');

  var admin  = async(req,res)=>{
  	return res.send({status:200, message:"Hello Admin"});
  }

  var createYoutubeLink = (req,res)=>{
  	var link1 = req.body.link;
    var link = link1.indexOf('=');

  	if(link!=-1){
      var obj = {
        link : 'https://youtube.com/embed/'+link1.split('=')[1],
        uploadedBy : req.body.uploadedBy,
        subject : req.body.subject
      }
      Video.create(obj,(err, data)=>{
        if(err) return res.send({status:400, message :'Server Error!',error:err});
        return res.send({status:200, message :'Link Created sucessfully!'});
      })
  	}else{
  		return res.send({status:400, message :'Please send link!'});
  	}
  }

   var deleteYoutubeLink = (req,res)=>{
  	var linkId = req.body.linkId;
  	if(linkId){
  		Video.remove({_id : linkId},(err, data)=>{
        if(err) return res.send({status:400, message :'Server Error!',error:err});
        return res.send({status:200, message :'Link Deleted sucessfully!'});
      })
  	}else{
      return res.send({status:400, message :'Please send linkId!'});
  	}
  }

   var getSubjectYoutubeLink = (req,res)=>{
    var subject = req.body.subject;
    if(subject){
      Video.find({subject:subject},(err, data)=>{
        if(err) return res.send({status:400, message :'Server Error!',error:err});
        return res.send({status:200, message :'Get All Link fetch sucessfully!',data : data});
      })
    }else{
      return res.send({status:400, message :'Please send subject!'});
    }
  }  

 var getAllYoutubeLink = (req,res)=>{
      Video.find({},(err, data)=>{
        if(err) return res.send({status:400, message :'Server Error!',error:err});
        return res.send({status:200, message :'Get All Link fetch sucessfully!',data : data});
      })
  } 


// --------------------------Classes API's---------------------------
 var getAllClasses = (req,res)=>{
      Class.find({}).populate('board').exec((err, data)=>{
        if(err) return res.send({status:400, message :'Server Error!',error:err});
        return res.send({status:200, message :'Get All Classes fetch sucessfully!',data : data});
      })
  } 

 var addClass = (req,res)=>{
      let obj = {
        className : req.body.className,
        uploadedBy : req.body.uploadedBy,
        board : req.body.boardId,
      }
      Class.create(obj,(err, data)=>{
        if(err) return res.send({status:400, message :'Server Error!',error:err});
        return res.send({status:200, message :'Class created sucessfully!',data : data});
      })
  } 

   var deleteClass = (req,res)=>{
    var classId = req.body.classId;
    if(classId){
      Class.remove({_id : classId},(err, data)=>{
        if(err) return res.send({status:400, message :'Server Error!',error:err});
        return res.send({status:200, message :'Class Deleted sucessfully!'});
      })
    }else{
      return res.send({status:400, message :'Please send ClassId!'});
    }
  }
// --------------------------END-------------------------------------


// --------------------------Classes API's---------------------------

 var getAllSubjects = (req,res)=>{
      Subject.find({}).populate('class').populate('board').exec((err, data)=>{
        if(err) return res.send({status:400, message :'Server Error!',error:err});
        return res.send({status:200, message :'Get All subject fetch sucessfully!',data : data});
      })
  } 

 var getAllSubjectsForClass = (req,res)=>{
      Subject.find({class : req.body.classId},(err, data)=>{
        if(err) return res.send({status:400, message :'Server Error!',error:err});
        return res.send({status:200, message :'Get All subject fetch sucessfully!',data : data});
      })
  } 

   var addSubjectForClass = (req,res)=>{
      let obj = {
        subjectName : req.body.subjectName,
        class : req.body.classId,
        board : req.body.boardId,
        uploadedBy : req.body.uploadedBy
      }
      Subject.create(obj,(err, data)=>{
        if(err) return res.send({status:400, message :'Server Error!',error:err});
        return res.send({status:200, message :'Subject created sucessfully!',data : data});
      })
  } 

   var deleteSubjectForClass = (req,res)=>{
    var subjectId = req.body.subjectId;
    if(subjectId){
      Subject.remove({_id : subjectId},(err, data)=>{
        if(err) return res.send({status:400, message :'Server Error!',error:err});
        return res.send({status:200, message :'Subject Deleted sucessfully!'});
      })
    }else{
      return res.send({status:400, message :'Please send subjectId!'});
    }
  }
// --------------------------END-------------------------------------

//---------------------------Add BOARD------------------------

 var getAllBoards = (req,res)=>{
      Board.find({},(err, data)=>{
        if(err) return res.send({status:400, message :'Server Error!',error:err});
        return res.send({status:200, message :'Get All boards fetch sucessfully!',data : data});
      })
  } 

   var addBoard = (req,res)=>{
      let obj = {
        boardName : req.body.boardName,
        uploadedBy : req.body.uploadedBy
      }
      Board.create(obj,(err, data)=>{
        if(err) return res.send({status:400, message :'Server Error!',error:err});
        return res.send({status:200, message :'Board created sucessfully!',data : data});
      })
  } 

   var deleteBoard = (req,res)=>{
    var boardId = req.body.boardId;
    if(boardId){
      Board.remove({_id : boardId},(err, data)=>{
        if(err) return res.send({status:400, message :'Server Error!',error:err});
        return res.send({status:200, message :'Board Deleted sucessfully!'});
      })
    }else{
      return res.send({status:400, message :'Please send boardId!'});
    }
  }
// --------------------------END-------------------------------------


var uploadImage = (req,res)=>{
     cloudinary.config({
      cloud_name: 'pennybase-technologies-private-solution', 
      api_key: '638493116712829', 
      api_secret: 'wPY1PjR02-duNX7Si5rJjhYJYMk' 
    });

     var img_base64 = req.body.image;
     var subjectId = req.body.subjectId;
     var classId = req.body.classId;
     var uploadedBy = req.body.uploadedBy
     binaryData = new Buffer(img_base64, 'base64');
     var timestamp = new Date().getTime();

     fs.writeFile("ECOACH"+subjectId+classId+timestamp+".png", binaryData, "binary", function(err) {
         if (err) {
             console.log("errror in writtting file",err);
         } else {
            console.log("Image upload");
                 cloudinary.uploader.upload("ECOACH"+subjectId+classId+timestamp+".png", function(result) {
                     if (result.url) {
                         var obj = {
                          link : result.url,
                          uploadedBy : uploadedBy,
                          subject : subjectId,
                          class : classId
                        }
                        Image.create(obj,(err, data)=>{
                          if(err) return res.send({status:400, message :'Server Error!',error:err});
                          return res.send({status:200, message :'Image upload successfully!'});
                        })

                     }else{
                        return res.send({status : 400, message :"Oop's sorry,Please try again!.",error:err,result: result})
                     }
                 })
         }
     });
}

var getAllImage = (req, res)=>{
      Image.find({class : req.body.classId,subject :req.body.subjectId}).populate('class').exec((err, data)=>{
        if(err) return res.send({status:400, message :'Server Error!',error:err});
        return res.send({status:200, message :'Get All images fetch sucessfully!',data : data});
      })
}
// --------------------------END-------------------------------------


  exports.admin  = admin;
  exports.createYoutubeLink = createYoutubeLink;
  exports.deleteYoutubeLink = deleteYoutubeLink;
  exports.getAllYoutubeLink = getAllYoutubeLink;
  exports.getSubjectYoutubeLink = getSubjectYoutubeLink;

  exports.getAllClasses = getAllClasses;
  exports.addClass = addClass;
  exports.deleteClass = deleteClass;

  exports.getAllSubjectsForClass = getAllSubjectsForClass;
  exports.addSubjectForClass = addSubjectForClass;
  exports.deleteSubjectForClass = deleteSubjectForClass;
  exports.getAllSubjects = getAllSubjects;

  exports.addBoard = addBoard;
  exports.deleteBoard = deleteBoard;
  exports.getAllBoards =  getAllBoards;


  exports.uploadImage = uploadImage;
  exports.getAllImage = getAllImage;

