const express = require('express'),
      path = require('path'),
      ejs = require('ejs');
const app = express();

// Setup for ejs
app.set('view engine', 'ejs');

// Styles & Scripts
app.use(express.static('public'));

const port = 3000 || PROCESS.ENV.PORT;


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
app.get('/notfound', function (req,res){
    res.render('notfound');  
});



// Port Listening
app.listen(port, () => {
    console.log(`App is listening on Port: ${port}`);
});