const user = require('../models/user');
const path = require('path');

module.exports = async (req, res) => {
    user.create(req.body, (error, user) => {
        res.redirect('/');
    });
};