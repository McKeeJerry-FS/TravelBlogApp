const BlogPost = require('../models/blogpost');

module.exports = async (req, res) => {
    //const BlogPost = require('../models/blogpost');
    const blogposts = await BlogPost.find({}).sort({_id: -1}).limit({limit: 10});
    res.render('blogs', {
        blogposts
    }); 
};