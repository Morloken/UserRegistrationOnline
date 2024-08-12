

const db = require('../config/db'); 


const findUserByUsername = (username, callback) => {
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Error finding user:', err);
      console.error(null, results[0]);
      return;
    }
    
  });
};


const createUser = (username, hashedPassword, callback) => {
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
    if (err) {
      
      console.error('Error creating user:', err);
      return;
    }
  });
};

module.exports = {
  findUserByUsername,
  createUser,
};
