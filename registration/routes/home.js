const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }

  res.render('home', { user: req.session.userId });
});

module.exports = router;
