const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

require('dotenv').config(); 

const registrController = require('./controllers/registrController'); 
const validateMiddleware = require('./middleware/validateMiddleware'); 

const app = express();
const port = 3000;
const router = express.Router();

app.use(express.static(__dirname + '/views', {
  setHeaders: function (res, path, stat) {
      res.set('Content-Type', 'application/javascript');
  }
}));

app.get('/get-username', (req, res) => {
  
  //function that gets username from database of the user and then puts it in the html file, in the #displayName

  res.sendFile(path.join(__dirname, 'views', 'homeInfoLogic.js'));




  // const user = {
  //     username: 'default username'
  // };
  // res.json(user);

  // function getUsername() {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('GET', '/get-username', true);
  //   xhr.onreadystatechange = function() {
  //     if (xhr.readyState === 4 && xhr.status === 200) {
  //       const response = JSON.parse(xhr.responseText);
  //       const nickname = response.username;
  //       if (nickname) {
  //         document.getElementById('displayName').textContent = `Hello, ${nickname}!`;
  //       } else {
  //         document.getElementById('displayName').textContent = 'Hello, Guest!';
  //       }
  //     }
  //   };
  //   xhr.send();
  // }
  // getUsername();
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(session({
  secret: process.env.SESSION_SECRET || 'secret', 
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // Session expires in 1 minute
}));


router.use('/static', express.static(path.join(__dirname, 'public')));

// Routes
router.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
  } else {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
  }
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

router.post('/register', validateMiddleware.validateRegistration, registrController.registerUser);

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

router.post('/login', validateMiddleware.validateLogin, registrController.loginUser);

router.get('/home', (req, res) => { 
  if (req.session.loggedin) {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
  } else {
    res.send('Please login to view this page! Go to previous page for login!');
   
      res.redirect('/register');
    
  }
});






app.use('/', router);






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

