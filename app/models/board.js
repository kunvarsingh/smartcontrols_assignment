var mongoose = require('mongoose');
var Schema = mongoose.Schema;

     var boardSchema = new Schema({
            uploadedBy : { type : String, required : true},
            boardName : { type : String, required : true},
            CreatedAt :               { type  : Date ,default : Date.now },
            IsDelete  :               { type : Boolean , defaults : false }
   });

module.exports = mongoose.model('board',boardSchema);
