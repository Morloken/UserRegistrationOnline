const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

// require('dotenv').config({path:__dirname+'/.env'});
// require('dotenv').config();

const registrController = require('./controllers/registrController'); 
const validateMiddleware = require('./middleware/validateMiddleware'); 


router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(session({
  secret: 'secret', 
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // Session expires in 1 minute
}));


router.use('/static', express.static(path.join(__dirname, './views')));

// Routes
router.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.sendFile(path.join(__dirname, './views/home.html')); 
  } else {
    res.sendFile(path.join(__dirname, './views/register.html')); 
  }
});

router.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, './views/register.html')); 
});

router.post('/register.html', validateMiddleware.validateRegistration, registrController.registerUser);

router.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, './views/login.html')); 
});

router.post('/login.html', validateMiddleware.validateLogin, registrController.loginUser);

router.get('/home.html', (req, res) => { // Protecting routes with session validation
  if (req.session.loggedin) {
    res.sendFile(path.join(__dirname, './views/home.html')); 
  } else {
    res.send('Please login to view this page!');
  }
});

module.exports = router;
