const express = require('express'),
      path = require('path');
const app = express();

// Styles & Scripts
app.use(express.static('public'));

const port = 3000 || PROCESS.ENV.PORT;


app.get('/', function (req,res){
    res.sendFile(path.resolve(__dirname, 'index.html'));  
});
app.get('/about', function (req,res){
    res.sendFile(path.resolve(__dirname, 'about.html'));  
});
app.get('/contact', function (req,res){
    res.sendFile(path.resolve(__dirname, 'contact.html'));  
});
app.get('/notfound', function (req,res){
    res.sendFile(path.resolve(__dirname, 'notfound.html'));  
});



// Port Listening
app.listen(port, () => {
    console.log(`App is listening on Port: ${port}`);
});