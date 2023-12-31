const Users = require('../models/userModel');
const Friend = require('../models/friendModel');
const Message = require('../models/messageModel');
const mongoose = require('mongoose');
const clr = require('../CryptoMiddleWare/UserCryptoGraphyMiddleWare');
const {signJWT} = require('../Crypto/Jwt');


// get friends list with last message
const getFriendsWithLastMsgsMethod = async (meId) => {
  try {
    // All friendsShip that Im in.
    const friendships = await Friend.find({ $or: [{ user1: meId }, { user2: meId }] });
    // Getting my friends user id.
    const friendIds = friendships.map(friendship => (friendship.user1 == meId ? friendship.user2 : friendship.user1));
    const friendListWithMessages = await Promise.all(
      friendIds.map(async friendId => {
        const friendUser = await Users.findById(friendId);
        const friendShip = friendships.find(friendship => (friendship.user1 === friendId || friendship.user2 === friendId))._id;
        const lastMessage = await Message.findOne({ friendShip: friendShip})
          .sort({ createdAt: -1 })
          .limit(1);
        const isFromMe = lastMessage == null ? false : lastMessage.sender == meId ? false : true;
        // lastMessage && lastMessage.sender == meId
        return {
          friendShipId : friendShip,
          friendInfo : friendUser,
          lastMessage: lastMessage ? lastMessage.message : null,
          isFromMe,
          lastMessageTimestamp: lastMessage ? lastMessage.createdAt : null
        };
      })
    );
    friendListWithMessages.sort((a, b) => {
      return b.lastMessageTimestamp - a.lastMessageTimestamp;
    });
    return {
      status : 200,
      result : friendListWithMessages
    } 
  } catch (error) {
    console.error('Error getting friend list with last message:', error);
    throw error;
  }
}

// Upgrated
const getAllFriendsOnly = async (meId) => {
  try{
    const friends = await Friend.find({
      $or: [
        { user1: meId },
        { user2: meId },
      ],
    });

    const friendUserIds = friends.map(
      friend => (friend.user1 == meId) ?
       friend.user2 : 
       friend.user1
    );

    try {
      const friendUsers = await Users.find({ _id: { $in: friendUserIds }});
      // Combine user with its friendShip id to create socket rooms
      const result = friends.map((friend) => {
        const friendInfo = friendUsers.find(
          (fr) =>
            fr._id ==
            (friend.user1 == meId
              ? friend.user2
              : friend.user1)
        );
        return {
          friendShipId: friend._id,
          friendInfo
        };
      });
      return {
        status : 200,
        result : result
      }
    } catch(e) {
      return {
        status : 500,
        msg : 'server error while finding user informations'
      }
    }
  } catch(e) {
    return {
      status : 500,
      msg : 'Server error while finding friends'
    }
  }
}

// get only ur friend users.
const getUsers = async (req, res) => {
  const me = req.customData.user;
  let result = await getFriendsWithLastMsgsMethod(me._id);
  if(result.status == 200) {
    res.status(200).json(result.result);
  }
  else {
    res.status(result.status).json({msg : result.msg});
  }
}

// get only ur friend users.
const getFriendShipUser = async (req, res) => {
  // Chat room.
  const { id } = req.params
  const me = req.customData.user;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(405).json({error: 'No valid id'})
  }
  try{
    const friendShip = await Friend.findById({_id : id});
    if(!friendShip) {
      return res.status(404).json({msg : "friend ship not found"});
    }
    else {
      if(friendShip.user1 != me._id && friendShip.user2 != me._id){
        return res.status(401).json({msg : "not authorize to get other students data"})
      } 
      else {
        const friendId = friendShip.user1 == me._id ? friendShip.user2 : friendShip.user1;
        try {
          let myFriend = await Users.findById({_id : friendId});
          if(!myFriend){
            return res.status(404).json({msg : "friend Infos not found"})
          }
          else {
            return res.status(200).json(myFriend)
          }
        } catch(e) {
          return res.status(502).json({msg : "Server error while finding friends infos"});
        }
      }
    }
  } catch(e) {
    return res.status(501).json({msg : "server error while finding chat"})
  }
}

// get only ur friend users.
const getUser = async (req, res) => {
  const { id } = req.params
  const me = req.customData.user;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(405).json({error: 'No valid id'})
  }

 try {
  const user = await Users.findById(id)
  if (!user) {
    return res.status(404).json({error: 'No such user with this id'})
  }
  try {
    const friendship = await Friend.findOne({
      $or: [
        { user1: me._id, user2: id},
        { user1: id, user2: me._id},
      ],
    });
    if(!friendship) {
      return res.status(401).json({msg: "Not authorize to see no friends informations"})
    }
    return res.status(200).json(user);
  } catch(e) {
    return res.status(502).json({msg : "Server error while finding friends infos"})
  }
 } catch(e) {
  return res.status(501).json({msg : "server error while finding user by its id"})
 }
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
  const { id } = req.params;
  const me = req.customData.user;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No valid id'})
  }
  try {
    const user = await Users.findOne({_id: id})
    if(!user) {
      return res.status(400).json({error: 'No such user'})
    }
    try {
      const friendship = await Friend.findOne({
        $or: [
          { user1: me._id, user2: id},
          { user1: id, user2: me._id},
        ],
      });
      if(!friendship) {
        return res.status(401).json({msg: "Not authorize to Block no friends"})
      }
      try {
        await Friend.findOneAndDelete({_id : friendship._id});
        return res.status(200).json({msg : "Blocked Successfully"})
      } catch(e) {
        return res.status(503).json({msg : "Server error while deleting friend"})
      }
    } catch(e) {
      return res.status(502).json({msg : "Server error while finding friends infos"})
    }
  } catch(e) {
    res.status(501).json({msg : "Server error while finding user"})
  }
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

const setLine = async (user, line) => {
  try {
    const findUser = await Users.findById(user._id);

    if (!findUser) {
      return {
        status: 404,
        msg: "User with this ID is not found",
      };
    }

    if (user.isOnLine == line) {
      return {
        status: 200,
        msg: "Set already without update",
      };
    } else {
      user.isOnline = line;
      try {
        await Users.findByIdAndUpdate({_id : user._id}, {
          ...user
        }) 
        return {
          status: 200,
          msg: "Set successfully",
        };
      } catch (e) {
        return {
          status: 500,
          msg: `Server error while updating user: ${e.message}`,
        };
      }
    }
  } catch (e) {
    return {
      status: 500,
      msg: `Server error while finding user by ID: ${e.message}`,
    };
  }
};




module.exports = {
  getUsers,
  getUser,
  getFriendShipUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  checkUserJwt,
  checkUserPassword,
  setLine
}