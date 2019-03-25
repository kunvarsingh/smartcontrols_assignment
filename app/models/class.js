var mongoose = require('mongoose');
var Schema = mongoose.Schema;

     var classSchema = new Schema({
            uploadedBy : { type : String, required : true},
            className : { type : String, required : true},
            board      :              {type:mongoose.Schema.Types.ObjectId, ref: 'board'},
            CreatedAt :               { type  : Date ,default : Date.now },
            IsDelete  :               { type : Boolean , defaults : false }
   });

module.exports = mongoose.model('class',classSchema);
