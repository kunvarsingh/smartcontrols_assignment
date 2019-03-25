var mongoose = require('mongoose');
var Schema = mongoose.Schema;

     var subjectSchema = new Schema({
            uploadedBy : { type : String, required : true},
            subjectName : { type : String, required : true},
            class      :              {type:mongoose.Schema.Types.ObjectId, ref: 'class'},
            board : {type:mongoose.Schema.Types.ObjectId, ref: 'board'},
            CreatedAt :               { type  : Date ,default : Date.now },
            IsDelete  :               { type : Boolean , defaults : false }
   });

module.exports = mongoose.model('subject',subjectSchema);
