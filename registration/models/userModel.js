

const db = require('../config/db'); 


const findUserByUsername = (username, callback) => {
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};


const createUser = (username, hashedPassword, callback) => {
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  findUserByUsername,
  createUser,
};
