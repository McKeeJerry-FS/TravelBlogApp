const BlogPost = require('../models/blogpost');

module.exports = async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', {
        blogpost
    });
};