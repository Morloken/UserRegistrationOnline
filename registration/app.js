const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const db = require('./db'); 

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

app.post('/register', (req, res) => { // Registration route
  const { username, password } = req.body;
  if (username && password) {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw err;
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err, results) => {
        if (err) throw err;
        res.redirect('/login');
      });
    });
  } else {
    res.send('Please enter Username and Password!');
  }
});

app.get('/login', (req, res) => {
  res.render('login'); 
});

app.post('/login', (req, res) => { // Login route
  const { username, password } = req.body;
  if (username && password) {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
          if (isMatch) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/home');
          } else {
            res.send('Incorrect Password!');
          }
        });
      } else {
        res.send('Username not found!');
      }
    });
  } else {
    res.send('Please enter Username and Password!');
  }
});

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
