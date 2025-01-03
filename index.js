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


const validationMiddlewares = require('./middlewares/validationMiddleware');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/posts/store', validationMiddlewares);



// Controllers
//Blog Posts
const newPostController = require('./controllers/newPost', validationMiddlewares);
const blogsController = require('./controllers/blogcontroller');
const contactController = require('./controllers/contact');
const storePostController = require('./controllers/storePost');
const homeController = require('./controllers/home');
const aboutController = require('./controllers/about');
const singlePostController = require('./controllers/singlePost');
// User registration and login / logout
const registerUserController = require('./controllers/storeUser');
const newUserController = require('./controllers/newUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');

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
//  ORDER MATTERS HERE!! '/post/new' must come before '/post/:id'.
//  The reason being is if /post/:id is placed before /post/new, the server will treat new as an id and will not render the create.ejs file. That is because 'new' matches the '/:id' profile. 
//  This goes the same for '/post/store' and '/post/:id'. '/post/:id' must come after '/post/store' because the server will treat 'store' as an id and will not render the post.ejs file.
app.get('/post/new', newPostController);
app.post('/post/store', storePostController);
app.get('/post/:id', singlePostController);
// Handling Registration and login / logout
app.get('/auth/register', newUserController);
app.get('/auth/login', loginController);
app.post('/users/register', registerUserController);
app.post('/users/login', loginUserController);







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