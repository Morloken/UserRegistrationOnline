const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    try {
      const hash = await bcrypt.hash(password, 10);
      await userModel.createUser(username, hash);
      // res.redirect('../views/login.html');
      res.redirect('/login');

    } catch (err) {
      res.status(500).send('Error creating user!');
    }
  } else {
    res.status(400).send('Please enter Username and Password!');
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    try {
      const user = await userModel.findUserByUsername(username);
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          req.session.loggedin = true;
          req.session.username = username;
          // res.redirect('../views/home.html');
          res.redirect('/home');
        } else {
          res.status(400).send('Incorrect Password!');
        }
      } else {
        res.status(400).send('Username not found!');
      }
    } catch (err) {
      res.status(500).send('Error processing request!');
    }
  } else {
    res.status(400).send('Please enter Username and Password!');
  }
};

module.exports = {
  registerUser,
  loginUser,
};
