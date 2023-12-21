const Users = require('../models/userModel');
const mongoose = require('mongoose');
const clr = require('../CryptoMiddleWare/UserCryptoGraphyMiddleWare');
const {signJWT, designJWT} = require('../Crypto/Jwt');

const getUsers = async (req, res) => {
  const users = await Users.find({}).sort({createdAt: -1})
  res.status(200).json(users)
}

const getUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No valid id'})
  }

  const user = await Users.findById(id)

  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }

  return res.status(200).json(user)
}

const createUser = async (req, res) => {
  const {username, email, password} = clr.hashClearDataPassword(req);
    try {
        const existedEmail = await Users.findOne({ email });

        if (existedEmail) {
            return res.status(404).json({ error: 'email already existed' });
        }

        const newUser = await Users.create({username, email, password});
        const credentials = {
          username : username,
          email : email,
          password : password
        };
        res.status(200).json(signJWT(credentials));
    } catch (error) {
        // This a server error not user one.
        res.status(500).json({error: error.message})
    }
}

const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No valid id'})
  }

  const user = await Users.findOneAndDelete({_id: id})

  if(!user) {
    return res.status(400).json({error: 'No such user'})
  }

  res.status(200).json(user)
}

const updateUser = async (req, res) => {
  const user = req.customData.user;
  const newUser = req.customData.newUser;
  if(newUser.email != null && newUser.email != '') {
    try {
      const existedEmail = await Users.findOne({ email : newUser.email });
      if (existedEmail) {
        return res.status(407).json({ error: 'email already existed' });
      }
    } catch(e) { return res.status(500).json({msg : "server error while checking email"})}
  }

  try {
    await Users.findOneAndUpdate({email : user.email},{
      ...req.customData.newUser
    })
  } catch(e) {
    return res.status(501).json({msg : "server error while updating user"});
  }
  try {
    const cred = await Users.findById({_id : user._id})
    console.log('user controller');
    console.log(cred);
    return res.status(200).json(signJWT(
      {
        username : cred.username,
        email : cred.email,
        password : cred.password
      }
    ))
  } catch(e) {
    return res.status(502).json({msg : "server error while finding new Infos"})
  }
}

const loginUser = async (req, res) => {
    const {email, password} = clr.hashClearDataPassword(req);
    console.log(email, password)
    try {
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        const credentials = {
          username : user.username,
          email : user.email,
          password : user.password
        };

        return res.status(200).json(signJWT(credentials));
        
      } catch (error) {
            res.status(500).json({ error: error.message });
      }
};

const checkUserJwt = async (req, res) => {
  return res.status(200).json({msg : 'welcome'});
}

const checkUserPassword = async(req, res) => {
  const user = req.customData.user;
  const clearData = clr.hashClearDataPassword(req);
  if(clearData.password === user.password) {
    return res.status(200).json({msg : "OK"});
  }
  return res.status(401).json({msg : "NOT SAME USER PASSWORD, AUTHORIZATION DENIED"})
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  checkUserJwt,
  checkUserPassword
}