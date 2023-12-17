const Users = require('../models/userModel');
const jwt = require('../Crypto/Jwt');

const checkUserJwt = async (req, res, next) => {
    const token = req.body.token || req.header('A_JWT');
    const data = jwt.designJWT(token);
    if(data == null) {
      res.status(402).json({msg : "token not authorized"})
    }
    else {
      const email = data.email;
      const password = data.password;
      try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ msg: 'Incorrect password' });
        }
        next();
      } catch (error) {
            return res.status(500).json({ msg: error.message });
      }
    }
}

module.exports = checkUserJwt;