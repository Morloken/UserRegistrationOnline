

const validateRegistration = (req, res, next) => {
    const { username, password } = req.body;
  
   
    if (!username || !password) {
      return res.send('Please enter both username and password.');
    }
  
    
    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    if (!usernameRegex.test(username)) {// username is alphanumeric and within a specific length
      return res.send('Username must be alphanumeric and between 3 and 15 characters long.');
    }
  

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.send('Password must be at least 8 characters long and include at least one letter and one number.');
    }
  
        //  to the next middleware/controller
    next();
  };
  
  const validateLogin = (req, res, next) => {// middleware for login validation
    const { username, password } = req.body;
    if (!username || !password) {
      return res.send('Please enter both username and password.');
    }
  
        //  to the next middleware/controller
    next();
    
  };
  
  module.exports = {
    validateRegistration,
    validateLogin
  };
  