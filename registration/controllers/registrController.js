const bcrypt = require('bcryptjs');
const db = require('../config/db');
const userModel = require('../models/userModel');


let registerUser = (req, res) => {
  let { username, password } = req.body;
  if (username && password) {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw err;
      userModel.createUser(username, hash, (err, results) => {
        if (err) {
          res.send('Error creating user!');
        } else {
          res.redirect('/login');
        }
      });
    });
  } else {
    res.send('Please enter Username and Password!');
  }
};

let loginUser = (req, res) => {
  let { username, password } = req.body;
  if (username && password) {
    userModel.findUserByUsername(username, (err, user) => {
      if (err) throw err;
      if (user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
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
};
module.exports = {
  registerUser,
  loginUser,
};