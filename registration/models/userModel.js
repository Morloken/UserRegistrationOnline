const db = require('../config/db');


const findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        console.error('Error finding user:', err);
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};


const createUser = (username, hashedPassword) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error creating user:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = {
  findUserByUsername,
  createUser,
};
