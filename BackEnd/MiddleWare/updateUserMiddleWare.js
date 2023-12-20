const clr = require('../CryptoMiddleWare/UserCryptoGraphyMiddleWare');
const hashWithKey = require('../Crypto/HashWithSymKey');
const dotenv = require('dotenv');

dotenv.config();
const updateUserMiddleWare = (req, res, next) => {
    // now we have clear data.
    const newUser = clr.clearDatafnct(req);
    const user = req.customData.user;
    // the data that we want to replace with.
    let data = {};
    if(newUser.username != '' && newUser.username != user.username) {
        data = {...data, username : newUser.username}
    }
    if(newUser.email != '' && newUser.email != user.email) {
        data = {...data, email : newUser.email}
    }
    if(newUser.gender != '' && newUser.gender != user.gender) {
        data = {...data, gender : newUser.gender}
    }
    if(newUser.bio != '' && newUser.bio != user.bio) {
        data = {...data, bio : newUser.bio}
    }
    if(newUser.password != '') {
        data = {...data, password : hashWithKey(newUser.password, process.env.SERVER_SECRET_KEY)}
    }
    req.customData.newUser = data;
    console.log('/updateUserMiddleware data is ')
    console.log(data)
    next();
}

module.exports =  updateUserMiddleWare;