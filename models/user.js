const mongoose = require('mongoose');
const bcrypt = require('bcrypt'),
      uniqueValidator = require('mongoose-unique-validator');
var UserSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true,
        unique: true,
        required: [true, 'Please provide a username']
    },
    password: {
        type:String,
        required: true,
        required: [true, 'Please provide a password']

    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    image: String,
});

UserSchema.pre('save', function(next) {
    const user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err){
            return next(err);
        }
        user.password = hash;
        next();
    });
});

UserSchema.plugin(uniqueValidator);

var User = mongoose.model('User', UserSchema);
module.exports = User;