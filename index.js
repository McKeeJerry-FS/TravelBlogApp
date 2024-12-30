const express = require('express'),
      path = require('path'),
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


app.get('/', function (req,res){
    res.render('index');  
});
app.get('/about', function (req,res){
    res.render('about');  
});
app.get('/contact', function (req,res){
    res.render('contact');  
});
app.get('/post', function (req,res){
    res.render('post');  
});
app.get('/blogs', function (req,res){
    res.render('blogs');  
});
app.get('/post/new', function (req,res){
    res.render('create');  
});
app.get('/notfound', function (req,res){
    res.render('notfound');  
});

app.post('/post/store', async (req, res) => {
    await BlogPost.create(req.body, (error, blogpost) => {
        res.redirect('/blogs');
    });
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