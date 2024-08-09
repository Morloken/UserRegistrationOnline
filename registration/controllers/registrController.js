const bcrypt = require('bcryptjs');
const db = require('../db');

exports.registerUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Please enter Username and Password!');
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err, results) => {
      if (err) throw err;
      res.redirect('/login');
    });
  });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Please enter Username and Password!');
  }

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (isMatch) {
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect('/home');
        } else {
          res.status(400).send('Incorrect Password!');
        }
      });
    } else {
      res.status(400).send('Username not found!');
    }
  });
};
