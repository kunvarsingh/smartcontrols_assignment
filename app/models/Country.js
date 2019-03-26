var mongoose = require('mongoose');
var Schema = mongoose.Schema;

     var countrySchema = new Schema({
            country : { type : String, required : true},
            capital : { type : String},
            CreatedAt :               { type  : Date ,default : Date.now },
            IsDelete  :               { type : Boolean , defaults : false }
   });

module.exports = mongoose.model('country',countrySchema);
