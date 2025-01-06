const BlogPost = require('../models/blogpost');

module.exports = async (req, res) => {
    const blogpost = await BlogPost.find({}).sort({_id: -1}).limit({limit: 1});
    res.sendFile('index', {
        blogpost
    }); 
};