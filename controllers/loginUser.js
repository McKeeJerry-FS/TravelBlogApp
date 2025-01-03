const bcrypt = require('bcrypt'),
        User = require('../models/user');

module.exports = (req, res) => {
    const { username, password } = req.body;
    
    User.findOne({ username:username }, (err, user) => {
        if(user) {
            bcrypt.compare(password, user.password, (err, user) => {
                res.redirect('/'); 
            });
        } else {
            res.redirect('/auth/login');
        }
    });
};