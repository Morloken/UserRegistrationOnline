const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../db');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send('All fields are required.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  connection.query(query, [username, email, hashedPassword], (err) => {
    if (err) throw err;
    res.redirect('/login');
  });
});

module.exports = router;
