const Users = require('../models/userModel');
const jwt = require('../Crypto/Jwt');

const checkUserJwtMethod = async (token) => {
  const data = jwt.designJWT(token);
  if(data == null){
    return {
      status : 401,
      msg : "token not authorized" 
    }
  }
  else {
    const email = data.email;
    const password = data.password;
    try {
      const user = await Users.findOne({ email });
      if (!user) {
          return {
            status : 404,
            msg : 'User not found' 
          }
      }
      if (user.password!== password) {
          return {
            status : 401,
            msg : 'Incorrect password' 
          }
      }
      return {
        status : 200,
        msg : "token authorized",
        user : user
      }
    } catch (error) {
        return {
          status : 500,
          msg : error.message 
        }
    }
  }
}

const checkUserJwt = async (req, res, next) => {
    const token = req.body.token || req.header('A_JWT');
    let result = await checkUserJwtMethod(token);
    if(result.status == 200) {
      req.customData = {
        user : result.user
      }
      next();
    }
    else {
      return res.status(result.status).json({ msg: "" + result.msg });
    }
}

module.exports = {
  checkUserJwt,
  checkUserJwtMethod
};