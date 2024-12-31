const express = require('express'),
        // path = require('path'),
        ejs = require('ejs'),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        BlogPost = require('./models/blogpost');
const app = express();
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL,
    ({useNewUrlParser: true, useUnifiedTopology: true})
);




// Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Setup for ejs
app.set('view engine', 'ejs');

// Styles & Scripts
app.use(express.static('public'));

const port = 3000 || process.env.PORT;


app.get('/', async function (req,res){
    const blogpost = await BlogPost.find({}).sort({_id: -1}).limit({limit: 1});
    res.render('index', {
        blogpost
    });  
});
app.get('/about', function (req,res){
    res.render('about');  
});
app.get('/contact', function (req,res){
    res.render('contact');  
});
app.get('/blogs', async function (req,res){
    const blogposts = await BlogPost.find({}).sort({_id: -1}).limit({limit: 10});
    res.render('blogs', {
        blogposts
    }); 
    for(var i=0; i<blogposts.length; i++){
        console.log(blogposts[i]);
    }
});

//  ORDER MATTERS HERE!! '/post/new' must come before '/post/:id'.
//  The reason being is if /post/:id is placed before /post/new, the server will treat new as an id and will not render the create.ejs file. That is because 'new' matches the '/:id' profile. 
//  This goes the same for '/post/store' and '/post/:id'. '/post/:id' must come after '/post/store' because the server will treat 'store' as an id and will not render the post.ejs file.
app.get('/post/new', function (req,res){
    res.render('create');  
});
app.post('/post/store', async (req, res) => {
    await BlogPost.create(req.body, (error, blogpost) => {
        res.redirect('/blogs');
    });
});
app.get('/post/:id', async function (req,res){
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', {
        blogpost
    }); 
    //console.log(blogpost); 
});







app.get('/notfound', function (req,res){
    res.render('notfound');  
});


// Port Listening & Database connection check
app.listen(port, () => {
    console.log(`App is listening on Port: ${port}`);
    if(mongoose){
        console.log('Database connected');
    } else {
        console.log('Database connection failed');
    }
});