const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

const registerUser = async (req, res) => {
  const { username, password, dob, gender, country } = req.body;
  if (username && password && dob && gender && country) {
    try {
      const hash = await bcrypt.hash(password, 10);
      await userModel.createUser(username, hash, dob, gender, country);
      res.redirect('/login');
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500)
      res.send('Error creating user! Please go to previous page!');
    }
  } else {
    res.status(400)
    res.send('Please enter Username and Password! Please go to previous page!');
  }
};

const loginUser = async (req, res) => {
  const { username, password} = req.body;
  if (username && password) {
    try {
      let user = await userModel.findUserByUsername(username);
      if (user) {
        let isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect('/home');
        } else {
          res.status(400)
          res.send('Incorrect Password! Please go to previous page!');
        }
      } else {
        res.status(400)
        res.send('Username not found! Please go to previous page!');
      }
    } catch (err) {
      console.error('Error processing request:', err);
      res.status(500)
      res.send('Error processing request! Please go to previous page!');
    }
  } else {
    res.status(400)
    res.send('Please enter Username and Password! Please go to previous page!');
  }
};

module.exports = {
  registerUser,
  loginUser,
};
