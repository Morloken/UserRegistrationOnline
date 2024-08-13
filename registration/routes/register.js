const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const connection = require('../config/db');
const path = require('path');

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'register.html'));


  
});

router.post('/register', async (req, res) => {
  const { username,  password, dob, gender, country } = req.body;

  if (!username  || !password || !dob || !gender || !country) {
    res.status(400).send('All fields are required.');
    return res.status(400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (username, password, dob, gender, country) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [username, hashedPassword, dob, gender, country], (err) => {
    if (err) throw err;
    res.redirect('/login');

  });
});

module.exports = router;
