const express = require('express'),
      path = require('path'),
      ejs = require('ejs'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      BlogPost = require('./models/blogpost'),
      fileUpload = require('express-fileupload'),
      bcrypt = require('bcrypt');
const app = express();
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL,
    ({useNewUrlParser: true, useUnifiedTopology: true})
);




// Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Controllers
const newPostController = require('./controllers/newPost');
const blogsController = require('./controllers/blogcontroller');
const contactController = require('./controllers/contact');
const storePostController = require('./controllers/storePost');
const homeController = require('./controllers/home');
const aboutController = require('./controllers/about');
const singlePostController = require('./controllers/singlePost');
const registerUserController = require('./controllers/storeUser');
const newUserController = require('./controllers/newUser');

// Setup for ejs
app.set('view engine', 'ejs');

// Styles & Scripts
app.use(express.static('public'));
app.use(fileUpload());

const port = 3000 || process.env.PORT;

// Controllers
app.get('/', homeController);
app.get('/about', aboutController);
app.get('/contact', contactController);
app.get('/blogs', blogsController);
app.get('/newUser', newUserController);
//  ORDER MATTERS HERE!! '/post/new' must come before '/post/:id'.
//  The reason being is if /post/:id is placed before /post/new, the server will treat new as an id and will not render the create.ejs file. That is because 'new' matches the '/:id' profile. 
//  This goes the same for '/post/store' and '/post/:id'. '/post/:id' must come after '/post/store' because the server will treat 'store' as an id and will not render the post.ejs file.
app.get('/post/new', newPostController);
app.post('/post/store', storePostController);
app.post('/user/register', registerUserController);
app.get('/post/:id', singlePostController);







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