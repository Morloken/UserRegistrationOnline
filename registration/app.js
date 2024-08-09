const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const db = require('./db'); 

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

app.set('view engine', 'ejs');

// Routes
app.get('/register', (req, res) => {
  res.render('register'); 
});

app.post('/register', validateMiddleware.validateRegistration, registrController.registerUser);

app.get('/login', (req, res) => {
  res.render('login'); 
});

app.post('/login', validateMiddleware.validateLogin, registrController.loginUser);

app.get('/home', (req, res) => { // Protecting routes with session validation
  if (req.session.loggedin) {
    res.send(`Welcome back, ${req.session.username}!`);
  } else {
    res.send('Please login to view this page!');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
