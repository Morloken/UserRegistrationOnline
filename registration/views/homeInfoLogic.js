
document.addEventListener('DOMContentLoaded', () => {
  let displayName = document.getElementById('displayName');
  let displayEmail = document.getElementById('displayEmail');
  let displayDOB = document.getElementById('displayDOB');
  let displayGender = document.getElementById('displayGender');
  let displayCountry = document.getElementById('displayCountry');

  let user;
  db.query('SELECT * FROM users WHERE username = ?', [req.session.username], (err, result) => {
    if (err) throw err;
    user = result[0];
  });
  
  

  displayName.textContent = user.username;
  displayEmail.textContent = user.email;
  displayDOB.textContent = user.dob;
  displayGender.textContent = user.gender;
  displayCountry.textContent = user.country;
  
});


