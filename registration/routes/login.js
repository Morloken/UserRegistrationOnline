const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../db');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], async (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.status(400).send('User not found.');
    }

    const user = results[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).send('Invalid credentials.');
    }

    req.session.userId = user.id;
    req.session.cookie.maxAge = 60 * 1000; //excactly 1 minute

    res.redirect('/home');
  });
});

module.exports = router;
