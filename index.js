const express = require('express'),
      path = require('path'),
      ejs = require('ejs'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      BlogPost = require('./models/blogpost'),
      fileUpload = require('express-fileupload'),
      session = require('express-session'),
      bcrypt = require('bcrypt'),
      flash = require('connect-flash');
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
const logoutController = require('./controllers/logout');
const loginUserController = require('./controllers/loginUser');
const authMiddleware = require('./middlewares/authMiddleware');
const redirectAuthenticated = require('./middlewares/redirectAuthenticated');
const notFoundController = require('./controllers/notfound');

// Setup for ejs
app.set('view engine', 'ejs');

// Styles & Scripts
app.use(express.static('public'));
app.use(fileUpload());
app.use(flash());
app.use(session({
    secret: 'bonsai25',
}));

const port = 3000 || process.env.PORT;

// Controllers
app.get('/index', homeController);
app.get('/about', aboutController);
app.get('/contact', contactController);
app.get('/blogs', blogsController);

//  ORDER MATTERS HERE!! '/post/new' must come before '/post/:id'.
//  The reason being is if /post/:id is placed before /post/new, the server will treat new as an id and will not render the create.ejs file. That is because 'new' matches the '/:id' profile. 
//  This goes the same for '/post/store' and '/post/:id'. '/post/:id' must come after '/post/store' because the server will treat 'store' as an id and will not render the post.ejs file.
app.get('/post/new', authMiddleware, newPostController);
app.post('/post/store', authMiddleware, storePostController);
app.get('/post/:id', singlePostController);
///////////////////////////////////////////

global.loggedIn = null;
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

// Handling Registration and login / logout
app.get('/auth/register', redirectAuthenticated, newUserController);
app.get('/auth/login', redirectAuthenticated, loginController);
app.get('/auth/logout', logoutController);
app.post('/users/register', redirectAuthenticated, registerUserController);
app.post('/users/login', redirectAuthenticated, loginUserController);

app.get('/notfound', notFoundController);
// app.use((req, res) => res.render('notfound'));


// Port Listening & Database connection check
// app.listen(port, () => {
//     console.log(`App is listening on Port: ${port}`);
//     if(mongoose){
//         console.log('Database connected');
//     } else {
//         console.log('Database connection failed');
//     }
// });

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });