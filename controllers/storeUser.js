const User = require('../models/user'),
        path = require('path'),
        flash = require('connect-flash/lib/flash');

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if(error){
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            req.session.validationErrors = validationErrors;
            return res.redirect('/auth/register');
        }
        res.redirect('/')
    })
};