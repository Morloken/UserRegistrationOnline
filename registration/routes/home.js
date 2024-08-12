const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/home.html', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login.html');
  }

  res.sendFile(path.join(__dirname, '../views/home.html')); 
});

module.exports = router;

