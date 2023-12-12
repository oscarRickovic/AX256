const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config() ;

const signJWT = (payload) => {
    return jwt.sign(payload, process.env.SERVER_SECRET_KEY, {expiresIn: '30d'});
}
  
const designJWT = (token) => {
    let res = null;
    jwt.verify(token, process.env.SERVER_SECRET_KEY, (err, decode) => {
        if(err) {
            res = null;
        } else {
            res = decode;
        }
    })
    return res;
}


module.exports = {signJWT, designJWT}