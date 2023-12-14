const Users = require('../models/userModel');
const mongoose = require('mongoose');
const {getUserRegister, getUserLogin} = require('../CryptoMiddleWare/UserCryptoGraphyMiddleWare');
const {signJWT, designJWT} = require('../Crypto/Jwt');
// get all users
const getUsers = async (req, res) => {
  const users = await Users.find({}).sort({createdAt: -1})
  res.status(200).json(users)
}

// get a single user
const getUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No valid id'})
  }

  const user = await Users.findById(id)

  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }

  res.status(200).json(user)
}

// create a new user
// to 2tay this will work only with Register component not with Login.
// used status [200, 400, 404]
const createUser = async (req, res) => {
  const [username, email, password] = getUserRegister(req);
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

// delete a user
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

// update a user
const updateUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No valid id'})
  }

  const user = await Users.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!user) {
    return res.status(400).json({error: 'No such user'})
  }

  res.status(200).json(user)
}

// used status [200, 404, 401,500]
const loginUser = async (req, res) => {
    const [ email, password ] = getUserLogin(req);
    console.log(email, password)
    try {
        // Find user by email
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

        res.status(200).json(signJWT(credentials));
        
      } catch (error) {
            res.status(500).json({ error: error.message });
      }
};

const checkUserJwt = async (req, res) => {
  const token = req.body.token;
  const data = designJWT(token);
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
      res.status(200).json({msg : 'welcome'});
    } catch (error) {
          res.status(500).json({ msg: error.message });
    }
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  checkUserJwt
}