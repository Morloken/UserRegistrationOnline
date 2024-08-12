const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const db = require("./config/db"); 

const registrController = require('./controllers/registrController'); // Controller for handling registration and login
const validateMiddleware = require('./middleware/validateMiddleware'); // Middleware for validating inputs

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // Session expires in 1 minute
}));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Routes
app.get("/", (req, res) => {
  if (req.session.loggedin) {
    res.redirect('/home.html'); 
    
  } else {
    res.redirect('/register.html');
    
  }
});

app.get('/register.html', (req, res) => {
  res.render('register.html'); 
  // res.sendFile(path.join(__dirname, 'views/register.html'));
});

app.post('/register.html', validateMiddleware.validateRegistration, registrController.registerUser);
app.post('/register', validateMiddleware.validateRegistration, registrController.registerUser);

app.get('/login.html', (req, res) => {
  res.render('login.html'); 

});

app.post('/login.html', validateMiddleware.validateLogin, registrController.loginUser);


app.get('/home.html', (req, res) => { // Protecting routes with session validation

  if (req.session.loggedin) {
    res.send(`Welcome back, ${req.session.username}!`);
  } else {
    res.send('Please login to view this page!');
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

