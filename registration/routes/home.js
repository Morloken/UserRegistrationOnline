const express = require('express');
const router = express.Router();
const path = require('path');

// router.get('/home', (req, res) => {
//   if (!req.session.userId) {

//     return res.redirect('/login');
//   }


 


//   res.render('home', { username: req.session.username });

// });


router.get('/home', (req, res) => {
  if (req.session.loggedin) {
    const query = 'SELECT username FROM users WHERE id = ?';
    db.query(query, [req.session.userId], (err, result) => {
      if (err) throw err;
      const username = result[0].username;
      res.render('home', { username });
      res.render('home', { username: `Welcome, ${username}!` });
    });
  } else {
    res.send('Please login to view this page! Go to previous page for login!');
  }
});


// router.get('/get-username', (req, res) => {
//   if (req.session.username) {
//     res.json({ username: req.session.username });
//   } else {
//     res.json({ username: null });
//   }
// });



module.exports = router;

