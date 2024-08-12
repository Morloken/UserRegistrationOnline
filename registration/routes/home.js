const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/home', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('../views/login.html');
  }

  res.sendFile(path.join(__dirname, '../views/home.html')); 
});

module.exports = router;

