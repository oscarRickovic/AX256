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
    if(message == null || message == "") return 401 ;
    try {
        const friendShip = await friendModel.findById({_id : friendShipId});
        if(!friendShip) {
            return 404;
        }
        if(friendShip.user1 != senderId && friendShip.user2 != senderId){
            return 402;
        }
        try {
            const sender = await userModel.findById({_id : senderId});
            if(!sender){
                return 405;
            }
            try {
                const messageRes = await messageModel.create({
                    sender : senderId,
                    message : message,
                    friendShip : friendShipId
                })
                return 200;
            } catch (e){
                return 500;
            }
        } catch (e) {
            return 501 ;
        }
    } catch(e){
        return 502;
    }
}

const getMessagesHelper = async (friendShipId, meId) => {
    let result = {
        status : null,
        data : null
    }
    try {
        const friendShip = await friendModel.findById({_id :friendShipId });
        if(!friendShip) {
            result.status = 404;
            result.data = "FriendShip not found using this ID."
            return result;
        }
        const me = await userModel.findById({_id : meId});
        if(!me){
            result.status = 404;
            result.data = "User not found using this ID."
            return result;
        }
        if(friendShip.user1 != meId && friendShip.user2 != meId) {
            result.status = 401;
            result.data = "Not authorized to get friendShip info"
            return result;
        }
        const messages = await messageModel.find({friendShip : friendShipId});
        result.status = 200;
        result.data = messages;
        return result;
    } catch (e) {
        result.status = 500;
        result.data = e.message;
        return result;
    }
}

const getMessages = async (req, res) => {
    const { friendShipId } = req.params;
    const meId = req.customData.user._id;
    const result = await getMessagesHelper(friendShipId, meId);
    // add status of position:
    if (result.status == 200) {
       result.data = result.data.map(value => {
            return {...value._doc, me: value.sender == meId};
        });
    }
    return res.status(result.status).json(result.data);
}

module.exports = {
    checkJWT,
    createMessage,
    getMessagesHelper,
    getMessages
};