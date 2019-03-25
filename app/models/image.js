var mongoose = require('mongoose');
var Schema = mongoose.Schema;

     var imageSchema = new Schema({
            uploadedBy : { type : String, required : true},
            subject      :              {type:mongoose.Schema.Types.ObjectId, ref: 'subject'},
            class      :              {type:mongoose.Schema.Types.ObjectId, ref: 'class'},
            link      :               { type : String, required : true},
            CreatedAt :               { type  : Date ,default : Date.now },
            IsDelete  :               { type : Boolean , defaults : false }
   });

module.exports = mongoose.model('image',imageSchema);
