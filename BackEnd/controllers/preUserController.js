const Users = require('../models/preUserModel');
const realUsers = require('../models/userModel');
const mongoose = require('mongoose');
const {getUserRegister, getUserLogin, clearDatafnct} = require('../CryptoMiddleWare/UserCryptoGraphyMiddleWare');
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
        let existedEmail = await Users.findOne({ email });

        if (existedEmail) {
            return res.status(404).json({ error: 'email already existed in preUsers' });
        }

        existedEmail = await realUsers.findOne({email});

        if (existedEmail) {
            return res.status(404).json({ error: 'email already existed in real Users' });
        }

        let code = parseInt(Math.random() * 1000000);
        const newUser = await Users.create({username, email, password, code});
        const credentials = {
          username : username,
          email : email,
          password : password,
          code : code,
          isVerified : false
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
  // we will receive 3 kind of informations
  // token : username, email, password, code, isVerified.
  // data (decrypt) : code.
  // client pub key
  const token = req.body.token;
  const dataToken = designJWT(token);
  console.log('data in token');
  console.log(dataToken);
  const clearCode = clearDatafnct(req);
  console.log('clear code passed by user');
  console.log(clearCode);
  if(dataToken == null) {
    res.status(402).json({msg : "token not authorized"})
  }
  else {
    const username = dataToken.username;
    const email = dataToken.email;
    const password = dataToken.password;
    const code = dataToken.code;
    const isVerified = dataToken.isVerified
    if(code != clearCode[0]){
      return res.status(403).json({msg : "not same code as token"});
    }
    else {
      try {
        let existedEmail = await Users.findOne({ email });
        if(existedEmail == null) {
          return res.status(404).json({msg : "no registred data found for this"});
        }
        else {
          if(existedEmail.password != password) {
            return res.status(401).json({msg : "token no authorized"});
          }
          if(existedEmail.code != clearCode) {
            return res.status(405).json({msg : "not same code as saved token in DB"});
          }
          try {
            const deleteUser = await Users.findOneAndDelete({email: email})
            if(!deleteUser) {
              return res.status(406).json({msg : "ndeletin preUser is found"})
            }
          } catch (e) {
              return res.status(503).json({msg : "error while deleting preUser"});
          }
          try {
            const newUser = await realUsers.create({username, email, password});
            const credentials = {
            username : username,
            email : email,
            password : password
            };
            return res.status(200).json(signJWT(credentials));
          } catch(e){
            return res.status(501).json({msg : "server error while updating tables"});
          }
        }
      } catch(e) {
        return res.status(500).json({msg : "server error while checking datas"})
      }
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