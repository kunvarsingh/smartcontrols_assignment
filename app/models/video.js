var mongoose = require('mongoose');
var Schema = mongoose.Schema;

     var videoSchema = new Schema({
            uploadedBy : { type : String, required : true},
            subject      :              {type:mongoose.Schema.Types.ObjectId, ref: 'subject'},
            link      :               { type : String, required : true},
            CreatedAt :               { type  : Date ,default : Date.now },
            IsDelete  :               { type : Boolean , defaults : false }
   });

module.exports = mongoose.model('video',videoSchema);
