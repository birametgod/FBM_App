const User = require('../models/user');

exports.getUser = (req,res,next) => {
    res.send('user controller');
    next();
};