

const validateRegistration = (req, res, next) => {
    const { username, password} = req.body;
  
   
    if (!username || !password) {
      // return res.send('Please enter all required fields.');
      return res.send('Please enter all required fields.');
    }
  
    
    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    if (!usernameRegex.test(username)) {// username is alphanumeric and within a specific length
     return res.send('Username must be alphanumeric and between 3 and 15 characters long.');

    }
  

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.send('Password must be at least 8 characters long and include at least one letter and one number.');
      
    }

    
    // const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    // if (!dobRegex.test(dob)) {
    //   return res.send('Date of birth must be in the format YYYY-MM-DD.');
    // }

    // const genderRegex = /^(male|female)$/;// with case insensitivity
    // if (!genderRegex.test(gender)) {
    //   return res.send('Gender must be either "male" or "female".');
    // }
   

  
        //  to the next middleware/controller
    next();
  };
  
  const validateLogin = (req, res, next) => {// middleware for login validation
    const { username, password} = req.body;
    if (!username || !password) {
      return res.send('Please enter all required fields.');
    }
  
        //  to the next middleware/controller
    next();
    
  };
  
  module.exports = {
    validateRegistration,
    validateLogin
  };
  