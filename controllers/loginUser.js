const bcrypt = require('bcrypt'),
        User = require('../models/user');

module.exports = (req, res) => {
    const { username, password } = req.body;
    
    User.findOne({ username:username }, (err, user) => {
        if(user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if(same){
                    req.session.userId = user._id;
                    res.redirect('/'); 
                } 
                else {
                    res.redirect('/auth/login');
                    console.log('Password is incorrect'), err;
                }
            })
        } else {
            res.redirect('/auth/login');
        }
    });
};