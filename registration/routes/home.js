const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/home', (req, res) => {
  if (!req.session.userId) {
    // return res.redirect('../views/login.html');
    return res.redirect('/login');
  }


  // res.sendFile(path.join(__dirname,'views',  'home.html')); 

  res.render('home', { user: req.session.user });
});

router.get('/get-username', (req, res) => {
  if (req.session.username) {
    res.json({ username: req.session.username });
  } else {
    res.json({ username: null });
  }
});



module.exports = router;

