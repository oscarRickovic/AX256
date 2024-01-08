const Users = require('../models/userModel');
const Friends = require('../models/friendModel');
const BlackLists = require('../models/blackListModel');
// Users that want to meet new friends
const Waiters = require('../models/findNewFriendsModel');

const getNewFriendMethod = async (user) => {
    try {
        const myFriends = await Friends.find({ $or: [{ user1: user._id }, { user2: user._id }] });
        const myFriendsIds = myFriends.map(friend => (friend.user1 == user._id ? friend.user2 : friend.user1));

        const myBlackListFriends = await BlackLists.find({ $or: [{ user1: user._id }, { user2: user._id }] });
        const myBlackListFriendsIds = myBlackListFriends.map(list => (list.user1 == user._id ? list.user2 : list.user1));

        const excludedIds = [...myFriendsIds, ...myBlackListFriendsIds];

        const allWaiters = await Waiters.find({
            user: {
                $nin: excludedIds,
            },
        }).exec();

        const newFriendsData = await Promise.all(allWaiters.map(async waiter => {
            const userData = await Users.findById(waiter.user);
            return userData;
        }));

        const appropriateGender = user.gender.toUpperCase() == "MALE" ? "FEMALE" : "MALE";
        const filteredByGender = newFriendsData.filter(friend => friend.gender.toUpperCase() == appropriateGender);

        if (filteredByGender.length == 0) {
            await Waiters.create({user : user._id});
            return {
                status: 201,
                msg: "No new friends of the appropriate gender found. You have been Added to List",
            };
        } else {
            return {
                status: 200,
                newFriend: filteredByGender[0]
            };
        }
    } catch (e) {
        return {
            status: 500,
            msg: "Server error " + e.message,
        };
    }
};


const getNewFriend = async (req, res) => {
    const user = req.customData.user;
    const result = await getNewFriendMethod(user);
    if(result.status == 200) {
        res.status(200).json({newFriend : result.newFriend});
    } else {
        res.status(result.status).json({msg : result.msg});
    }
}

module.exports = {
  getNewFriend,
  getNewFriendMethod
}