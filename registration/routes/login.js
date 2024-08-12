const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const db = require('../config/db'); 
const { validateLogin } = require('../middleware/validateMiddleware');
const { loginUser } = require('../controllers/registrController');

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/login', validateLogin, loginUser);

module.exports = router;


// router.post('/login.html', (req, res) => {
//   const { email, password } = req.body;

//   const query = 'SELECT * FROM users WHERE email = ?';
//   db.query(query, [email], async (err, results) => {
//     if (err) throw err;

//     if (results.length === 0) {
//       return res.status(400).send('User not found.');
//     }

//     const user = results[0];
//     const isValid = await bcrypt.compare(password, user.password);

//     if (!isValid) {
//       return res.status(400).send('Invalid credentials.');
//     }

    
//     req.session.userId = user.id;
//     req.session.loggedin = true;

//     req.session.cookie.maxAge = 60 * 1000; // Exactly 1 minute

//     res.redirect('/home.html');
//   });
// });