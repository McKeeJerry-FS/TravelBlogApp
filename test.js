// This file is for testing connections to the database and creating new functionality
// Startup this file by using 'node test.js' in the terminal

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const blogPostSchema = new Schema({
    title: String,
    body: String,
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

mongoose.connect(process.env.MONGO_URL, (
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }));

BlogPost.create({
    title: 'Test Blog Post',
    body: 'This is a test blog post'
}, (error, post) => {
    console.log(error, post);
});