var mongoose = require('mongoose');
var Schema = mongoose.Schema;

     var userSchema = new Schema({
            UserName :               { type : String},
            Password  :               { type : String  },
            Email     :               { type : String , required : true},
            image     :               { type : String,default : '' },
            verificationToken  :      { type : String},
            accountType         : { type: String,
                            enum: ['Admin','Super Admin','Others']
                          },
            roles : [],                          
            resetPasswordToken  : { type: String},
            resetPasswordExpires: { type: Date},
            verifyEmail         :       {verificationStatus: {type: Boolean, default :false},
                                               Email: {type:String}
                                  },
            CreatedAt :               { type  : Date ,default : Date.now },
            IsDelete :                { type : Boolean , defaults : false }
   });

module.exports = mongoose.model('user',userSchema);
