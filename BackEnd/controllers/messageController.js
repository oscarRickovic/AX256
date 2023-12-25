const friendModel = require("../models/friendModel");
const messageModel = require("../models/messageModel");
const userModel = require("../models/userModel");

const jwt = require('../Crypto/Jwt');

const checkJWT = async (token) => {
    const data = jwt.designJWT(token);
    if(data == null) {
      return null;
    }
    else {
      const email = data.email;
      const password = data.password;
      try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return null;
        }
        if (user.password !== password) {
            return null;
        }
        return user;
      } catch (error) {
            return null;
      }
    }
}

const createMessage = async (senderId, friendShipId, message) => {
    if(message == null || message == "") return ;
    try {
        const friendShip = await friendModel.findById({_id : friendShipId});
        if(!friendShip) {
            return ;
        }
        if(friendShip.user1 != senderId && friendShip.user2 != senderId){
            return ;
        }
        try {
            const sender = await userModel.findById({_id : senderId});
            if(!sender){
                return ;
            }
            try {
                const messageRes = await messageModel.create({
                    sender : senderId,
                    message : message,
                    friendShip : friendShipId
                })
                return messageRes;
            } catch (e){
                console.log(e.message)
                return ;
            }
        } catch (e) {
            return ;
        }
    } catch(e){
        return 7;
    }
}
module.exports = {checkJWT, createMessage};