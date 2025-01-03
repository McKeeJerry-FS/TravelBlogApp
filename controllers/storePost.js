const BlogPost = require('../models/blogpost'),
      path = require('path');

module.exports = async (req, res) => {
    var image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name), async(error)=> {
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        });
        res.redirect('/blogs');
    });
};